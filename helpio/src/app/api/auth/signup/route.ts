import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { signUpSchema } from '@/lib/validations'; // Your Zod schema

// 1. Init Admin Clients (Secure Context)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // MUST BE SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 2. Validate Input
    const validation = signUpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues[0].message }, { status: 400 });
    }

    const { email, password, name } = validation.data;

    // 3. Create User (Admin Mode - Auto-confirm disabled by default in settings, or we handle link)
    // We use generateLink to get the token, then send it ourselves.
    
    // Check if user exists first to give better error
    const { data: existingUser } = await supabaseAdmin.from('User').select('id').eq('email', email).single();
    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // A. Generate the Magic Link / Confirmation Link
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'signup',
      email,
      password,
      options: {
        data: { full_name: name },
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`, // Important!
      }
    });

    if (linkError) throw linkError;

    // B. Send Custom Email via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'Helpio Security <onboarding@resend.dev>', // Change to your domain in prod
      to: email,
      subject: 'Activate your Helpio Account',
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
           <h1 style="color: #0d9488;">Welcome to Helpio, ${name}!</h1>
           <p>You are one step away from joining the future of philanthropy.</p>
           <a href="${linkData.properties.action_link}" style="display: inline-block; background-color: #0d9488; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Verify My Account
           </a>
           <p style="margin-top: 20px; font-size: 12px; color: #666;">
              Link expires in 24 hours. If you didn't sign up, ignore this email.
           </p>
        </div>
      `
    });

    if (emailError) {
      console.error("Resend Error:", emailError);
      return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: error.message || 'Signup failed' }, { status: 500 });
  }
}

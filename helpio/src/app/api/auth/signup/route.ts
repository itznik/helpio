import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { signUpSchema } from '@/lib/validations'; // Ensure this file exists from previous steps

// Admin Client - Bypasses RLS to manage users
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate Input (Server Side)
    const validation = signUpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues[0].message }, { status: 400 });
    }

    const { email, password, name } = validation.data;

    // 2. Check Duplicate
    const { data: existingUser } = await supabaseAdmin
      .from('User') // Check public profile table if you sync users there
      .select('id')
      .eq('email', email)
      .single();

    // Also check Supabase Auth layer
    const { data: authUser } = await supabaseAdmin.auth.admin.listUsers();
    const isEmailTaken = authUser.users.some(u => u.email === email);

    if (existingUser || isEmailTaken) {
        return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // 3. Generate "Magic" Verification Link manually
    // This creates the user but DOES NOT send the default supabase email
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'signup',
      email,
      password,
      options: {
        data: { full_name: name },
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      }
    });

    if (linkError) throw linkError;

    // 4. Send Custom High-End Email
    const { error: emailError } = await resend.emails.send({
      from: 'Helpio Security <onboarding@resend.dev>', // Update with your domain later
      to: email,
      subject: 'Welcome to the Future of Giving',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px 0;">
          <div style="max-width: 500px; margin: 0 auto; background-color: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
             <div style="background: linear-gradient(to right, #0d9488, #4f46e5); padding: 32px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to Helpio</h1>
             </div>
             <div style="padding: 32px;">
                <p style="color: #334155; font-size: 16px; line-height: 24px;">Hi ${name},</p>
                <p style="color: #334155; font-size: 16px; line-height: 24px;">
                   You are one step away from joining a community of changemakers. 
                   Please verify your identity to access the secure dashboard.
                </p>
                <div style="text-align: center; margin: 32px 0;">
                   <a href="${linkData.properties.action_link}" style="display: inline-block; background-color: #0f172a; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px;">
                      Verify My Account
                   </a>
                </div>
                <p style="color: #94a3b8; font-size: 12px; text-align: center;">
                   Secure verification link expires in 24 hours.
                </p>
             </div>
          </div>
        </body>
        </html>
      `
    });

    if (emailError) {
      console.error("Resend Error:", emailError);
      return NextResponse.json({ error: 'Failed to dispatch verification email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Signup Fatal Error:', error);
    return NextResponse.json({ error: error.message || 'System error' }, { status: 500 });
  }
}

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDonationReceipt(email: string, amount: number, wishTitle: string) {
  if (!email) return;

  await resend.emails.send({
    from: 'Helpio <notifications@helpio.com>', // You need a domain for this
    to: email,
    subject: 'Your Impact Receipt 🧾',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0d9488;">Thank you for your generosity!</h1>
        <p>You just donated <strong>$${amount}</strong> to help fund:</p>
        <blockquote style="border-left: 4px solid #0d9488; padding-left: 1rem; margin: 1rem 0;">
          ${wishTitle}
        </blockquote>
        <p>Your transaction is secure and confirmed.</p>
        <br />
        <p style="font-size: 12px; color: #666;">Helpio Inc.</p>
      </div>
    `
  });
}

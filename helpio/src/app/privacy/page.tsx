'use client';

import PageHeader from '@/components/layout/PageHeader';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
      <PageHeader 
        title="Privacy Policy" 
        subtitle="Your privacy is non-negotiable. Here is how we protect your data."
        badge="Legal"
      />

      <article className="max-w-3xl mx-auto px-6 pb-32">
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 prose prose-lg prose-slate dark:prose-invert">
          
          <h3>1. Data Collection</h3>
          <p>
            We only collect what is strictly necessary to verify wishes and process transactions. This includes your name, email, and verification documents (which are encrypted at rest).
          </p>
          
          <h3>2. How we use your data</h3>
          <p>
            Your data is used solely for:
          </p>
          <ul>
            <li>Verifying the authenticity of wish requests.</li>
            <li>Processing secure payments via Stripe.</li>
            <li>Sending impact updates to donors.</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-800 not-prose my-8">
            <h4 className="font-bold text-teal-800 dark:text-teal-300 mb-2">Key Takeaway</h4>
            <p className="text-teal-700 dark:text-teal-400 text-sm m-0">
              We never sell your data to advertisers. Helpio is ad-free and tracking-free.
            </p>
          </div>

          <h3>3. Security</h3>
          <p>
            We use bank-grade AES-256 encryption for all sensitive data. Payments are handled entirely by Stripe; we never store your credit card numbers.
          </p>

        </div>
      </article>
    </main>
  );
}

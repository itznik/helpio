import PageHeader from '@/components/layout/PageHeader';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <PageHeader 
        title="Terms of Service" 
        subtitle="Please read these terms carefully before using Helpio."
        badge="Legal"
      />
      
      <article className="max-w-3xl mx-auto px-6 pb-32 prose prose-slate dark:prose-invert prose-lg">
        <h3>1. Introduction</h3>
        <p>
          Welcome to Helpio. By accessing our website, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>
        
        <h3>2. Use License</h3>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on Helpio's website for personal, non-commercial transitory viewing only.
        </p>

        <h3>3. Transparency & Fees</h3>
        <p>
          Helpio charges 0% platform fees to donors. 100% of your donation goes directly to the intended recipient's wish fulfillment (minus standard payment processing fees charged by Stripe/Razorpay).
        </p>
        
        {/* Add more legal text as needed */}
      </article>
    </main>
  );
}

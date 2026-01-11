'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Lock, AlertCircle } from 'lucide-react';

export default function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return; // Stripe hasn't loaded yet

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirect to a success page after payment
        return_url: `${window.location.origin}/payment/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setIsProcessing(false);
    } else {
      // The UI will auto-redirect, no need to set state here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Stripe's Secure Element */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
        <PaymentElement 
          options={{
            layout: "tabs",
            appearance: {
              theme: 'night', // or 'stripe' based on your dark mode state
              variables: {
                colorPrimary: '#0d9488', // Your Teal-600
                colorBackground: 'transparent',
              }
            }
          }} 
        />
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          {errorMessage}
        </div>
      )}

      <button 
        disabled={!stripe || isProcessing}
        className="w-full py-5 rounded-2xl bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-bold text-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>Processing Securely...</>
        ) : (
          <>
            <Lock className="w-4 h-4" /> Pay ${amount.toFixed(2)}
          </>
        )}
      </button>
      
      <p className="text-center text-xs text-slate-400">
        Payments are processed by Stripe. Your card details are never stored on our servers.
      </p>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Lock, AlertCircle } from 'lucide-react';
import { useLocalization } from '@/context/LocalizationContext';

export default function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { formatPrice } = useLocalization();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
        <PaymentElement 
          options={{
            layout: "tabs",
            appearance: {
              theme: 'night',
              variables: {
                colorPrimary: '#0d9488',
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
          'Processing Securely...'
        ) : (
          <>
            <Lock className="w-4 h-4" /> Pay {formatPrice(amount)}
          </>
        )}
      </button>
    </form>
  );
}

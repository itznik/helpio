'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { toast } from 'sonner';

interface Props {
  wishId: string;
  initialRaised: number;
  goalAmount: number;
}

export default function RealtimeWishTracker({ wishId, initialRaised, goalAmount }: Props) {
  const [raised, setRaised] = useState(initialRaised);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const channel = supabase
      .channel('wish_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Wish',
          filter: `id=eq.${wishId}`,
        },
        (payload: any) => {
          const newAmount = payload.new.raisedAmount;
          setRaised(newAmount);
          toast.success(`🎉 Someone just donated! New total: $${newAmount}`);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [wishId, supabase]);

  const progress = Math.min((raised / goalAmount) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
         <div>
            <p className="text-sm font-bold text-slate-500">Raised Live</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white transition-all duration-500">
              ${raised.toLocaleString()}
            </p>
         </div>
         <div className="text-right">
            <p className="text-sm font-bold text-slate-500">Goal</p>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">${goalAmount.toLocaleString()}</p>
         </div>
      </div>
      
      <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-4 relative">
         <div 
           className="h-full bg-gradient-to-r from-teal-400 to-indigo-500 transition-all duration-1000 ease-out relative" 
           style={{ width: `${progress}%` }} 
         >
            <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
         </div>
      </div>
    </div>
  );
}

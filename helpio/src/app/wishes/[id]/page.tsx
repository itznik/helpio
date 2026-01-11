'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Copy, Heart, User, Clock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation'; // FIX 1: Import useParams
import { createBrowserClient } from '@supabase/ssr';
import { toast } from 'sonner';

export default function WishDetailsPage() {
  // FIX 2: Use hook
  const params = useParams();
  const wishId = params?.id as string;
  
  const [wish, setWish] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // FIX 3: Guard clause
    if (!wishId) return;

    const fetchWish = async () => {
      const { data, error } = await supabase
        .from('Wish')
        .select(`*, user:User(*)`)
        .eq('id', wishId) // FIX 4: Use wishId
        .single();

      if (error) {
        toast.error('Could not find wish');
        router.push('/wishes');
        return;
      }
      setWish(data);
      setLoading(false);
    };

    fetchWish();
  }, [wishId, router, supabase]);

  const handleShare = async () => {
    if (!wish) return;

    const shareData = {
      title: `Help grant a wish: ${wish.title}`,
      text: `I found this on Helpio. ${wish.user?.fullName || 'Someone'} needs our help!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // user cancelled
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", {
         icon: <Copy className="w-4 h-4" />
      });
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading Wish...</div>;

  const progress = (wish.raisedAmount / wish.goalAmount) * 100;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] p-4 md:p-8 pt-24">
       <div className="max-w-4xl mx-auto">
          
          <Link href="/wishes" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold mb-8">
             <ArrowLeft className="w-4 h-4" /> Back to Wishes
          </Link>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
             
             {/* Hero Image */}
             <div className="h-64 md:h-96 relative bg-slate-200">
                <img src={wish.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c'} alt={wish.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                   <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">{wish.title}</h1>
                   <div className="flex items-center gap-4 text-white/80 text-sm font-medium">
                      <span className="flex items-center gap-1"><User className="w-4 h-4" /> {wish.user?.fullName}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Posted recently</span>
                      <span className="flex items-center gap-1 text-teal-400 bg-teal-400/10 px-2 py-1 rounded-full border border-teal-400/20"><ShieldCheck className="w-3 h-3" /> Verified</span>
                   </div>
                </div>
             </div>

             <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                
                {/* Description */}
                <div className="md:col-span-2 space-y-8">
                   <div className="prose dark:prose-invert max-w-none">
                      <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                         {wish.description}
                      </p>
                   </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                   <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between items-end mb-4">
                         <div>
                            <p className="text-sm font-bold text-slate-500">Raised</p>
                            <p className="text-3xl font-black text-slate-900 dark:text-white">${wish.raisedAmount}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-bold text-slate-500">Goal</p>
                            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">${wish.goalAmount}</p>
                         </div>
                      </div>
                      
                      <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-8">
                         <div className="h-full bg-gradient-to-r from-teal-400 to-indigo-500" style={{ width: `${Math.min(progress, 100)}%` }} />
                      </div>

                      <Link 
                        href={`/payment/${wish.id}`}
                        className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mb-3"
                      >
                         <Heart className="w-4 h-4 fill-current" /> Donate Now
                      </Link>

                      <button 
                         onClick={handleShare}
                         className="w-full py-4 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-white hover:bg-white dark:hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
                      >
                         <Share2 className="w-4 h-4" /> Share Wish
                      </button>
                   </div>
                </div>

             </div>
          </div>
       </div>
    </main>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Share2, Copy, Heart, User, 
  Clock, ShieldCheck, AlertCircle 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { toast } from 'sonner';
import { useLocalization } from '@/context/LocalizationContext';

// Define the Wish Interface for Type Safety
interface Wish {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goalAmount: number;
  raisedAmount: number;
  createdAt: string;
  user: {
    fullName: string;
    avatarUrl?: string;
  };
}

export default function WishDetailsPage() {
  // 1. Hooks & Context
  const params = useParams();
  const wishId = params?.id as string;
  const router = useRouter();
  const { formatPrice, currencySymbol } = useLocalization();
  
  // 2. State
  const [wish, setWish] = useState<Wish | null>(null);
  const [loading, setLoading] = useState(true);
  const [liveRaised, setLiveRaised] = useState(0);

  // 3. Supabase Client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 4. Fetch Data & Subscribe to Realtime Updates
  useEffect(() => {
    if (!wishId) return;

    const fetchWish = async () => {
      try {
        const { data, error } = await supabase
          .from('Wish')
          .select(`
            *,
            user:User(fullName, avatarUrl)
          `)
          .eq('id', wishId)
          .single();

        if (error) throw error;

        setWish(data);
        setLiveRaised(data.raisedAmount); // Set initial live value
      } catch (error) {
        console.error("Error fetching wish:", error);
        toast.error('Could not find wish');
        router.push('/wishes');
      } finally {
        setLoading(false);
      }
    };

    fetchWish();

    // === REALTIME SUBSCRIPTION ===
    // This listens for any donations to this specific wish instantly
    const channel = supabase
      .channel(`wish-${wishId}`)
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
          setLiveRaised(newAmount);
          toast.success(`🎉 New donation received! Total: ${currencySymbol}${newAmount}`);
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };

  }, [wishId, router, supabase, currencySymbol]);

  // 5. Secure Share Functionality
  const handleShare = async () => {
    if (!wish) return;

    const shareData = {
      title: `Help grant a wish: ${wish.title}`,
      text: `I found this on Helpio. ${wish.user?.fullName || 'Someone'} needs our help to raise ${formatPrice(wish.goalAmount)}!`,
      url: window.location.href, // Dynamic Secure Link
    };

    // A. Try Native Mobile Share
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled, ignore
      }
    }

    // B. Fallback to Secure Clipboard Copy
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", {
         icon: <Copy className="w-4 h-4" />
      });
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  // 6. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4 animate-pulse">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
         </div>
      </div>
    );
  }

  if (!wish) return null;

  // Calculate Progress (Clamped to 100%)
  const progress = Math.min((liveRaised / wish.goalAmount) * 100, 100);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] p-4 md:p-8 pt-24 transition-colors duration-300">
       <div className="max-w-5xl mx-auto">
          
          {/* Back Navigation */}
          <Link href="/wishes" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold mb-8 transition-colors">
             <ArrowLeft className="w-4 h-4" /> Back to Wishes
          </Link>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-700">
             
             {/* HERO SECTION */}
             <div className="h-64 md:h-[450px] relative bg-slate-200 dark:bg-slate-800 group">
                <img 
                  src={wish.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c'} 
                  alt={wish.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                   <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wide backdrop-blur-sm">
                        <ShieldCheck className="w-3 h-3" /> Verified Request
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold backdrop-blur-sm">
                        <Clock className="w-3 h-3" /> {new Date(wish.createdAt).toLocaleDateString()}
                      </span>
                   </div>

                   <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight max-w-3xl">
                     {wish.title}
                   </h1>
                   
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 p-0.5">
                         <img 
                           src={wish.user?.avatarUrl || `https://ui-avatars.com/api/?name=${wish.user?.fullName || 'User'}`} 
                           alt="User" 
                           className="w-full h-full rounded-full object-cover border-2 border-slate-900"
                         />
                      </div>
                      <div>
                         <p className="text-white font-bold leading-none">{wish.user?.fullName}</p>
                         <p className="text-slate-400 text-xs mt-1">Campaign Organizer</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* MAIN CONTENT GRID */}
             <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left: Story & Details */}
                <div className="lg:col-span-7 space-y-10">
                   <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        About this wish
                      </h3>
                      <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                         <p>{wish.description}</p>
                      </div>
                   </div>

                   {/* Security Note */}
                   <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0 text-indigo-600 dark:text-indigo-400">
                         <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900 dark:text-white text-sm">100% Transparent</h4>
                         <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Donations go directly to the verified recipient. Helpio charges 0% platform fees.
                         </p>
                      </div>
                   </div>
                </div>

                {/* Right: Donation Action Card */}
                <div className="lg:col-span-5 relative">
                   <div className="sticky top-24 space-y-6">
                      
                      <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
                         
                         {/* Progress Header */}
                         <div className="flex justify-between items-end mb-4">
                            <div>
                               <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Raised Live</p>
                               <div className="flex items-baseline gap-1">
                                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                                    {formatPrice(liveRaised)}
                                  </span>
                                  <span className="text-sm font-bold text-slate-500">
                                    of {formatPrice(wish.goalAmount)}
                                  </span>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 font-bold text-xs">
                                  {progress.toFixed(0)}% Funded
                               </div>
                            </div>
                         </div>
                         
                         {/* Dynamic Progress Bar */}
                         <div className="w-full h-4 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden mb-8 shadow-inner">
                            <div 
                              className="h-full bg-gradient-to-r from-teal-400 to-indigo-600 transition-all duration-1000 ease-out relative" 
                              style={{ width: `${progress}%` }} 
                            >
                               <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
                            </div>
                         </div>

                         {/* Action Buttons */}
                         <div className="space-y-3">
                            <Link 
                              href={`/payment/${wish.id}`}
                              className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                            >
                               <Heart className="w-5 h-5 fill-rose-500 text-rose-500 group-hover:animate-pulse" /> 
                               Donate Now
                            </Link>

                            <button 
                               onClick={handleShare}
                               className="w-full py-4 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                               <Share2 className="w-5 h-5" /> 
                               Share Campaign
                            </button>
                         </div>

                         <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            <span>Donations typically process in seconds</span>
                         </div>
                      </div>

                   </div>
                </div>

             </div>
          </div>
       </div>
    </main>
  );
}

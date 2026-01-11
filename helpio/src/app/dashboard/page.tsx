import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import Link from 'next/link';
import { 
  Heart, 
  TrendingUp, 
  History, 
  Plus, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles,
  LogOut
} from 'lucide-react';

export default async function DashboardOverview() {
  // 1. Initialize Supabase Server Client
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // 2. Secure Session Check
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // 3. Fetch Real User Data
  // We fetch donations to calculate impact stats
  const { data: donations } = await supabase
    .from('Donation')
    .select('*, wish:Wish(title)')
    .eq('donorId', user.id)
    .order('createdAt', { ascending: false });

  // Calculate Stats
  const totalDonated = donations?.reduce((acc, curr) => acc + curr.amountTotal, 0) || 0;
  const livesImpacted = donations?.length || 0;
  
  // Mock "Next Level" logic (Gamification)
  const nextLevelAmount = 1000;
  const progress = Math.min((totalDonated / nextLevelAmount) * 100, 100);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
              Welcome back, {user.user_metadata.full_name || 'Changemaker'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Here is an overview of your global impact.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/wishes" 
              className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Heart className="w-4 h-4" /> Grant a Wish
            </Link>
            <Link 
              href="/create" 
              className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Make a Wish
            </Link>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Stat 1: Total Impact */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <TrendingUp className="w-24 h-24 text-teal-500" />
            </div>
            <div className="relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
               </div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Impact</p>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                 ${totalDonated.toLocaleString()}
               </h3>
               <div className="mt-4 flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 w-fit px-2 py-1 rounded-lg">
                  <ArrowUpRight className="w-3 h-3" /> Top 5% of Donors
               </div>
            </div>
          </div>

          {/* Stat 2: Lives Touched */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Heart className="w-24 h-24 text-rose-500" />
            </div>
            <div className="relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />
               </div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Lives Touched</p>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                 {livesImpacted}
               </h3>
               <div className="mt-4 text-xs text-slate-500">
                  Across {new Set(donations?.map(d => d.wishId) || []).size} unique campaigns
               </div>
            </div>
          </div>

          {/* Stat 3: Next Level */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-lg relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
             <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div>
                      <p className="text-indigo-200 font-bold text-sm uppercase">Current Status</p>
                      <h3 className="text-2xl font-black mt-1 flex items-center gap-2">
                         <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" /> 
                         Guardian
                      </h3>
                   </div>
                   <ShieldCheck className="w-8 h-8 text-indigo-300" />
                </div>
                
                <div className="mt-6">
                   <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-indigo-200">Next: Angel</span>
                      <span className="text-white">{progress.toFixed(0)}%</span>
                   </div>
                   <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* RECENT ACTIVITY SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Transaction History */}
           <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <History className="w-5 h-5 text-slate-400" /> Recent Impact
                 </h3>
                 <button className="text-sm font-bold text-indigo-500 hover:text-indigo-600">View All</button>
              </div>
              
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                 {donations && donations.length > 0 ? (
                    donations.map((donation: any) => (
                       <div key={donation.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold">
                                $
                             </div>
                             <div>
                                <p className="font-bold text-slate-900 dark:text-white">
                                   Donation to "{donation.wish?.title || 'Unknown Wish'}"
                                </p>
                                <p className="text-xs text-slate-500">
                                   {new Date(donation.createdAt).toLocaleDateString()}
                                </p>
                             </div>
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white">
                             ${donation.amountTotal.toFixed(2)}
                          </span>
                       </div>
                    ))
                 ) : (
                    <div className="p-12 text-center text-slate-500">
                       <Heart className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                       <p>No donations yet. Start your journey today!</p>
                    </div>
                 )}
              </div>
           </div>

           {/* Quick Actions / Profile Card */}
           <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="text-center mb-6">
                 <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 mb-3 p-1">
                    <img 
                      src={user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                 </div>
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {user.user_metadata.full_name || 'User'}
                 </h3>
                 <p className="text-sm text-slate-500">{user.email}</p>
              </div>
              
              <div className="space-y-3">
                 <Link href="/dashboard/settings" className="block w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    Edit Profile
                 </Link>
                 <Link href="/help" className="block w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    Help & Support
                 </Link>
                 <form action="/auth/signout" method="post">
                    <button className="w-full py-3 rounded-xl border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2">
                       <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                 </form>
              </div>
           </div>

        </div>

      </div>
    </main>
  );
}

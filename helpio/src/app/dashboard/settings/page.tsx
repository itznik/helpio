'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Shield, Bell, Lock, Smartphone, Mail, 
  Eye, EyeOff, Save, UploadCloud 
} from 'lucide-react';

export default function SettingsPage() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Account Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your public presence and security preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['profile', 'security', 'notifications'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl font-bold text-sm capitalize transition-all ${
              activeTab === tab 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg' 
                : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: MAIN SETTINGS FORM */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. PUBLIC PROFILE CARD */}
          {activeTab === 'profile' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-teal-500" /> Public Profile
              </h3>

              {/* Avatar Upload */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-900 shadow-lg">
                    <img src="https://i.pravatar.cc/150?u=nikunj" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <UploadCloud className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Profile Photo</h4>
                  <p className="text-xs text-slate-500 mb-2">Max 2MB. JPG or PNG.</p>
                  <button className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline">Remove Photo</button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Display Name</label>
                  <input type="text" defaultValue="Nikunj Variya" className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-medium focus:ring-2 focus:ring-teal-500 outline-none dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Location</label>
                  <input type="text" defaultValue="Surat, India" className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-medium focus:ring-2 focus:ring-teal-500 outline-none dark:text-white" />
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Bio</label>
                  <textarea defaultValue="Full-stack developer passionate about open source." className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-medium focus:ring-2 focus:ring-teal-500 outline-none dark:text-white min-h-[100px] resize-none"></textarea>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-8 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg transition-all flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. SECURITY CARD */}
          {activeTab === 'security' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-500" /> Security Center
              </h3>

              {/* 2FA Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                       <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900 dark:text-white">Two-Factor Authentication</h4>
                       <p className="text-xs text-slate-500">Secure your account with OTP.</p>
                    </div>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                 </label>
              </div>

              {/* Password Change */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                 <h4 className="font-bold text-slate-900 dark:text-white">Change Password</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="password" placeholder="Current Password" className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800" />
                    <input type="password" placeholder="New Password" className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800" />
                 </div>
                 <button className="text-sm font-bold text-indigo-600 hover:underline">Update Password</button>
              </div>
            </motion.div>
          )}

        </div>


        {/* RIGHT: PRIVACY CONTROLS */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 p-8 rounded-[2rem] text-white dark:text-slate-900 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                 <Lock className="w-6 h-6" />
                 <h3 className="text-xl font-bold">Privacy Mode</h3>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                 <span className="font-medium text-sm">Anonymous Giving</span>
                 <button 
                   onClick={() => setIsAnonymous(!isAnonymous)}
                   className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                   style={{ backgroundColor: isAnonymous ? '#10b981' : '#cbd5e1' }}
                 >
                    <span className={`${isAnonymous ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                 </button>
              </div>
              <p className="text-xs opacity-70 leading-relaxed mb-6">
                 When enabled, your name will be hidden from public leaderboards and wish pages. You will appear as "Anonymous Donor".
              </p>
              
              <div className="flex items-center gap-2 text-xs font-bold bg-white/10 dark:bg-black/5 p-3 rounded-xl">
                 {isAnonymous ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                 Status: {isAnonymous ? 'Hidden' : 'Visible'}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

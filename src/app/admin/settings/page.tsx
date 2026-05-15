'use client';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Settings</h1>
        <p className="text-zinc-400">Manage platform preferences and admin configurations.</p>
      </div>

      <div className="space-y-6">
        {/* Brand Settings */}
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Brand Settings</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Store Name</label>
              <input 
                type="text" 
                defaultValue="Kyrox Muscle"
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Support Email</label>
              <input 
                type="email" 
                defaultValue="support@kyroxmuscle.com"
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-zinc-500">Require 2FA for all admin accounts.</p>
              </div>
              <button className="px-4 py-2 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-colors">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-white font-medium">Active Sessions</p>
                <p className="text-sm text-zinc-500">Manage devices currently logged into the admin panel.</p>
              </div>
              <button className="px-4 py-2 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-colors">
                View Sessions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

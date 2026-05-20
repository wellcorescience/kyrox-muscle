'use client';

import { useState, useEffect } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';
import { login } from './actions';

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const message = params.get('message');
      if (message) {
        setErrorMsg(message);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setErrorMsg(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-metal-300/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-white/[0.03] border border-metal-300/20 rounded-2xl flex items-center justify-center mb-6 shadow-inner-metal">
              <ShieldCheck className="w-8 h-8 text-metal-200" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight text-center">Admin Portal</h1>
            <p className="text-zinc-500 text-sm mt-2 text-center">Secure access requires authentication</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium rounded-xl text-center">
                {errorMsg}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="admin@kyrox.com"
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-metal-300/50 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-metal-300/50 transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-glow disabled:opacity-50 mt-8"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

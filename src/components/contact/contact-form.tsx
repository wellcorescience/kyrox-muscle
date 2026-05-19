"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending message to CRM/Supabase
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSuccess(true);
    setFormData({ name: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6 relative z-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase ml-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full bg-black/50 border border-white/10 py-4 px-5 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-electric-300 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase ml-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full bg-black/50 border border-white/10 py-4 px-5 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-electric-300 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase ml-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="How can we help you?"
                className="w-full bg-black/50 border border-white/10 py-4 px-5 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-electric-300 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase ml-1">
                Message Description
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your issue or request in detail..."
                className="w-full bg-black/50 border border-white/10 py-4 px-5 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-electric-300 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-electric-500 text-black font-bold text-sm uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Sending Enquiry...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 relative z-10 flex flex-col items-center justify-center"
          >
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="text-emerald-500 h-10 w-10" />
            </div>
            <h3 className="text-3xl font-black uppercase text-white mb-2">Message Sent</h3>
            <p className="text-zinc-400 max-w-sm mx-auto text-sm leading-relaxed mb-6">
              Thank you for contacting Kyrox Muscle. We have received your query and will respond shortly.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-3 border border-white/15 bg-white/[0.04] text-xs font-bold uppercase tracking-wider text-white hover:border-electric-300/60 transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

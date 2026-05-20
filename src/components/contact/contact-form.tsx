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
    <div className="border border-ivory-200 bg-white p-8 shadow-sm rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ivory-50/50 to-transparent pointer-events-none" />

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-8 relative z-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col">
                <label className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase ml-1 block mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full bg-ivory-50 border border-ivory-200 py-5 px-6 text-sm text-[#1a1a1a] placeholder:text-muted/60 focus:outline-none focus:border-gold-400 focus:bg-white transition-colors rounded-xl shadow-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase ml-1 block mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full bg-ivory-50 border border-ivory-200 py-5 px-6 text-sm text-[#1a1a1a] placeholder:text-muted/60 focus:outline-none focus:border-gold-400 focus:bg-white transition-colors rounded-xl shadow-sm"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase ml-1 block mb-2">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="How can we help you?"
                className="w-full bg-ivory-50 border border-ivory-200 py-5 px-6 text-sm text-[#1a1a1a] placeholder:text-muted/60 focus:outline-none focus:border-gold-400 focus:bg-white transition-colors rounded-xl shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase ml-1 block mb-2">
                Message Description
              </label>
              <textarea
                required
                rows={7}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your issue or request in detail..."
                className="w-full bg-ivory-50 border border-ivory-200 py-5 px-6 text-sm text-[#1a1a1a] placeholder:text-muted/60 focus:outline-none focus:border-gold-400 focus:bg-white transition-colors resize-none rounded-xl min-h-[160px] shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#A89340] hover:bg-gold-500 text-white font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 rounded-xl shadow-glow btn-primary hover:-translate-y-0.5 active:translate-y-0 mt-2"
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
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-500/20">
              <CheckCircle2 className="text-emerald-600 h-10 w-10" />
            </div>
            <h3 className="text-3xl font-black uppercase text-foreground mb-2">Message Sent</h3>
            <p className="text-muted max-w-sm mx-auto text-sm leading-relaxed mb-6">
              Thank you for contacting Kyrox Muscle. We have received your query and will respond shortly.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-3 border border-ivory-300 bg-white text-xs font-bold uppercase tracking-wider text-foreground hover:border-gold-300 hover:bg-ivory-50 transition-colors rounded-xl shadow-sm btn-primary"
            >
              Send Another Message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

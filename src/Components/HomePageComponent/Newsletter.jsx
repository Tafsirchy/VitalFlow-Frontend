import React, { useState } from "react";
import { Mail, Send, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toast.success("Thank you for subscribing to VitalFlow updates!");
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1000);
  };

  return (
    <section className="py-10 sm:py-14 bg-[var(--background-section)] border-b border-[var(--border-light)] dark:border-zinc-800/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-[var(--border-light)] dark:border-zinc-800 shadow-xl shadow-black/5 text-center space-y-4">
          
          <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 flex items-center justify-center text-[var(--primary-red)]">
            <Mail size={22} />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Stay Informed With <span className="text-gradient-crimson italic">VitalFlow</span>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Get monthly community impact summaries, verified local blood drive announcements, and patient recovery stories delivered directly to your inbox.
            </p>
          </div>

          {isSubscribed ? (
            <div className="py-4 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-base">
              <CheckCircle2 size={20} />
              <span>You have been subscribed successfully!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2.5 pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-[var(--border-light)] dark:border-zinc-700 text-[var(--text-primary)] focus:border-red-600 focus:outline-none transition-colors text-sm"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[var(--primary-red)] hover:bg-[var(--primary-red-hover)] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 active:scale-[0.99] shrink-0"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)] pt-1">
            <ShieldCheck size={13} className="text-emerald-500" />
            <span>Zero spam. Strict medical privacy. Unsubscribe anytime with one click.</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Newsletter;

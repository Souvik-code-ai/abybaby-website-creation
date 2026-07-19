import { useState } from "react";
import { Send, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function MobileMessagesView({ onBack }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-136px)]">
      {/* Gradient header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[linear-gradient(135deg,#579F63_0%,#7CFC58_100%)]">
        <button onClick={onBack} className="text-white/0.85">
          <ChevronLeft size={22} />
        </button>
        <div className="flex-1 ml-2">
          <div className="fort-sans text-[18px] text-white">Let's Connect</div>
          <div className="text-white/80 text-xs font-[family-name:var(--font-family-body)]">
            We'll respond within 2 hours
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col justify-center px-5 py-0">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-3 py-10"
            >
              <div className="rounded-full flex items-center justify-center w-16 h-16 bg-[rgba(212,69,106,0.1)]">
                <Send size={26} className="text-[#d4456a]" />
              </div>
              <div className="text-[18px] font-semibold text-[color:var(--foreground)] font-[family-name:var(--font-family-body)]">
                Message Sent!
              </div>
              <div className="text-[13px] text-[color:var(--muted-foreground)] text-center font-[family-name:var(--font-family-body)]">
                Our team will get back to you soon.
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
            >
              {["name", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                        ? "tel"
                        : "text"
                  }
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [field]: e.target.value }))
                  }
                  required={field !== "phone"}
                  className="w-full rounded-xl px-4 outline-none h-12 bg-[color:var(--muted)] text-sm border-none font-[family-name:var(--font-family-body)] text-[color:var(--foreground)]"
                />
              ))}
              <textarea
                placeholder="Your message..."
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                required
                className="w-full rounded-xl px-4 py-3 outline-none resize-none bg-[color:var(--muted)] text-sm border-none h-[110px] font-[family-name:var(--font-family-body)] text-[color:var(--foreground)]"
              />
              <button
                type="submit"
                className="w-full rounded-xl py-3 flex items-center justify-center gap-2 transition-opacity bg-[linear-gradient(135deg,#579F63_0%,#7CFC58_100%)] text-white font-semibold text-[15px] font-[family-name:var(--font-family-body)]"
              >
                <Send size={16} />
                Send Message
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

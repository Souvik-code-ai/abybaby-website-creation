import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";

export function CommentModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
      onClose();
    }, 2500);
  };

  const formBody = (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center gap-3 py-10"
        >
          <div className="rounded-full flex items-center justify-center h-14 w-14 bg-[#d4456a]/10 ">
            <Send size={22} className="text-[#d4456a]" />
          </div>
          <div className="text-base font-semibold text-[var(--foreground)] font-[var(--font-family-body)]">
            Message Sent!
          </div>
          <div className="text-[13px] text-[var(--muted-foreground)] text-center font-[var(--font-family-body)]">
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
          {/* {["name", "email", "phone"].map((field) => (
            <input
              key={field}
              type={
                field === "email" ? "email" : field === "phone" ? "tel" : "text"
              }
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) =>
                setForm((f) => ({ ...f, [field]: e.target.value }))
              }
              required={field !== "phone"}
              className="w-full rounded-xl px-4 outline-none h-[42px] bg-[var(--muted)] text-sm border-none font-[var(--font-family-body)] text-[var(--foreground)]"
            />
          ))} */}
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            className="w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
            className="w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border-none"
          />

          <input
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border-none"
          />
          <textarea
            placeholder="Your message..."
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            required
            className="w-full rounded-xl px-4 py-3 outline-none resize-none bg-[var(--muted)] text-sm border-none h-[90px] font-[var(--font-family-body)] text-[var(--foreground)]"
          />
          <button
            type="submit"
            className="w-full rounded-xl py-3 flex items-center justify-center gap-2 bg-gradient-to-br from-[#d4456a] to-[#f07398] text-white font-semibold text-[15px] "
          >
            <Send size={16} />
            Send Message
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );

  const header = (
    <div className="flex items-center justify-between px-5 py-4 shrink-0 bg-gradient-to-br from-[#d4456a] to-[#f07398]">
      <div>
        <div className="text-white font-[var(--font-family-display)] text-lg">
          Let's Connect
        </div>
        <div className="text-white/80 text-xs font-[var(--font-family-body)]">
          We'll respond within 2 hours
        </div>
      </div>
      <button onClick={onClose} className="text-white/80">
        <X size={18} />
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/50"
            onClick={onClose}
          />

          {isMobile ? (
            /* Mobile: left sidebar panel */
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="fixed top-0 left-0 bottom-0 z-[81] bg-white flex flex-col w-screen"
            >
              {header}
              <div className="flex-1 overflow-y-auto px-5 py-5">{formBody}</div>
            </motion.div>
          ) : (
            /* Desktop: centered backdrop modal */
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 28, stiffness: 380 }}
              className="fixed inset-0 z-[81] flex items-center justify-center pointer-events-none"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto w-[360px] max-h-[90vh] flex flex-col">
                {header}
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  {formBody}
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Send,
  Facebook,
  Instagram,
  Linkedin,
  ChevronUp,
  Youtube,
} from "lucide-react";

export function ChatbotWidget({ isOpen = false, onClose }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  const [socialOpen, setSocialOpen] = useState(false);
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
      setOpen(false);
      onClose?.();
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 2500);
  };

  const socials = [
    {
      icon: Facebook,
      label: "Facebook",
      color: "#1877F2",
      url: "https://www.facebook.com/AbybabyEventsNetwork",
    },
    {
      icon: Instagram,
      label: "Instagram",
      color: "#E1306C",
      url: "https://www.instagram.com/abybabyevents/",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      color: "#0A66C2",
      url: "https://www.linkedin.com/company/13250906/admin/dashboard/",
    },
    {
      icon: Youtube,
      label: "Youtube",
      color: "#0A66C2",
      url: "https://www.youtube.com/@abybabyevents8902",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-2">
      {/* Contact modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden w-[320px] border border-black/8"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-br from-[#579F63] to-[#7CFC58]">
              <div>
                <div className="font-sans text-white text-lg">
                  Let's Connect
                </div>
                <div className="text-white/80 text-xs">
                  We'll respond within 2 hours
                </div>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  onClose?.();
                }}
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 px-6">
                <div className="rounded-full flex items-center justify-center mb-3 w-14 h-14 bg-[#d4456a]/10">
                  <Send size={22} className="text-[#579F63]" />
                </div>
                <div className="text-base font-semibold text-[#1a1a1a] mb-1.5">
                  Message Sent!
                </div>
                <div className="text-[13px] text-[#8e8e93] text-center">
                  Our team will get back to you soon.
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="px-5 py-4 flex flex-col gap-3"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  className="w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border-none"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  required
                  className="w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border-none"
                />

                <input
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border-none"
                />
                <textarea
                  placeholder="Your message..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  required
                  className="w-full rounded-xl px-4 py-3 outline-none resize-none bg-[#f5f5f7] text-sm border-none h-[90px]"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl py-3 flex items-center justify-center gap-2 transition-opacity bg-gradient-to-br from-[#579F63] to-[#7CFC58] text-white font-semibold text-[15px]"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social dropdown */}
      <AnimatePresence>
        {socialOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-2"
          >
            {socials.map(({ icon: Icon, label, color, url }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-end gap-2"
              >
                <span className="px-3 py-1 rounded-full  bg-white text-xs font-medium shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                  {label}
                </span>
                <div
                  className={`rounded-full flex items-center justify-center shrink-0 w-10 h-10 shadow-[0_4px_12px_rgba(0,0,0,0.15)] bg-${color}`}
                >
                  <Icon size={18} className="" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget buttons */}
      <div className="flex items-center gap-2">
        {/* Social toggle */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setSocialOpen((o) => !o)}
          className={`rounded-full flex items-center justify-center shadow-lg w-12 h-12 border border-black/10 ${socialOpen ? "bg-[#1a1a1a] text-white" : "bg-white text-[#1a1a1a]"}`}
        >
          <ChevronUp
            size={18}
            className={`transition-transform duration-200 ${socialOpen ? "rotate-180" : "rotate-0"}`}
          />
        </motion.button>
      </div>
    </div>
  );
}

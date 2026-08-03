import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";

export function CommentModal({ isOpen, onClose }) {
  const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Returns an error string for a given field + value, or "" if valid
  const validateField = (field, value) => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required.";
        return "";
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!EMAIL_REGEX.test(value))
          return "Please enter a valid email address.";
        return "";
      case "phone":
        // Phone is optional here, but if provided it must be 10 digits
        if (value && value.length !== 10)
          return "Phone number must be exactly 10 digits.";
        return "";
      case "purpose":
        if (!value.trim()) return "Please tell us the purpose.";
        return "";
      default:
        return "";
    }
  };

  const validateAll = () => {
    const newErrors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      phone: validateField("phone", form.phone),
      purpose: validateField("purpose", form.purpose),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleFieldChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    handleFieldChange("phone", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    if (!SCRIPT_URL) {
      console.error("VITE_SCRIPT_URL is not defined");
      setErrors((prev) => ({
        ...prev,
        purpose: "Something went wrong on our end. Please try again shortly.",
      }));
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    // Same reasoning as ChatbotWidget: reading a confirmation back
    // from a Google Apps Script Web App over fetch() is unreliable
    // (CORS blocks reading the body, and the round-trip can hang even
    // though the row is written almost instantly). We fire the
    // request and close the modal immediately rather than waiting on
    // the network response. The fetch still runs in the background;
    // a genuine failure is only logged, since by then the modal has
    // already closed.
    fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(form),
    }).catch((error) => {
      console.error(
        "Background submission error (row may still have been written):",
        error,
      );
    });

    setForm({
      name: "",
      email: "",
      phone: "",
      purpose: "",
    });
    setErrors({
      name: "",
      email: "",
      phone: "",
      purpose: "",
    });
    setSubmitting(false);
    onClose();
  };

  const formBody = (
    <motion.form
      key="form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
          className={`w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border ${
            errors.name ? "border-red-400" : "border-transparent"
          }`}
        />
        {errors.name && (
          <span className="text-[12px] text-red-500 px-1">{errors.name}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          className={`w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border ${
            errors.email ? "border-red-400" : "border-transparent"
          }`}
        />
        {errors.email && (
          <span className="text-[12px] text-red-500 px-1">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={handlePhoneChange}
          maxLength={10}
          className={`w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border ${
            errors.phone ? "border-red-400" : "border-transparent"
          }`}
        />
        {errors.phone && (
          <span className="text-[12px] text-red-500 px-1">{errors.phone}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          placeholder="Purpose"
          value={form.purpose}
          onChange={(e) => handleFieldChange("purpose", e.target.value)}
          className={`w-full rounded-xl px-4 py-3 outline-none resize-none bg-[var(--muted)] text-sm border h-[90px] font-[var(--font-family-body)] text-[var(--foreground)] ${
            errors.purpose ? "border-red-400" : "border-transparent"
          }`}
        />
        {errors.purpose && (
          <span className="text-[12px] text-red-500 px-1">
            {errors.purpose}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl py-3 flex items-center justify-center gap-2 bg-gradient-to-br from-lime-600 to-lime-500 text-white font-semibold text-[15px] disabled:opacity-60"
      >
        <Send size={16} />
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </motion.form>
  );

  const header = (
    <div className="flex items-center justify-between px-5 py-4 shrink-0 bg-gradient-to-br from-lime-600 to-lime-500">
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

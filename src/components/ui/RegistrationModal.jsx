import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";

export function RegistrationModal({ open, onClose, eventName }) {
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
  const [submitted, setSubmitted] = useState(false);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        if (!value.trim()) return "Phone number is required.";
        if (value.length !== 10)
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

  const resetAndClose = () => {
    setSubmitted(false);
    onClose?.();
    setForm({ name: "", email: "", phone: "", purpose: "" });
    setErrors({ name: "", email: "", phone: "", purpose: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    if (!SCRIPT_URL) {
      console.error("VITE_SCRIPT_URL is not defined");
      return;
    }

    setSubmitting(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);

        try {
          await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
              ...form,
              eventName,
              latitude,
              longitude,
            }),
          });

          setSubmitting(false);
          setSubmitted(true);
          setTimeout(resetAndClose, 2000);
        } catch (err) {
          console.error(err);
          setSubmitting(false);
        }
      },
      (error) => {
        console.error(error);
        alert("Unable to get your location.");
        setSubmitting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden w-[320px] border border-black/8"
            onClick={(e) => e.stopPropagation()}
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
              <button onClick={resetAndClose}>
                <X size={18} className="text-white" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-3 py-10 px-6"
                >
                  <div className="rounded-full flex items-center justify-center h-14 w-14 bg-[#579F63]/10">
                    <Send size={22} className="text-[#579F63]" />
                  </div>
                  <div className="text-base font-semibold text-[#1a1a1a]">
                    Message Sent!
                  </div>
                  <div className="text-[13px] text-[#8e8e93] text-center">
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
                  noValidate
                  className="px-5 py-4 flex flex-col gap-3"
                >
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      placeholder="Name"
                      value={form.name}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                      className={`w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border ${
                        errors.name ? "border-red-400" : "border-transparent"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[12px] text-red-500 px-1">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <input
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                      className={`w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border ${
                        errors.email ? "border-red-400" : "border-transparent"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[12px] text-red-500 px-1">
                        {errors.email}
                      </span>
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
                      <span className="text-[12px] text-red-500 px-1">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <textarea
                      placeholder="Purpose"
                      value={form.purpose}
                      onChange={(e) =>
                        handleFieldChange("purpose", e.target.value)
                      }
                      className={`w-full rounded-xl px-4 py-3 outline-none resize-none bg-[#f5f5f7] text-sm border h-[90px] ${
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
                    className="w-full rounded-xl py-3 flex items-center justify-center gap-2 transition-opacity bg-gradient-to-br from-[#579F63] to-[#7CFC58] text-white font-semibold text-[15px] disabled:opacity-60"
                  >
                    <Send size={16} />
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

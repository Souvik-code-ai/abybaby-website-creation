// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import {
//   X,
//   Send,
//   Facebook,
//   Instagram,
//   Linkedin,
//   ChevronUp,
//   Youtube,
//   MessageCircle,
// } from "lucide-react";
// import { CommentModal } from "./CommentModal";
// export function ChatbotWidget({ isOpen = false, onClose }) {
//   const [open, setOpen] = useState(false);
//   const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL;

//   useEffect(() => {
//     setOpen(isOpen);
//   }, [isOpen]);
//   const [socialOpen, setSocialOpen] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     purpose: "",
//   });
//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     purpose: "",
//   });
//   const [submitting, setSubmitting] = useState(false);

//   const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   // Returns an error string for a given field + value, or "" if valid
//   const validateField = (field, value) => {
//     switch (field) {
//       case "name":
//         if (!value.trim()) return "Name is required.";
//         return "";
//       case "email":
//         if (!value.trim()) return "Email is required.";
//         if (!EMAIL_REGEX.test(value))
//           return "Please enter a valid email address.";
//         return "";
//       case "phone":
//         if (!value.trim()) return "Phone number is required.";
//         if (value.length !== 10)
//           return "Phone number must be exactly 10 digits.";
//         return "";
//       case "purpose":
//         if (!value.trim()) return "Please tell us the purpose.";
//         return "";
//       default:
//         return "";
//     }
//   };

//   const validateAll = () => {
//     const newErrors = {
//       name: validateField("name", form.name),
//       email: validateField("email", form.email),
//       phone: validateField("phone", form.phone),
//       purpose: validateField("purpose", form.purpose),
//     };
//     setErrors(newErrors);
//     return Object.values(newErrors).every((err) => err === "");
//   };

//   const handleFieldChange = (field, value) => {
//     setForm((f) => ({ ...f, [field]: value }));
//     // Clear/update error live as the user types, so it doesn't feel stuck
//     setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateAll()) {
//       return;
//     }

//     if (!SCRIPT_URL) {
//       console.error("VITE_SCRIPT_URL is not defined");
//       setErrors((prev) => ({
//         ...prev,
//         purpose: "Something went wrong on our end. Please try again shortly.",
//       }));
//       return;
//     }

//     if (submitting) return;
//     setSubmitting(true);

//     // Reading any confirmation back from a Google Apps Script Web App
//     // over fetch() has proven unreliable — the request reaches the
//     // server and the row gets written almost instantly, but waiting
//     // for fetch() itself to resolve/reject can hang unpredictably
//     // regardless of how fast the script executes. Since submission
//     // reliably succeeds once dispatched, we close the modal and reset
//     // the form as soon as the request is sent, rather than waiting on
//     // the network round-trip. The fetch still runs in the background;
//     // any genuine failure (e.g. no network at all) is caught and
//     // logged, but no longer blocks the UI from resetting.
//     fetch(SCRIPT_URL, {
//       method: "POST",
//       mode: "no-cors",
//       headers: {
//         "Content-Type": "text/plain;charset=utf-8",
//       },
//       body: JSON.stringify(form),
//     }).catch((error) => {
//       console.error(
//         "Background submission error (row may still have been written):",
//         error,
//       );
//     });

//     setOpen(false);
//     onClose?.();

//     setForm({
//       name: "",
//       email: "",
//       phone: "",
//       purpose: "",
//     });
//     setErrors({
//       name: "",
//       email: "",
//       phone: "",
//       purpose: "",
//     });
//     setSubmitting(false);
//   };

//   const handlePhoneChange = (e) => {
//     const value = e.target.value.replace(/\D/g, "").slice(0, 10);
//     handleFieldChange("phone", value);
//   };

//   const socials = [
//     {
//       icon: Facebook,
//       label: "Facebook",
//       color: "#1877F2",
//       url: "https://www.facebook.com/AbybabyEventsNetwork",
//     },
//     {
//       icon: Instagram,
//       label: "Instagram",
//       color: "#E1306C",
//       url: "https://www.instagram.com/abybabyevents/",
//     },
//     {
//       icon: Linkedin,
//       label: "LinkedIn",
//       color: "#0A66C2",
//       url: "https://www.linkedin.com/company/13250906/admin/dashboard/",
//     },
//     {
//       icon: Youtube,
//       label: "Youtube",
//       color: "#0A66C2",
//       url: "https://www.youtube.com/@abybabyevents8902",
//     },
//   ];

//   return (
//     <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-2">
//       {/* Contact modal */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ type: "spring", damping: 28, stiffness: 380 }}
//             className="bg-white rounded-3xl shadow-2xl overflow-hidden w-[320px] border border-black/8"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-br from-[#579F63] to-[#7CFC58]">
//               <div>
//                 <div className="font-sans text-white text-lg">
//                   Let's Connect
//                 </div>
//                 <div className="text-white/80 text-xs">
//                   We'll respond within 2 hours
//                 </div>
//               </div>
//               <button
//                 onClick={() => {
//                   setOpen(false);
//                   onClose?.();
//                 }}
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <form
//               onSubmit={handleSubmit}
//               noValidate
//               className="px-5 py-4 flex flex-col gap-3"
//             >
//               {/* Name */}
//               <div className="flex flex-col gap-1">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={form.name}
//                   onChange={(e) => handleFieldChange("name", e.target.value)}
//                   className={`w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border ${
//                     errors.name ? "border-red-400" : "border-transparent"
//                   }`}
//                 />
//                 {errors.name && (
//                   <span className="text-[12px] text-red-500 px-1">
//                     {errors.name}
//                   </span>
//                 )}
//               </div>

//               {/* Email */}
//               <div className="flex flex-col gap-1">
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={form.email}
//                   onChange={(e) => handleFieldChange("email", e.target.value)}
//                   className={`w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border ${
//                     errors.email ? "border-red-400" : "border-transparent"
//                   }`}
//                 />
//                 {errors.email && (
//                   <span className="text-[12px] text-red-500 px-1">
//                     {errors.email}
//                   </span>
//                 )}
//               </div>

//               {/* Phone */}
//               <div className="flex flex-col gap-1">
//                 <input
//                   type="tel"
//                   placeholder="Phone"
//                   value={form.phone}
//                   onChange={handlePhoneChange}
//                   maxLength={10}
//                   className={`w-full rounded-xl px-4 outline-none h-[42px] bg-[#f5f5f7] text-sm border ${
//                     errors.phone ? "border-red-400" : "border-transparent"
//                   }`}
//                 />
//                 {errors.phone && (
//                   <span className="text-[12px] text-red-500 px-1">
//                     {errors.phone}
//                   </span>
//                 )}
//               </div>

//               {/* Purpose */}
//               <div className="flex flex-col gap-1">
//                 <textarea
//                   placeholder="Purpose"
//                   value={form.purpose}
//                   onChange={(e) => handleFieldChange("purpose", e.target.value)}
//                   className={`w-full rounded-xl px-4 py-3 outline-none resize-none bg-[#f5f5f7] text-sm border h-[90px] ${
//                     errors.purpose ? "border-red-400" : "border-transparent"
//                   }`}
//                 />
//                 {errors.purpose && (
//                   <span className="text-[12px] text-red-500 px-1">
//                     {errors.purpose}
//                   </span>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full rounded-xl py-3 flex items-center justify-center gap-2 transition-opacity bg-gradient-to-br from-[#579F63] to-[#7CFC58] text-white font-semibold text-[15px] disabled:opacity-60"
//               >
//                 <Send size={16} />
//                 {submitting ? "Sending..." : "Send Message"}
//               </button>
//             </form>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Social dropdown */}
//       <AnimatePresence>
//         {socialOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 8 }}
//             transition={{ duration: 0.18 }}
//             className="flex flex-col gap-2"
//           >
//             {socials.map(({ icon: Icon, label, color, url }) => (
//               <motion.a
//                 key={label}
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.08 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex items-center justify-end gap-2"
//               >
//                 <span className="px-3 py-1 rounded-full  bg-white text-xs font-medium shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
//                   {label}
//                 </span>
//                 <div
//                   className={`rounded-full flex items-center justify-center shrink-0 w-10 h-10 shadow-[0_4px_12px_rgba(0,0,0,0.15)] bg-${color}`}
//                 >
//                   <Icon size={18} className="" />
//                 </div>
//               </motion.a>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Widget buttons */}
//       <div className="flex items-center gap-2">
//         {/* Social toggle */}
//         <motion.button
//           whileHover={{ scale: 1.06 }}
//           whileTap={{ scale: 0.94 }}
//           onClick={() => setSocialOpen((o) => !o)}
//           className={`rounded-full flex items-center justify-center shadow-lg w-12 h-12 border border-black/10 ${socialOpen ? "bg-[#1a1a1a] text-white" : "bg-white text-[#1a1a1a]"}`}
//         >
//           <ChevronUp
//             size={18}
//             className={`transition-transform duration-200 ${socialOpen ? "rotate-180" : "rotate-0"}`}
//           />
//         </motion.button>
//         <motion.button
//           whileHover={{ scale: 1.06 }}
//           whileTap={{ scale: 0.94 }}
//           onClick={() => setOpen((o) => !o)}
//           className={`w-[45px] h-[45px] rounded-full flex items-center justify-center shadow-xl ${
//             open ? "bg-[#1a1a1a]" : "bg-linear-to-r from-lime-700 to-lime-500"
//           }`}
//         >
//           <AnimatePresence mode="wait">
//             {open ? (
//               <motion.div
//                 key="close"
//                 initial={{ rotate: -90 }}
//                 animate={{ rotate: 0 }}
//                 exit={{ rotate: 90 }}
//                 transition={{ duration: 0.15 }}
//               >
//                 <X size={22} style={{ color: "#fff" }} />
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="open"
//                 initial={{ rotate: 90 }}
//                 animate={{ rotate: 0 }}
//                 exit={{ rotate: -90 }}
//                 transition={{ duration: 0.15 }}
//               >
//                 <MessageCircle size={22} style={{ color: "#fff" }} />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.button>
//       </div>
//     </div>
//   );
// }
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
  MessageCircle,
} from "lucide-react";

export function ChatbotWidget({ isOpen = false, onClose }) {
  const [open, setOpen] = useState(false);
  const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL;

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  const [socialOpen, setSocialOpen] = useState(false);
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
    // Clear/update error live as the user types, so it doesn't feel stuck
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

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

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);
        fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            ...form,
            latitude,
            longitude,
          }),
        }).catch((error) => {
          console.error(
            "Background submission error (row may still have been written):",
            error,
          );
        });

        setSubmitting(false);
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
          setOpen(false);
          onClose?.();

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
        }, 2000);
      },
      (error) => {
        console.error("Location Error:", error);

        setSubmitting(false);

        setErrors((prev) => ({
          ...prev,
          purpose: "Please allow location permission to submit the form.",
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    handleFieldChange("phone", value);
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
                  {/* Name */}
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

                  {/* Email */}
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

                  {/* Phone */}
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

                  {/* Purpose */}
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
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setOpen((o) => !o)}
          className={`w-[45px] h-[45px] rounded-full flex items-center justify-center shadow-xl ${
            open ? "bg-[#1a1a1a]" : "bg-linear-to-r from-lime-700 to-lime-500"
          }`}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <X size={22} style={{ color: "#fff" }} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle size={22} style={{ color: "#fff" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}

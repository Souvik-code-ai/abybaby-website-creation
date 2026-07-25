import { motion, AnimatePresence } from "motion/react";
import { Info, BookOpen, Shield, FileText, Lock, X, Award } from "lucide-react";
import { Link } from "react-router-dom";
const items = [
  {
    icon: Info,
    label: "About Us",
    desc: "Our story and mission",
    view: "about",
    path: "/about",
  },
  {
    icon: BookOpen,
    label: "Case Studies",
    desc: "Premium event portfolios",
    view: "casestudies",
    path: "/casestudies",
  },
  {
    icon: Award,
    label: "Awards and Recognitions",
    desc: "Our achievements",
    view: "awards",
    path: "/awards",
  },
  {
    icon: Shield,
    label: "Privacy Policy",
    desc: "How we protect your data",
    view: "privacypolicy",
    path: "/privacypolicy",
  },
  {
    icon: FileText,
    label: "Terms & Conditions",
    desc: "Usage guidelines",
    view: "terms",
    path: "/terms",
  },
  {
    icon: Lock,
    label: "Data Privacy",
    desc: "GDPR & data rights",
    view: "dataprivacy",
    path: "/dataprivacy",
  },
];

export function CommonSectionModal({ isOpen, onClose, onNavigate }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.01 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="fixed z-[61] bg-white rounded-2xl shadow-2xl overflow-hidden md:bottom-20 md:left-4 w-[260px] border border-black/[0.08] right-4 bottom-[30vh]"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-semibold font-[family-name:var(--font-family-body)]">
                More Options
              </span>
              <button onClick={onClose} className="cursor-pointer">
                <X size={16} />
              </button>
            </div>
            {items.map(({ icon: Icon, label, desc, view, path }) => (
              <Link
                key={label}
                to={path}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-black/[0.04]"
                onClick={() => {
                  if (view) {
                    // ← navigate if this item has a route
                    onClose();
                    onNavigate(view);
                  }
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#fafafa")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div className="rounded-xl flex items-center justify-center shrink-0 w-9 h-9 bg-[rgba(212,69,106,0.08)]">
                  <Icon size={16} className="text-[#2C7048]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1a1a1a]">
                    {label}
                  </div>
                  <div className="text-xs text-[#8e8e93]">{desc}</div>
                </div>
              </Link>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

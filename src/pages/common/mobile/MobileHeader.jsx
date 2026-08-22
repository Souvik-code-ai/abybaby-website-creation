// import { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { CommonSectionModal } from "../../commonSection/CommonSectionModal";
// import { useNavigate } from "react-router-dom";
// import { Info, BookOpen, Shield, FileText, Lock, Award } from "lucide-react";
// import {
//   MessageCircle,
//   ChevronDown,
//   Facebook,
//   Instagram,
//   Linkedin,
//   MoreHorizontal,
// } from "lucide-react";
// import logo from "../../../assets/images/logo.jpg";

// import { sidebarItems } from "../../../../public/common/mobile/mobileheader";
// import { socials } from "../../../../public/common/mobile/mobilesocial";
// import { X } from "lucide-react";
// export function MobileHeader({ onMessageClick, onLogoClick, onNavigate }) {
//   const [socialOpen, setSocialOpen] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [moreOpen, setMoreOpen] = useState(false);
//   const navigate = useNavigate();
//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 bg-white h-14 backdrop-blur-md border-b border-black/[0.08]">
//         {/* Logo */}
//         <button
//           onClick={() => setDrawerOpen(true)}
//           className="flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer"
//         >
//           <div className="rounded-sm flex items-center justify-center overflow-hidden w-10 h-10 bg-[linear-gradient(135deg,#d4456a_0%,#f9a8c9_100%)]">
//             <img
//               src={logo}
//               alt="Logo"
//               className="overflow-hidden rounded-lg h-12 w-12"
//             />
//           </div>
//         </button>

//         {/* Right actions */}
//         <div className="flex items-center gap-2 relative">
//           <div className="relative">
//             <button
//               onClick={() => setSocialOpen((o) => !o)}
//               className="rounded-full flex items-center gap-1 px-3 h-9 bg-black/5 text-[13px] font-medium"
//             >
//               Social
//               <ChevronDown
//                 size={14}
//                 className={`transition-transform duration-200 ${socialOpen ? "rotate-180" : "rotate-0"}`}
//               />
//             </button>

//             <AnimatePresence>
//               {socialOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 8, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: 8, scale: 0.95 }}
//                   transition={{ duration: 0.15 }}
//                   className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl overflow-hidden w-[180px] border border-black/[0.08]"
//                 >
//                   {socials.map(({ icon: Icon, label, color, url }) => (
//                     <a
//                       key={label}
//                       href={url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-3 px-4 py-3 transition-colors border-b border-black/[0.04]"
//                       onMouseEnter={(e) =>
//                         (e.currentTarget.style.background = "#fafafa")
//                       }
//                       onMouseLeave={(e) =>
//                         (e.currentTarget.style.background = "transparent")
//                       }
//                     >
//                       <div
//                         className={`rounded-lg flex items-center justify-center w-7 h-7 bg-${color} shadow-black shadow-2xs`}
//                       >
//                         <Icon size={14} className="" />
//                       </div>
//                       <span className="text-sm font-medium text-[#1a1a1a]">
//                         {label}
//                       </span>
//                     </a>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Three-dot "more" button */}
//           {/* <button
//             onClick={() => setMoreOpen((o) => !o)}
//             aria-label="More options"
//             className="rounded-full flex items-center justify-center w-9 h-9 bg-black/5"
//           >
//             <MoreHorizontal size={18} className="text-[#1a1a1a]" />
//           </button> */}
//         </div>
//       </header>
//       <button
//         onClick={onMessageClick}
//         className="fixed flex items-center justify-center rounded-xl bottom-18 right-3 w-9 h-9 bg-[linear-gradient(135deg,#579F63_0%,#7CFC58_100%)] shadow-[0_4px_16px_rgba(44,112,72,0.35)] z-[60] border-none cursor-pointer"
//       >
//         <MessageCircle size={18} className="text-white" />
//       </button>

//       {/* More options modal (About, Case Studies, Awards, Privacy, Terms, Data Privacy) */}
//       {/* <CommonSectionModal
//         isOpen={moreOpen}
//         onClose={() => setMoreOpen(false)}
//         onNavigate={onNavigate}
//       /> */}

//       <AnimatePresence>
//         {drawerOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="fixed inset-0 z-[70] bg-black/35"
//               onClick={() => setDrawerOpen(false)}
//             />

//             {/* Sidebar panel sliding in from left */}
//             <motion.div
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", damping: 32, stiffness: 380 }}
//               className="fixed top-0 left-0 bottom-0 z-[71] bg-white flex flex-col w-[280px] shadow-[4px_0_24px_rgba(0,0,0,0.12)]"
//             >
//               {/* Drawer header */}
//               <div className="flex items-center justify-between px-4 h-16 border-b border-black/[0.07]">
//                 <div className="flex items-center gap-3">
//                   <div className="rounded-sm flex items-center justify-center overflow-hidden w-9 h-9 bg-[linear-gradient(135deg,#d4456a_0%,#f9a8c9_100%)]">
//                     <img
//                       src={logo}
//                       alt=""
//                       className="rounded-lg h-10 w-10 overflow-hidden"
//                     />
//                   </div>
//                   <span className="text-[15px] font-semibold text-[#1a1a1a]">
//                     Menu
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => setDrawerOpen(false)}
//                   className="rounded-full flex items-center justify-center w-8 h-8 bg-black/5"
//                 >
//                   <X size={16} className="text-[#444]" />
//                 </button>
//               </div>

//               {/* Drawer items */}
//               <nav className="flex-1 overflow-y-auto py-2">
//                 {sidebarItems.map(({ icon: Icon, label, desc, view }) => (
//                   <button
//                     key={view}
//                     className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-black/[0.04]"
//                     onClick={() => {
//                       setDrawerOpen(false);
//                       navigate(view);
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.background = "#fafafa")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.background = "transparent")
//                     }
//                   >
//                     <div className="rounded-xl flex items-center justify-center shrink-0 w-10 h-10 bg-[rgba(212,69,106,0.08)]">
//                       <Icon size={18} className="text-[#2C7048]" />
//                     </div>
//                     <div>
//                       <div className="text-sm font-medium text-[#1a1a1a]">
//                         {label}
//                       </div>
//                       <div className="text-xs text-[#8e8e93]">{desc}</div>
//                     </div>
//                   </button>
//                 ))}
//               </nav>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CommonSectionModal } from "../../commonSection/CommonSectionModal";
import { useNavigate } from "react-router-dom";
import { Info, BookOpen, Shield, FileText, Lock, Award } from "lucide-react";
import {
  MessageCircle,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  MoreHorizontal,
} from "lucide-react";
import logo from "../../../assets/images/logo.webp";

import { sidebarItems } from "../../../../public/common/mobile/mobileheader";
import { socials } from "../../../../public/common/mobile/mobilesocial";
import { X } from "lucide-react";
import { CommentModal } from "../CommentModal"; // update this path to match your project structure

export function MobileHeader({ onMessageClick, onLogoClick, onNavigate }) {
  const [socialOpen, setSocialOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleMessageClick = () => {
    setCommentModalOpen(true);
    onMessageClick?.();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 bg-white h-14 backdrop-blur-md border-b border-black/[0.08]">
        {/* Logo */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer"
        >
          <div className="rounded-sm flex items-center justify-center overflow-hidden w-10 h-10 bg-[linear-gradient(135deg,#d4456a_0%,#f9a8c9_100%)]">
            <img
              src={logo}
              alt="Logo"
              className="overflow-hidden rounded-lg h-12 w-12"
            />
          </div>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <button
              onClick={() => setSocialOpen((o) => !o)}
              className="rounded-full flex items-center gap-1 px-3 h-9 bg-black/5 text-[13px] font-medium"
            >
              Social
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${socialOpen ? "rotate-180" : "rotate-0"}`}
              />
            </button>

            <AnimatePresence>
              {socialOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl overflow-hidden w-[180px] border border-black/[0.08]"
                >
                  {socials.map(({ icon: Icon, label, color, url }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 transition-colors border-b border-black/[0.04]"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#fafafa")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <div
                        className={`rounded-lg flex items-center justify-center w-7 h-7 bg-${color} shadow-black shadow-2xs`}
                      >
                        <Icon size={14} className="" />
                      </div>
                      <span className="text-sm font-medium text-[#1a1a1a]">
                        {label}
                      </span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Three-dot "more" button */}
          {/* <button
            onClick={() => setMoreOpen((o) => !o)}
            aria-label="More options"
            className="rounded-full flex items-center justify-center w-9 h-9 bg-black/5"
          >
            <MoreHorizontal size={18} className="text-[#1a1a1a]" />
          </button> */}
        </div>
      </header>
      <button
        onClick={handleMessageClick}
        className="fixed flex items-center justify-center rounded-xl bottom-18 right-3 w-9 h-9 bg-[linear-gradient(135deg,#579F63_0%,#7CFC58_100%)] shadow-[0_4px_16px_rgba(44,112,72,0.35)] z-[60] border-none cursor-pointer"
      >
        <MessageCircle size={18} className="text-white" />
      </button>

      {/* Contact / comment form modal, opened by the message icon above */}
      <CommentModal
        isOpen={commentModalOpen}
        onClose={() => setCommentModalOpen(false)}
      />

      {/* More options modal (About, Case Studies, Awards, Privacy, Terms, Data Privacy) */}
      {/* <CommonSectionModal
        isOpen={moreOpen}
        onClose={() => setMoreOpen(false)}
        onNavigate={onNavigate}
      /> */}

      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70] bg-black/35"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Sidebar panel sliding in from left */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 380 }}
              className="fixed top-0 left-0 bottom-0 z-[71] bg-white flex flex-col w-[280px] shadow-[4px_0_24px_rgba(0,0,0,0.12)]"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 h-16 border-b border-black/[0.07]">
                <div className="flex items-center gap-3">
                  <div className="rounded-sm flex items-center justify-center overflow-hidden w-9 h-9 bg-[linear-gradient(135deg,#d4456a_0%,#f9a8c9_100%)]">
                    <img
                      src={logo}
                      alt=""
                      className="rounded-lg h-10 w-10 overflow-hidden"
                    />
                  </div>
                  <span className="text-[15px] font-semibold text-[#1a1a1a]">
                    Menu
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full flex items-center justify-center w-8 h-8 bg-black/5"
                >
                  <X size={16} className="text-[#444]" />
                </button>
              </div>

              {/* Drawer items */}
              <nav className="flex-1 overflow-y-auto py-2">
                {sidebarItems.map(({ icon: Icon, label, desc, view }) => (
                  <button
                    key={view}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-black/[0.04]"
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate(view);
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fafafa")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <div className="rounded-xl flex items-center justify-center shrink-0 w-10 h-10 bg-[rgba(212,69,106,0.08)]">
                      <Icon size={18} className="text-[#2C7048]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1a1a1a]">
                        {label}
                      </div>
                      <div className="text-xs text-[#8e8e93]">{desc}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Add these imports at the top alongside existing ones
import { useState, useEffect, useRef, useCallback } from "react";
import { Toaster } from "sonner";
import { useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { StoriesCarousel } from "./pages/home/StoriesCarousel";
import { StoryViewer } from "./pages/home/StoryViewer";
import { FeedCard } from "./pages/home/FeedCard";
import { RightPanel } from "./pages/home/RightPanel";
import { ChatbotWidget } from "./pages/common/ChatbotWidget";
import { CommonSectionModal } from "./pages/commonSection/CommonSectionModal";
import { PresenceSection } from "./pages/presence/PresenseSection";
import { MobileHeader } from "./pages/common/mobile/MobileHeader";
import { MobileBottomNav } from "./pages/common/mobile/MobileBottomNav";
import { MobileMessagesView } from "./pages/common/mobile/MobileMessagesView";
import { ProfileView } from "./pages/profile/ProfileView";
import { EventsSection } from "./pages/events/Eventssection";
import { Sidebar } from "./app/dashboard/Sidebar";
import logo from "./assets/images/logo.jpg";
import { DataPrivacyView } from "./pages/commonSection/DataPrivacyView";
import { CaseStudiesView } from "./pages/commonSection/CaseStudiesView";
import {
  clients,
  feedPosts,
  upcomingEvents,
  caseStudies,
  awards,
} from "../public/home/home";
import { AwardsView } from "./pages/commonSection/AwardsView";
import { PrivacyPolicyView } from "./pages/commonSection/PrivacyPolicyView";
import { TermsView } from "./pages/commonSection/TermsPage";
import { DigitalSection } from "./pages/digital/DigitalSection";
import { ExhibitionSection } from "./pages/exhibitions/ExhibitonSection";
import { ActivationSection } from "./pages/activations/ActivationSection";
import PageLoader from "./components/ui/Pageloader";
import { ArrowRight } from "lucide-react";

import { AboutView } from "./pages/commonSection/AboutView";
// ── Feed with infinite scroll ─────────────────────────────────────────────────
// how many posts to load per batch

import FeedWithInfiniteScroll from "./pages/home/FeedWithInfiniteScroll";
export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [moreModalOpen, setMoreModalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [currentView, setCurrentView] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkSize = () => {
      console.log(isMobile, +window.innerHeight, +window.innerWidth);
      setIsMobile(window.innerWidth < 770);
      setIsTablet(window.innerWidth < 1160);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const handleNavigate = (section) => {
    if (section === "presence") {
      setOpen(true);
      setActiveSection("presence");
      return;
    }

    setOpen(false);

    if (section === activeSection) return;

    setLoading(true);

    window.scrollTo({ top: 0, behavior: "auto" });

    setTimeout(() => {
      setActiveSection(section);
      setLoading(false);
    }, 500);
  };
  const SIDEBAR_W = 72;

  // Sections that should hide the right panel
  const hideRightPanel = location.pathname !== "/";

  return (
    <div className="bg-background min-h-screen">
      {loading && <PageLoader />}
      {/* Mobile Header */}
      {isMobile && (
        <MobileHeader
          onMessageClick={() => setActiveSection("messages")}
          onLogoClick={() => setActiveSection("home")}
          onNavigate={handleNavigate}
        />
      )}

      {/* Desktop/Tablet Left Sidebar */}
      {!isMobile ? (
        <Sidebar
          activeSection={activeSection}
          onNavigate={(section) => {
            if (section === "messages") {
              setChatOpen(true);
              return;
            }
            handleNavigate(section);
          }}
          onMoreClick={() => setMoreModalOpen(true)}
        />
      ) : (
        <MobileBottomNav
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      )}

      {/* Main scrollable content */}
      <div
        className={`flex items-start min-h-screen ${
          isMobile ? "ml-0" : "ml-[72px]"
        }`}
      >
        {/* Left gap spacer */}
        {!isMobile && !isTablet && <div className="flex-[4] min-w-0" />}

        <main
          className={`min-w-0 ${
            isMobile || isTablet ? "flex-1" : "flex-[0_0_630px] w-[630px]"
          } ${isMobile ? "pt-14 pb-20" : "pt-0 pb-0"}`}
        >
          <div className="pb-8">
            <Routes>
              <Route
                path="/profile"
                element={<ProfileView onNavigate={handleNavigate} />}
              />
              <Route
                path="/events"
                element={<EventsSection onNavigate={setActiveSection} />}
              />
              <Route
                path="/digital"
                element={<DigitalSection onNavigate={setActiveSection} />}
              />
              <Route
                path="/exhibition"
                element={<ExhibitionSection onNavigate={setActiveSection} />}
              />
              <Route
                path="/activation"
                element={<ActivationSection onNavigate={setActiveSection} />}
              />
              <Route
                path="/presence"
                element={<PresenceSection />}
                onNavigate={setActiveSection}
              />
              <Route
                path="/terms"
                element={<TermsView onNavigate={setActiveSection} />}
              />
              <Route
                path="/dataprivacy"
                element={<DataPrivacyView onNavigate={setActiveSection} />}
              />
              <Route
                path="/privacypolicy"
                element={<PrivacyPolicyView onNavigate={setActiveSection} />}
              />
              <Route
                path="/about"
                element={<AboutView onNavigate={setActiveSection} />}
              />
              <Route
                path="/casestudies"
                element={<CaseStudiesView onNavigate={setActiveSection} />}
              />
              <Route
                path="/awards"
                element={<AwardsView onNavigate={setActiveSection} />}
              />

              {isMobile && (
                <Route
                  path="/messages"
                  element={
                    <MobileMessagesView
                      onBack={() => setActiveSection("home")}
                    />
                  }
                />
              )}

              <Route
                path="/"
                element={
                  <>
                    <StoriesCarousel
                      clients={clients}
                      onStoryClick={(id) => setActiveStory(id)}
                    />
                    <FeedWithInfiniteScroll
                      onNavigate={setActiveSection}
                      logo={logo}
                      isFeedPaused={activeStory !== null}
                    />
                  </>
                }
              />

              {/* fallback: redirect unknown paths back home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
        {/* <PresenceSection
          onNavigate={setActiveSection}
          open={open}
          setOpen={(val) => {
            setOpen(val);
            if (!val) setActiveSection("home"); // ← reset to home when closing
          }}
        /> */}
        {/* Middle gap spacer */}
        {!isMobile && !isTablet && <div className="flex-[0.5] min-w-0" />}

        {/* Right Panel — desktop only, home only */}
        {!isTablet && (
          <div className={hideRightPanel ? "invisible" : "visible"}>
            <RightPanel
              events={upcomingEvents}
              caseStudies={caseStudies}
              awards={awards}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* Right gap spacer */}
        {!isMobile && !isTablet && <div className="flex-[5] min-w-0" />}
      </div>

      {/* Story Viewer Modal */}
      {activeStory !== null && (
        <StoryViewer
          clients={clients}
          activeClientId={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}

      {/* More Modal */}
      <CommonSectionModal
        isOpen={moreModalOpen}
        onClose={() => setMoreModalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Mobile Bottom Nav */}
      {/* {isMobile && (
        <MobileBottomNav
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      )} */}

      {/* Chatbot / Contact Widget (desktop only) */}
      {!isMobile && (
        <ChatbotWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      )}

      <Toaster position="bottom-center" richColors />
    </div>
  );
}

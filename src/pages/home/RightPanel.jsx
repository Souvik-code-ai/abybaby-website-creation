import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeader from "../../components/ui/SectionHeader";
import CaseStudyCard from "../../components/ui/CaseStudyCard";
import AwardCard from "../../components/ui/AwardCard";
import EventCard from "../../components/ui/EventCard";
import {
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  Trophy,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

export function RightPanel({ events, caseStudies, awards, onNavigate }) {
  return (
    <aside className="overflow-y-auto w-[320px] px-5 pt-7 pb-7 [scrollbar-width:none] bg-[var(--background)] font-[var(--font-family-body)]">
      {/* Upcoming Events */}
      <section className="mb-8">
        <div className="flex items-center justify-between">
          <SectionHeader icon={Calendar} label="Upcoming Events" />
          <Link
            className="text-[#579F63] text-xs font-semibold  no-underline"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            onClick={() => onNavigate("/events")}
            to={"/events"}
          >
            See all
          </Link>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <Divider />

      {/* Case Studies */}
      <section className="mb-8">
        <div className="flex items-center justify-between">
          <SectionHeader icon={BookOpen} label="Case Studies" />
          <Link
            className="text-xs text-[var(--accent)] font-semibold  no-underline"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            onClick={() => onNavigate("/casestudies")}
            to={"/casestudies"}
          >
            See all
          </Link>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.id} caseStudy={cs} />
          ))}
        </div>
      </section>

      <Divider />

      <section className="mb-8">
        <div className="flex items-center justify-between">
          <SectionHeader icon={Trophy} label="Awards & Recognition" />
          <Link
            to={"/awards"}
            className="text-xs text-[var(--accent)] font-semibold  no-underline"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            onClick={() => onNavigate("/awards")}
          >
            See all
          </Link>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {awards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>
      </section>

      <Divider />

      <footer className="pt-2 pb-6">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {[
            { title: "Home", link: "home", path: "/" },
            { title: "About", link: "about", path: "/about" },
            { title: "Presence", link: "presence", path: "#" },
            { title: "Profile", link: "profile", path: "/profile" },
            {
              title: "Privacy Policy",
              link: "privacypolicy",
              path: "/privacypolicy",
            },
            {
              title: "Data Privacy",
              link: "dataprivacy",
              path: "/dataprivacy",
            },
            { title: "Terms & Conditions", link: "terms", path: "/terms" },
          ].map((item) => (
            <Link
              to={item.path}
              key={item.title}
              onClick={() => onNavigate(item.link)}
              className="text-[11px] text-[var(--muted-foreground)] no-underline font-[var(--font-family-body)] transition-colors duration-150 cursor-pointer"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted-foreground)")
              }
            >
              {item.title}
            </Link>
          ))}
        </div>
        <p className="text-[11px] text-[var(--muted-foreground)] opacity-60 mt-3 font-[var(--font-family-body)]">
          © 2026 Abybaby Events. All rights reserved.
        </p>
      </footer>
    </aside>
  );
}

function Divider() {
  return null;
}

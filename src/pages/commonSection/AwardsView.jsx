import { useEffect, useRef, useState } from "react";
import { ArrowLeft, MapPin, Calendar, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { AWARDS } from "../../../public/awards/awards";
import AwardsSidebarCarousel from "../../components/ui/AwardsSidebarCarousel";
import { buildAwardsSchema } from "../../seo/awardsSchema";
// ── Sidebar Carousel (identical mechanics to CaseStudiesView) ─────────────────
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../seo/breadcrumbSchema";
// ── Skeleton image wrapper — shows a pulsing block until the image loads ──────
function SkeletonImage({ src, alt, className, wrapperClassName }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${wrapperClassName ?? ""}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

// ── Skeleton for the whole main content column (title, hero, summary, body) ──
function AwardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="h-3 w-24 rounded bg-gray-200 animate-pulse mb-2" />
        <div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse mb-3" />
        <div className="flex gap-4">
          <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>

      <div className="rounded-xl overflow-hidden w-full aspect-video bg-gray-200 animate-pulse" />

      <div className="rounded-xl p-4 bg-gray-100">
        <div className="h-3 w-full rounded bg-gray-200 animate-pulse mb-2" />
        <div className="h-3 w-5/6 rounded bg-gray-200 animate-pulse" />
      </div>

      <div className="flex flex-col gap-4">
        {[0, 1].map((i) => (
          <div key={i}>
            <div className="h-3 w-full rounded bg-gray-200 animate-pulse mb-1.5" />
            <div className="h-3 w-4/5 rounded bg-gray-200 animate-pulse mb-2" />
            <div className="w-full aspect-video rounded-xl bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>

      <div>
        <div className="h-3 w-16 rounded bg-gray-200 animate-pulse mb-2" />
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-full aspect-[4/3] rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AwardsView({ onNavigate }) {
  const [activeId, setActiveId] = useState(1);
  const award = AWARDS.find((a) => a.id === activeId);
  const awardSchemas = buildAwardsSchema(AWARDS);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeId]);

  return (
    <>
         <JsonLd data={buildBreadcrumbSchema([
              { name: "Awards", url: "https://abybabyevents.com/awards" }
            ])} />
                 {awardSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      {" "}
      <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0">
        {/* Back button */}
        <Link
          to={"/"}
          onClick={() => onNavigate("home")}
          className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-0 mb-2 text-[#579F63] min-[1160px]:-ml-26 min-[770px]:-ml-10"
        >
          <ArrowLeft size={16} />
          Return back
        </Link>

        {/* Page label */}
        <div className="px-0 mb-2 min-[1160px]:-ml-26 min-[770px]:-ml-10">
          <div className="inline-block rounded-full bg-[rgba(87,159,99,0.12)] text-[#3d7a4a] text-[11px] font-semibold px-3 py-[3px]">
            Awards & Recognition
          </div>
        </div>

        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="flex flex-col min-[770px]:flex-row gap-10">
          {/* ── LEFT: Main content ── */}
          <div className="flex flex-col px-4 flex-1 min-w-0 min-[1160px]:-ml-29 min-[770px]:-ml-10">
            {!award ? (
              <AwardSkeleton />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-col gap-4"
                >
                  {/* Category + Title */}
                  <div>
                    <div className="text-[11px] font-semibold text-[#579F63] uppercase tracking-[0.06em] mb-1.5">
                      {award.category}
                    </div>
                    <h1 className="font-[family-name:var(--font-family-body)] text-[color:var(--foreground)] text-[18px] font-bold leading-[1.3] m-0 mb-[10px]">
                      {award.title}
                    </h1>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-4">
                      {[
                        { icon: <Trophy size={11} />, label: award.issuedBy },
                        { icon: <MapPin size={11} />, label: award.location },
                        {
                          icon: <Calendar size={11} />,
                          label: String(award.year),
                        },
                      ].map(({ icon, label }) => (
                        <div
                          key={label}
                          className="flex items-center gap-1 text-[11px] text-[color:var(--muted-foreground)]"
                        >
                          <span className="text-[#579F63]">{icon}</span>
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hero image */}
                  <SkeletonImage
                    src={award.heroImage}
                    alt={award.title}
                    wrapperClassName="rounded-xl overflow-hidden w-full aspect-auto"
                    className="h-full w-full block object-cover"
                  />

                  {/* Summary */}
                  <div className="rounded-xl p-4 bg-[rgba(87,159,99,0.05)] border-[0.5px] border-[rgba(87,159,99,0.25)]">
                    <p className="text-[13px] font-medium text-[color:var(--foreground)] leading-[1.65] m-0">
                      {award.summary}
                    </p>
                  </div>

                  {/* Body paragraphs */}
                  <div className="flex flex-col gap-4">
                    {award.body.map((block, i) => (
                      <div key={i}>
                        <p className="text-[13px] text-[color:var(--muted-foreground)] leading-[1.8] m-0 mb-[10px]">
                          {block.text}
                        </p>
                        {block.image && (
                          <div className="rounded-xl overflow-hidden mb-1">
                            <SkeletonImage
                              src={block.image}
                              alt={block.imageCaption ?? ""}
                              wrapperClassName="w-full aspect-auto"
                              className="w-full aspect-auto object-cover block"
                            />
                            {block.imageCaption && (
                              <div className="text-[11px] text-[color:var(--muted-foreground)] pt-1.5 px-1 pb-0 italic">
                                {block.imageCaption}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Gallery grid */}
                  {/* <div>
                    <div className="text-[11px] font-semibold text-[#579F63] uppercase tracking-[0.06em] mb-2">
                      Gallery
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {award.inlineImages?.map((img, i) => (
                        <div key={i} className="rounded-xl overflow-hidden">
                          <SkeletonImage
                            src={img.src}
                            alt={img.caption}
                            wrapperClassName="w-full aspect-[4/3]"
                            className="w-full aspect-[4/3] object-cover block"
                          />
                          <div className="text-[10px] text-[color:var(--muted-foreground)] pt-1 px-0.5 pb-0 text-center">
                            {img.caption}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div> */}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* ── RIGHT (desktop) / BELOW (mobile): Sidebar carousel ── */}
          <div className="w-full min-[770px]:w-[180px] min-[770px]:shrink-0 px-4 min-[770px]:px-0 mt-2 min-[770px]:mt-0">
            <AwardsSidebarCarousel
              awards={AWARDS}
              activeId={activeId}
              onSelect={setActiveId}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-2 pb-2 flex flex-col justify-center items-start px-4 flex-wrap">
          <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center">
            {[
              { title: "Home", link: "home", path: "/" },
              { title: "About", link: "about", path: "/about" },
              { title: "Profile", link: "profile", path: "/profile" },
              {
                title: "Privacy Policy",
                link: "privacypolicy",
                path: "/privacypolicy",
              },
              {
                title: "Data Privacy ",
                link: "dataprivacy",
                path: "/dataprivacy",
              },
              { title: "Terms & Conditions ", link: "terms", path: "/terms" },
            ].map((item) => (
              <Link
                to={item.path}
                key={item.title}
                onClick={() => onNavigate(item.link)}
                className="text-[11px] text-[color:var(--muted-foreground)] no-underline font-[family-name:var(--font-family-body)] transition-colors duration-150 cursor-pointer"
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
          <div className="flex flex-row items-center min-[770px]:justify-start w-full justify-center">
            <p className="text-[11px] text-[color:var(--muted-foreground)] opacity-60 mt-3 font-[family-name:var(--font-family-body)] ">
              © 2026 Abybaby Events. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

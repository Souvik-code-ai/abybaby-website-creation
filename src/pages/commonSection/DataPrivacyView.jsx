import { useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  User,
  Monitor,
  Target,
  Database,
  Share2,
  Clock,
  ShieldCheck,
  UserCheck,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
// ── Sub-components (same as TermsView) ───────────────────────────────────────

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-2 mb-3 pb-2">
      <span className="text-sm font-semibold text-[color:var(--foreground)]">
        {title}
      </span>
    </div>
  );
}

function ClauseCard({ label, children }) {
  return (
    <div className="rounded-xl p-3 mb-2 last:mb-0">
      {label && (
        <div className="text-[11px] font-semibold text-[#579F63] mb-1 uppercase tracking-[0.04em]">
          {label}
        </div>
      )}
      <div className="text-xs text-[color:var(--muted-foreground)] leading-[1.65]">
        {children}
      </div>
    </div>
  );
}

function InfoCard({ label, children }) {
  return (
    <div className="rounded-xl p-3 mb-2 last:mb-0">
      <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-[color:var(--foreground)]">
        {label}
      </div>
      <div className="text-xs text-[color:var(--muted-foreground)] leading-[1.65]">
        {children}
      </div>
    </div>
  );
}

function RegPill({ label }) {
  return (
    <span className="rounded-full text-[11px] font-semibold px-[10px] py-[3px]">
      {label}
    </span>
  );
}

function BulletList({ items }) {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <span key={item}>• {item}</span>
      ))}
    </div>
  );
}

function BodyText({ children }) {
  return (
    <p className="text-xs text-[color:var(--muted-foreground)] leading-[1.7] m-0 mb-2">
      {children}
    </p>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function DataPrivacyView({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0">
      {/* Back button */}
      <Link
        to={"/"}
        onClick={() => onNavigate("home")}
        className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-2 text-[#579F63]"
      >
        <ArrowLeft size={16} />
        Return back
      </Link>

      {/* Hero */}
      <div className="py-6 px-4 mb-6">
        <div className="inline-block rounded-full mb-2 bg-[rgba(87,159,99,0.12)] text-[#3d7a4a] text-[11px] font-semibold px-3 py-[3px]">
          GDPR & Data Rights
        </div>
        <h1 className="font-[family-name:var(--font-family-body)] text-[color:var(--foreground)] text-[22px] font-semibold m-0 mb-1">
          Data Privacy
        </h1>
        <p className="text-xs text-[color:var(--muted-foreground)] m-0">
          How we collect, use, store, and protect your personal data
        </p>
      </div>

      <div className="flex flex-col gap-6 px-4">
        {/* 1. Information We Collect */}
        <section>
          <SectionHeader title="Information We Collect" />
          <InfoCard label="Personal Information">
            <div className="flex flex-wrap gap-2 mt-1">
              {[
                "Name",
                "Phone Number",
                "Email Address",
                "Date of Birth",
                "Gender",
                "City",
                "Geo-location",
                "Photograph",
              ].map((f) => (
                <RegPill key={f} label={f} />
              ))}
            </div>
          </InfoCard>
          <InfoCard icon={<Monitor size={14} />} label="Technical Information">
            <div className="flex flex-wrap gap-2 mt-1">
              {[
                "IP Address",
                "Device ID",
                "Browser Information",
                "Referring & Exit URLs",
                "Website Interaction Data",
              ].map((f) => (
                <RegPill key={f} label={f} />
              ))}
            </div>
          </InfoCard>
        </section>

        {/* 2. Purpose of Data Collection */}
        <section>
          <SectionHeader title="Purpose of Data Collection" />
          <BodyText>We collect data to:</BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Provide requested services",
                "Personalize user experience",
                "Deliver customer support",
                "Communicate service-related updates",
                "Improve website functionality",
                "Comply with legal obligations",
                "Send promotional offers (with consent)",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 3. How Information is Collected */}
        <section>
          <SectionHeader title="How Information is Collected" />
          <ClauseCard>
            <BulletList
              items={[
                "Registration forms",
                "User interactions on the website",
                "Cookies and tracking technologies",
                "Analytics tools",
                "Device permissions",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 4. Use of Personal Information */}
        <section>
          <SectionHeader title="Use of Personal Information" />
          <BodyText>User data may be used for:</BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Service delivery",
                "Record maintenance",
                "Service improvement",
                "Legal and regulatory compliance",
                "User authentication",
                "Personalized content and advertising",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 5. Data Sharing and Disclosure */}
        <section>
          <SectionHeader title="Data Sharing and Disclosure" />
          <BodyText>Information may be shared with:</BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Authorized third-party service providers",
                "Business partners necessary for service fulfillment",
                "Government authorities when legally required",
                "Law enforcement agencies in compliance with applicable laws",
              ]}
            />
          </ClauseCard>
          <div className="rounded-xl p-3 mt-2 text-xs font-semibold text-[#3d7a4a]">
            ✓ We do not sell or rent personal information.
          </div>
        </section>

        {/* 6. Data Retention */}
        <section>
          <SectionHeader title="Data Retention" />
          <ClauseCard label="Retention Period">
            Personal information is retained only as long as necessary for the
            stated purposes.
          </ClauseCard>
          <ClauseCard label="Deletion">
            Information may be deleted upon withdrawal of consent, subject to
            applicable legal requirements.
          </ClauseCard>
        </section>

        {/* 7. User Rights */}
        <section>
          <SectionHeader title="User Rights" />
          <BodyText>Users have the right to:</BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Access their personal data",
                "Request corrections",
                "Withdraw consent",
                "Object to data processing",
                "Request deletion of data",
                "Lodge complaints with supervisory authorities",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 8. Data Security */}
        <section>
          <SectionHeader title="Data Security" />
          <BodyText>
            We implement industry-standard security measures to protect personal
            information against:
          </BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Unauthorized access",
                "Data loss",
                "Misuse",
                "Disclosure",
              ]}
            />
          </ClauseCard>
          <BodyText>
            However, no internet-based system can guarantee absolute security.
          </BodyText>
        </section>

        {/* 9. Consent Withdrawal, Data Download & Removal */}
        <section>
          <SectionHeader title="Consent Withdrawal, Data Download & Removal" />
          <BodyText>Users may request:</BodyText>
          <ClauseCard>
            <BulletList
              items={["Consent withdrawal", "Data download", "Data deletion"]}
            />
          </ClauseCard>

          {/* Contact card */}
          <div className="rounded-xl p-4 mt-2">
            <div className="flex items-center gap-2 mb-3 text-[13px] font-semibold">
              Contact Us to Exercise Your Rights
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-[color:var(--muted-foreground)]">
                <a
                  href="mailto:sucheta@abybaby.co.in"
                  className="text-[#579F63] no-underline"
                >
                  sucheta@abybaby.co.in
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-[color:var(--muted-foreground)]">
                <a
                  href="mailto:shaw.vijay@abybaby.co.in"
                  className="text-[#579F63] no-underline"
                >
                  shaw.vijay@abybaby.co.in
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="pt-6 pb-2 flex flex-col justify-center items-center">
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
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
        <p className="text-[11px] text-[color:var(--muted-foreground)] mt-3 font-[family-name:var(--font-family-body)]">
          © 2026 Abybaby Events. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

import { useEffect } from "react";
import ClauseCard from "../../components/ui/CluaseCard";
import {
  ArrowLeft,
  Mail,
  Cookie,
  BarChart2,
  ExternalLink,
  Smartphone,
  Lock,
  Users,
  UserCog,
  RefreshCw,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-2 mb-3 pb-2">
      <span className="text-sm font-semibold text-[color:var(--foreground)]">
        {title}
      </span>
    </div>
  );
}

function InfoCard({ icon, label, children }) {
  return (
    <div className="rounded-xl p-3 mb-2 last:mb-0">
      <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-[color:var(--foreground)]">
        <span className="text-[#579F63]">{icon}</span>
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
  return <p className="text-xs leading-[1.7] m-0 mb-2">{children}</p>;
}

// ── Main component ────────────────────────────────────────────────────────────

export function PrivacyPolicyView({ onNavigate }) {
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
          Legal Document
        </div>
        <h1 className="font-[family-name:var(--font-family-body)] text-[color:var(--foreground)] text-[22px] font-semibold m-0 mb-1">
          Privacy Policy
        </h1>
        <p className="text-xs text-[color:var(--muted-foreground)] m-0">
          Abybaby Events · How we handle your privacy across our website and
          applications
        </p>
      </div>

      <div className="flex flex-col gap-6 px-4">
        {/* 1. Introduction */}
        <section>
          <SectionHeader title="Introduction" />
          <div className="rounded-xl p-4">
            <BodyText>
              This Privacy Policy explains how Abybaby Events collects, uses,
              stores, and protects user information while providing services
              through its website and applications.
            </BodyText>
          </div>
        </section>

        {/* 2. Cookies Policy */}
        <section>
          <SectionHeader title="Cookies Policy" />
          <BodyText>The website uses the following types of cookies:</BodyText>
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              "Strictly Necessary",
              "Analytical / Performance",
              "Functionality",
              "Targeting",
            ].map((c) => (
              <RegPill key={c} label={c} />
            ))}
          </div>
          <ClauseCard label="Cookie Controls">
            Users may disable cookies through browser settings, although some
            services may not function properly as a result.
          </ClauseCard>
        </section>

        {/* 3. Google Analytics */}
        <section>
          <SectionHeader num={3} title="Google Analytics" />
          <InfoCard label="How we use Google Analytics">
            <BulletList
              items={[
                "Measure website traffic",
                "Analyze user behavior",
                "Improve user experience",
              ]}
            />
          </InfoCard>
          <BodyText>
            Google may process anonymized visitor data according to its own
            privacy practices.
          </BodyText>
        </section>

        {/* 4. External Links */}
        <section>
          <SectionHeader num={4} title="External Links" />
          <BodyText>
            The website may contain links to third-party websites. Regarding
            those websites, we:
          </BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Do not control third-party websites",
                "Are not responsible for their privacy practices",
                "Recommend reviewing their privacy policies before sharing information",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 5. Device Permissions */}
        <section>
          <SectionHeader num={5} title="Device Permissions" />
          <BodyText>The application may request access to:</BodyText>
          <div className="flex flex-wrap gap-2 mb-3">
            {["Location", "Camera", "Device Storage", "SMS", "PDF Viewer"].map(
              (p) => (
                <RegPill key={p} label={p} />
              ),
            )}
          </div>
          <ClauseCard label="Purpose">
            Permissions are used solely to provide the requested functionality
            and are not shared without user consent.
          </ClauseCard>
        </section>

        {/* 6. Confidentiality */}
        <section>
          <SectionHeader num={6} title="Confidentiality" />
          <BodyText>
            All personal information is treated as confidential and disclosed
            only:
          </BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "With user consent",
                "To authorized service providers",
                "When required by law",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 7. Third-Party Information Collectors */}
        <section>
          <SectionHeader num={7} title="Third-Party Information Collectors" />
          <ClauseCard>
            Third-party advertisers and service providers may collect
            information under their own privacy policies. Users should review
            those policies independently before engaging with such services.
          </ClauseCard>
        </section>

        {/* 8. Profile Access and Modification */}
        <section>
          <SectionHeader num={8} title="Profile Access and Modification" />
          <BodyText>Registered users may:</BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Review profile information",
                "Update personal details",
                "Request removal of certain information",
              ]}
            />
          </ClauseCard>
          <ClauseCard label="Restrictions">
            Email ID and mobile number may have restrictions on modification.
            Please contact us for assistance with such changes.
          </ClauseCard>
        </section>

        {/* 9. Policy Updates */}
        <section>
          <SectionHeader num={9} title="Policy Updates" />
          <ClauseCard label="Amendments">
            The Privacy Policy may be updated periodically. Continued use of the
            website after updates constitutes acceptance of the revised policy.
            We recommend reviewing this page regularly.
          </ClauseCard>
        </section>

        {/* 10. Contact Information */}
        <section>
          <SectionHeader num={10} title="Contact Information" />
          <BodyText>
            For any privacy-related queries, please reach out to us:
          </BodyText>
          <div className="rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3 text-[13px] font-semibold text-[color:var(--foreground)]">
              Get in Touch
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
              <div className="flex items-center gap-2 text-[12px]">
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

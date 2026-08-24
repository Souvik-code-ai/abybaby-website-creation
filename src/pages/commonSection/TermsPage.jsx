import { useEffect } from "react";
import ClauseCard from "../../components/ui/CluaseCard";
import InfoCard from "../../components/ui/InfoCard";
import BulletList from "../../components/ui/BulletList";
import {
  ArrowLeft,
  Mail,
  Building2,
  Scale,
  Gavel,
  MapPin,
  List,
} from "lucide-react";
import { Link } from "react-router-dom";
import RegPill from "../../components/ui/RegPill";
import BodyText from "../../components/ui/BodyText";
// ── Static data ───────────────────────────────────────────────────────────────
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../seo/breadcrumbSchema";
const TOC_ITEMS = [
  { id: "general", label: "General Terms" },
  { id: "registration", label: "Registration" },
  { id: "payment", label: "Payment Gateway" },
  { id: "eligibility", label: "Eligibility" },
  { id: "content", label: "Content" },
  { id: "indemnity", label: "Indemnity" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "term", label: "Term & Termination" },
  { id: "obligations", label: "User Obligations" },
  { id: "ip", label: "Intellectual Property" },
  { id: "disclaimer", label: "Disclaimer of Warranties" },
  { id: "force", label: "Force Majeure" },
  { id: "dispute", label: "Dispute Resolution" },
  { id: "misc", label: "Miscellaneous" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-2 mb-3 pb-2 ">
      <span className="font-semibold text-[14px]">{title}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function TermsView({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
         <JsonLd data={buildBreadcrumbSchema([
                            { name: "Terms & Conditions", url: "https://abybabyevents.com/terms" }
                          ])} />
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
      <div className="py-6 px-4 border-b border-[color:var(--border)] mb-6">
        <div className="inline-block rounded-full mb-2 bg-[rgba(87,159,99,0.12)] text-[#3d7a4a] text-[11px] font-semibold px-3 py-[3px]">
          Legal Document
        </div>
        <h1 className="font-[family-name:var(--font-family-body)] text-[color:var(--foreground)] text-[22px] font-semibold m-0 mb-1">
          Terms of Use
        </h1>
        <p className="text-xs text-[color:var(--muted-foreground)] m-0">
          Abybaby E-Com Private Limited · Kolkata, West Bengal – 700026
        </p>
      </div>

      {/* Preamble */}
      <div className="rounded-xl p-4 mb-6 mx-4">
        <p className="text-xs text-[color:var(--muted-foreground)] leading-[1.7] m-0 mb-2">
          This legal agreement is an electronic record under the Information
          Technology Act, 2000. This website is created and operated by{" "}
          <strong className="text-[color:var(--foreground)]">
            M/s Abybaby E-Com Private Limited
          </strong>
          , a private limited company incorporated under the Companies Act,
          2013, having its registered address at Ground Floor, 4B, Rani Bhabani
          Road, Kolkata, West Bengal – 700026, operating under the brand name
          "Abybaby".
        </p>
        <p className="text-xs text-[color:var(--muted-foreground)] leading-[1.7] m-0">
          <strong className="text-[color:var(--foreground)]">
            "We", "Our", "Us"
          </strong>{" "}
          = the website.{" "}
          <strong className="text-[color:var(--foreground)]">
            "You", "User", "Customer"
          </strong>{" "}
          = persons using this website.{" "}
          <strong className="text-[color:var(--foreground)]">
            "Third Parties"
          </strong>{" "}
          = any website or individual apart from Users and the website creator.
        </p>
      </div>

      <div className="flex flex-col gap-6 px-4">
        {/* 1. General Terms */}
        <section id="general">
          <SectionHeader title="General Terms" />
          <ClauseCard label="Governing Rules">
            Use of this website is solely governed by these Terms of Use,
            Privacy Policy, and any modifications made thereto at our sole
            discretion. Continued access constitutes agreement to be bound by
            these terms.
          </ClauseCard>
          <ClauseCard label="Co-terminus">
            These Terms of Use and Privacy Policy are co-terminus in nature —
            expiry or termination of one will lead to termination of the other.
          </ClauseCard>
          <ClauseCard label="Amendments">
            We reserve the sole and exclusive right to amend or modify these
            Terms without prior notice. Amendments come into effect immediately.
            Continued use signifies acceptance of the changed terms.
          </ClauseCard>
        </section>

        {/* 2. Registration */}
        <section id="registration">
          <SectionHeader num={2} title="Registration" />
          <BodyText>
            Registration on the website is mandatory. The following information
            must be provided:
          </BodyText>
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              "Name",
              "Phone Number",
              "Email ID",
              "Geo-location",
              "Date of Birth",
              "Photo",
            ].map((f) => (
              <RegPill key={f} label={f} />
            ))}
          </div>
          <BodyText>
            Users may also link social media accounts such as Google and
            Facebook at the time of signing up.
          </BodyText>
        </section>

        {/* 3. Payment Gateway */}
        <section id="payment">
          <SectionHeader num={3} title="Payment Gateway" />
          <BodyText>
            All payments are processed through a third-party payment gateway.
            You will be redirected to this gateway, which may seek additional
            information and charge applicable gateway fees.
          </BodyText>
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              "Razorpay",
              "Debit Card",
              "Credit Card",
              "Net Banking",
              "UPI",
              "Wallets",
            ].map((f) => (
              <RegPill key={f} label={f} />
            ))}
          </div>
          <BodyText>
            You shall be governed by the payment gateway's own Terms,
            Conditions, and Policies for all payment-related aspects.
          </BodyText>
        </section>

        {/* 4. Eligibility */}
        <section id="eligibility">
          <SectionHeader num={4} title="Eligibility" />
          <ClauseCard label="Competency">
            You represent that you are competent and of age to enter into
            legally binding agreements under Indian law. Minors may use this
            website only under the supervision and consent of a legal guardian.
          </ClauseCard>
          <ClauseCard label="Compliance">
            You represent that you will comply with these Terms and all
            applicable local, state, national, and international laws, rules,
            and regulations currently in force.
          </ClauseCard>
        </section>

        {/* 5. Content */}
        <section id="content">
          <SectionHeader num={5} title="Content" />
          <BodyText>
            All text, advertisements, graphics, photographs, trademarks, logos,
            sounds, music, and artwork (collectively 'Content') is generated by
            users or third parties. We make no guarantees regarding quality,
            accuracy, integrity, or genuineness of such content.
          </BodyText>
          <ClauseCard label="Copyright">
            All content on the website is subject to copyright and shall not be
            reused without prior written consent from us and the copyright
            owner.
          </ClauseCard>
          <ClauseCard label="User Responsibility">
            You are solely responsible for the integrity, authenticity, quality,
            and genuineness of content you provide. We may suspend or terminate
            accounts that share untrue, inaccurate, misleading, or offensive
            content.
          </ClauseCard>
          <ClauseCard label="Limited Privilege">
            You have a personal, non-exclusive, non-transferable, revocable,
            limited privilege to access the content on the website. You shall
            not copy, adapt, or modify any content without written permission
            from us.
          </ClauseCard>
        </section>

        {/* 6. Indemnity */}
        <section id="indemnity">
          <SectionHeader num={6} title="Indemnity" />
          <BodyText>
            You agree to indemnify and hold us and our directors, officers,
            employees, and agents harmless from any losses, liabilities, claims,
            damages, demands, costs, and expenses arising out of:
          </BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Your use of the website",
                "Your violation of these Terms of Use",
                "Your violation of any rights of another",
                "Your alleged improper conduct",
                "Your conduct in connection with the website",
              ]}
            />
          </ClauseCard>
          <BodyText>
            You agree to fully cooperate in indemnifying us at your expense and
            not to settle with any party without our consent. In no event shall
            we be liable to compensate you or any third party for any special,
            incidental, indirect, consequential, or punitive damages.
          </BodyText>
        </section>

        {/* 7. Limitation of Liability */}
        <section id="liability">
          <SectionHeader num={7} title="Limitation of Liability" />
          <BodyText>
            We are not responsible for consequences arising from:
          </BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Website inoperability due to internet connectivity errors",
                "Incorrect information or data entered by you",
                "Undue delay or inability to communicate via email",
                "Deficiency or defect in services managed by us",
                "Failure in any other service provided by us",
              ]}
            />
          </ClauseCard>
          <BodyText>
            The website accepts no liability for any errors, omissions, or
            damage resulting from use or misuse. To the fullest extent permitted
            by law, your sole and exclusive remedy for any dispute is to
            terminate your use of the website.
          </BodyText>
        </section>

        {/* 8. Term & Termination */}
        <section id="term">
          <SectionHeader num={8} title="Term & Termination" />
          <ClauseCard label="Duration">
            These Terms remain in full force and effect for as long as you
            continue to access and use the website. You may terminate your use
            at any time.
          </ClauseCard>
          <ClauseCard label="Our Rights">
            We may terminate these Terms and close your account at any time
            without notice if any discrepancy or legal issue arises. We reserve
            the right to deny access to any user to protect the interests of the
            website or other users.
          </ClauseCard>
          <ClauseCard label="Service Discontinuation">
            We may discontinue the website and services without any prior
            notice.
          </ClauseCard>
        </section>

        {/* 9. User Obligations */}
        <section id="obligations">
          <SectionHeader num={9} title="User Obligations" />
          <BodyText>
            By using this website, you agree and undertake to:
          </BodyText>
          <ClauseCard label="You must">
            <BulletList
              items={[
                "Provide genuine credentials and keep your information accurate and up-to-date",
                "Maintain confidentiality of your account password",
                "Notify us immediately of any unauthorized use of your account",
                "Comply with all applicable laws and regulations",
                "Use the website for lawful purposes only",
              ]}
            />
          </ClauseCard>
          <ClauseCard label="You must not">
            <BulletList
              items={[
                "Use a fictitious identity to register",
                "Impersonate any person or entity",
                "Probe, scan, or test the vulnerability of the website",
                "Disrupt or interfere with the website's security",
                "Use deep-link, robot, spider, or automatic devices to access the website",
                "Post defamatory, offensive, obscene, or unlawful content",
                "Copy, modify, or create derivative works without prior written permission",
                "Engage in money laundering, gambling, or unlawful activities",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 10. Intellectual Property */}
        <section id="ip">
          <SectionHeader num={10} title="Intellectual Property Rights" />
          <BodyText>
            All trade names, trademarks, service marks, logos, domain names,
            designs, and graphics created by or developed for the website are
            the property of the website or the respective copyright or trademark
            owner.
          </BodyText>
          <BodyText>
            You shall not use any intellectual property displayed on the website
            in any manner that is likely to cause confusion among users or that
            disparages or discredits the website. Any reproduction or
            infringement of intellectual property will result in legal action.
            This section survives termination of these Terms.
          </BodyText>
        </section>

        {/* 11. Disclaimer */}
        <section id="disclaimer">
          <SectionHeader num={11} title="Disclaimer of Warranties" />
          <ClauseCard>
            You access the website at your sole risk. Any information,
            resources, activities, or recommendations obtained from the website
            will not create any warranty. We disclaim all liabilities resulting
            therefrom.
          </ClauseCard>
          <ClauseCard>
            We do not guarantee that features and content will be uninterrupted
            or error-free, or that the website or its server will be free of
            viruses or other harmful components.
          </ClauseCard>
        </section>

        {/* 12. Force Majeure */}
        <section id="force">
          <SectionHeader num={12} title="Force Majeure" />
          <BodyText>
            We will not be liable for damages for any delay or failure to
            perform our obligations if such delay or failure is due to causes
            beyond our control, including but not limited to acts of war, acts
            of God, earthquake, riot, fire, sabotage, labour disputes, internet
            interruption, technical failure, hacking, piracy, or other force
            majeure events.
          </BodyText>
        </section>

        {/* 13. Dispute Resolution */}
        <section id="dispute">
          <SectionHeader num={13} title="Dispute Resolution & Jurisdiction" />
          <InfoCard icon={<Scale size={14} />} label="Mediation First">
            Disputes shall first be resolved by mediation administered by the
            Centre for Online Resolution of Disputes (CORD) at{" "}
            <a
              href="http://www.resolveoncord.com"
              className="text-[#579F63]"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.resolveoncord.com
            </a>{" "}
            within 45 days of initiation.
          </InfoCard>
          <InfoCard icon={<Gavel size={14} />} label="Arbitration">
            If mediation fails within 45 days, the dispute shall be resolved by
            arbitration administered by CORD. Language: English. Seat: Kolkata,
            India.
          </InfoCard>
          <InfoCard icon={<MapPin size={14} />} label="Governing Law">
            These Terms are governed by the laws, rules, and regulations of
            India.
          </InfoCard>
        </section>

        {/* 14. Miscellaneous */}
        <section id="misc">
          <SectionHeader num={14} title="Miscellaneous" />
          <ClauseCard label="Entire Agreement">
            These Terms of Use, read with the Privacy Policy, form the complete
            and final contract between the parties and supersede all other
            communications and agreements relating thereto.
          </ClauseCard>
          <ClauseCard label="Waiver">
            Failure to require performance of any provision shall not affect our
            right to enforce it later. No waiver of any breach shall be deemed a
            continuing waiver of the same or any other breach.
          </ClauseCard>
          <ClauseCard label="Severability">
            If any provision is held invalid by a court of competent
            jurisdiction, the remaining provisions shall continue in full force
            and effect.
          </ClauseCard>
        </section>

        {/* Contact */}
        <div className="rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3 text-[13px] font-semibold text-[color:var(--foreground)]">
            <Mail size={14} className="text-[#579F63]" />
            Contact Us
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2 text-xs text-[color:var(--muted-foreground)]">
              <Building2 size={13} className="text-[#579F63] shrink-0 mt-px" />
              <span>
                M/s Abybaby E-Com Private Limited, Ground Floor, 4B, Rani
                Bhabani Road, Kolkata, West Bengal – 700026
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[color:var(--muted-foreground)]">
              <Mail size={13} className="text-[#579F63] shrink-0" />
              <span>
                <a
                  href="mailto:sucheta@abybaby.co.in"
                  className="text-[#579F63] no-underline"
                >
                  sucheta@abybaby.co.in
                </a>{" "}
                ·{" "}
                <a
                  href="mailto:shaw.vijay@abybaby.co.in"
                  className="text-[#579F63] no-underline"
                >
                  shaw.vijay@abybaby.co.in
                </a>
              </span>
            </div>
          </div>
        </div>
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
    </>
  );
}

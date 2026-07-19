import { Info, BookOpen, Award, Shield, FileText, Lock } from "lucide-react";
export const sidebarItems = [
  {
    icon: Info,
    label: "About Us",
    desc: "Our story and mission",
    view: "about",
  },
  {
    icon: BookOpen,
    label: "Case Studies",
    desc: "Premium event portfolios",
    view: "casestudies",
  },
  {
    icon: Award,
    label: "Awards and Recognitions",
    desc: "Our achievements",
    view: "awards",
  },
  {
    icon: Shield,
    label: "Privacy Policy",
    desc: "How we protect your data",
    view: "privacypolicy",
  },
  {
    icon: FileText,
    label: "Terms & Conditions",
    desc: "Usage guidelines",
    view: "terms",
  },
  {
    icon: Lock,
    label: "Data Privacy",
    desc: "GDPR & data rights",
    view: "dataprivacy",
  },
];

import dt2 from "../../src/assets/images/drumtao/dt2.webp";
import dt4 from "../../src/assets/images/drumtao/dt6.webp";
import dt5 from "../../src/assets/images/drumtao/dt5.webp";
import dt3 from "../../src/assets/images/drumtao/dt3.webp";
import zira1 from "../../src/assets/images/zira/zira1.webp";
import zira4 from "../../src/assets/images/zira/zira4.webp";
import zira2 from "../../src/assets/images/zira/zira2.webp";
import zira3 from "../../src/assets/images/zira/zira3.webp";
import mia1 from "../../src/assets/images/mia/mia 1.webp";
import mia2 from "../../src/assets/images/mia/mia 2.webp";
import mia3 from "../../src/assets/images/mia/mia2.webp";
import mia4 from "../../src/assets/images/mia/mia3.webp";
import sonpurMela1 from "../../src/assets/images/sonpurMela/sonpurMela1.webp";
import sonpurMela2 from "../../src/assets/images/sonpurMela/sonpurMela2.webp";
import tataIntraVijayUtsavImage from "../../src/assets/images/tataInstra/tataIntraVijayUtsav.webp";
// NOTE: dt* and mia* images are placeholders reused from the case-studies set —
// swap for real award-ceremony / campaign photography when available.
// issuedBy for Mahindra and Ziro entries is a placeholder label; the actual
// brief didn't name the awarding body — update once confirmed.

export const AWARDS = [
  {
    id: 1,
    title: "Guinness World Records — World's Coolest Ice Cream Party",
    year: 2026,
    category: "Experiential Milestone",
    issuedBy: "Guinness World Records",
    location: "Hyderabad, India",
    heroImage: dt2,
    summary:
      "A Guinness World Records attempt for Arun Ice Creams (Hatsun Agro Product Ltd.) that turned a brand celebration into a certified global record and a landmark experiential moment.",
    body: [
      {
        text: "The campaign achieved significant brand visibility and public engagement, successfully securing a Guinness World Record with 5,113 participating children — a large-scale experiential milestone that strengthened Arun Ice Creams' reputation and its connection with the community it set out to celebrate.",
        image: dt4,
        imageCaption: "The record-attempt count in progress",
      },
      {
        text: "Beyond the certification itself, the event demonstrated what precise, large-scale operational execution can achieve when paired with genuine audience delight — a record set not just in numbers, but in the goodwill and visibility it generated for the brand.",
      },
    ],
    inlineImages: [
      {
        src: dt3,
        caption: "Event floor, Hyderabad International Convention Centre",
      },
      {
        src: dt4,
        caption: "Operations during the record attempt",
      },
      {
        src: dt5,
        caption: "The moment of celebration",
      },
    ],
  },
  {
    id: 2,
    title: "Excellence in Rural Marketing & CSR — Sonpur Mela",
    year: 2024,
    category: "Rural Marketing & CSR",
    issuedBy: "Rural Marketing & CSR Excellence Awards",
    location: "Sonpur Mela, Bihar",
    heroImage: sonpurMela1,
    summary:
      "Mahindra's Sonpur Mela activation earned dual recognition — Excellence in Rural Marketing (Gold and Silver) and Excellence in CSR (Silver) — while converting genuine grassroots engagement into measurable sales impact.",
    body: [
      {
        text: "The Sonpur Mela activation was recognised with two distinct honours: Excellence in Rural Marketing, where the campaign won both Gold and Silver, and Excellence in CSR, where it took Silver — a rare double recognition that reflects both commercial effectiveness and the campaign's social welfare focus.",
        image: sonpurMela2,
        imageCaption: "Engaging visitors at the Sonpur Mela grounds",
      },
      {
        text: "The numbers behind the awards were substantial: 4,000+ units of a Mahindra vehicle were sold directly to customers who had come to attend the cattle fair, while the campaign's animal welfare messaging engaged over 15,000 people on the ground — leaving, by the client's own account, an indelible impression on the participants of Sonpur Mela.",
      },
    ],
    inlineImages: [
      {
        src: sonpurMela1,
        caption: "Representatives engaging Mela visitors",
      },
      {
        src: sonpurMela2,
        caption: "Vehicle showcase at the fairgrounds",
      },
    ],
  },
  {
    id: 3,
    title: "Best Brand Activation at a Music Event",
    year: 2024,
    category: "Brand Activation",
    issuedBy: "Ziro Music Festival",
    location: "Ziro Music Festival, Arunachal Pradesh",
    heroImage: zira1,
    summary:
      "Toyota's experience-led presence at the Ziro Music Festival earned recognition for Best Brand Activation at a Music Event, driven by strong engagement and brand recall among festival-goers.",
    body: [
      {
        text: "The campaign drove strong engagement and brand recall at the Ziro Music Festival, earning recognition for Best Brand Activation at a Music Event — validation of an approach built on organic discovery rather than conventional, hard-sell brand messaging.",
        image: zira4,
        imageCaption: "An interactive touchpoint within the festival grounds",
      },
      {
        text: "The recognition affirmed that meeting a culturally aware audience on their own terms — through immersive, experience-led engagement — can deliver brand recall that a traditional activation format would struggle to match.",
      },
    ],
    inlineImages: [
      {
        src: zira3,
        caption: "Festival-goers exploring the Toyota engagement zone",
      },
      {
        src: zira4,
        caption: "An interactive brand touchpoint",
      },
      {
        src: zira2,
        caption: "Ziro Music Festival grounds",
      },
    ],
  },
  {
    id: 4,
    title:
      "Best Consumer Activation of the Year — Awarded at the BW Applause Awards 2025 for Tata Intra Vijay Utsav",
    year: 2025,
    category: "Consumer Activation",
    issuedBy: "Tata Intra Vijay Utsav",
    location: " India",
    heroImage: tataIntraVijayUtsavImage,
    summary:
      "Best Consumer Activation of the Year — Awarded at the BW Applause Awards 2025 for Tata Intra Vijay Utsav, recognizing our on-ground activation that drove real engagement and buyer confidence for Tata Motors' Intra range across India's interior markets.",
    body: [
      {
        text: "Best Consumer Activation of the Year — Awarded at the BW Applause Awards 2025 for Tata Intra Vijay Utsav, recognizing our large-scale on-ground activation campaign designed to transform visibility for Tata Motors' Intra range across India's interior markets. Moving beyond conventional showroom experiences, the campaign took the brand directly into real transport hubs, enabling potential buyers to engage with authentic test drives and real-world payload performance demonstrations. This hands-on approach built genuine buyer confidence and unlocked substantial market potential across underserved regions. With 561+ activations executed, 60,000+ engaged attendees, and 900+ strong buying interests generated, the campaign set a new benchmark for experiential, results-driven brand activation in the commercial vehicle space.",
        // image: zira4,
        // imageCaption: "An interactive touchpoint within the festival grounds",
      },
    ],
    // inlineImages: [
    //   {
    //     src: zira3,
    //     caption: "Festival-goers exploring the Toyota engagement zone",
    //   },
    //   {
    //     src: zira4,
    //     caption: "An interactive brand touchpoint",
    //   },
    //   {
    //     src: zira2,
    //     caption: "Ziro Music Festival grounds",
    //   },
    // ],
  },
];

import dt2 from "../../src/assets/images/drumtao/dt2.webp";
import dt4 from "../../src/assets/images/drumtao/dt4.webp";
import dt5 from "../../src/assets/images/drumtao/dt5.webp";
import dt3 from "../../src/assets/images/drumtao/dt3.webp";
import zira1 from "../../src/assets/images/zira/zira1.webp";
import zira4 from "../../src/assets/images/zira/zira4.webp";
import zira2 from "../../src/assets/images/zira/zira2.webp";
import zira3 from "../../src/assets/images/zira/zira3.webp";
import arun from "../../src/assets/images/arun/arun.webp";
import arun2 from "../../src/assets/images/arun/arun2.webp";
import arun3 from "../../src/assets/images/arun/arun3.webp";
import arun4 from "../../src/assets/images/arun/arun4.webp";
import sonpurMela1 from "../../src/assets/images/sonpurMela/sonpurMela1.webp";
import sonpurMela2 from "../../src/assets/images/sonpurMela/sonpurMela2.webp";
import sonpurMelaVdo from "../../src/assets/images/sonpurMela/sonpurMela.mp4";
export const CASE_STUDIES = [
  {
    id: 1,
    title: "World's Coolest Ice Cream Party",
    category: "Guinness World Records Attempt",
    client: "Arun Ice Creams (Hatsun Agro Product Ltd.)",
    location: "Hyderabad, India",
    year: "2026",
    guests: "6,000 children (5,113 confirmed by Guinness)",
    heroImage: arun, // placeholder — replace with real event photo
    summary:
      "An official Guinness World Records attempt that turned a brand celebration into a nationwide moment — bringing together thousands of children for the largest ice-cream party of its kind.",
    body: [
      {
        text: 'On 6 February 2026, Hatsun Agro Product Ltd. set out to break a Guinness World Record with the "World\'s Coolest Ice Cream Party," hosted at the Hyderabad International Convention Centre. Around 6,000 children were brought together for a single, unified celebration — an ambitious brief that called for the record attempt to double as a genuinely joyful, brand-forward experience for its youngest audience.',
      },
      {
        text: "As the event management agency, we owned execution end to end. That meant coordinating school outreach and registration for thousands of participating children, building catering operations at scale, and designing safety and hygiene protocols robust enough for a crowd of this size and age group — all functioning under one roof, on one clock.",
        image: arun2,
        imageCaption: "Coordinating the event floor on record-attempt day",
      },
      {
        text: "Guinness World Records attempts live and die on procedure. Every count, checkpoint, and piece of documentation had to meet official adjudication standards without slowing the experience down for thousands of children waiting to take part. Our team ran strict, rehearsed protocols across registration, timing, and verification to keep the attempt airtight.",
      },
      {
        text: "The result: 5,113 children officially confirmed by Guinness World Records, securing the title and delivering a standout experiential win for the brand — proof that large-scale operational precision and genuine audience delight aren't mutually exclusive.",
        image: arun3,
        imageCaption: "Children gathering for the record-attempt count",
      },
    ],
    inlineImages: [
      {
        src: arun2,
        caption: "Event floor, Hyderabad International Convention Centre",
      },
      {
        src: arun3,
        caption: "Operations during the record attempt",
      },
      {
        src: arun4,
        caption: "The moment of celebration",
      },
    ],
  },
  {
    id: 2,
    title: "Mahindra at Sonpur Mela",
    category: "Brand & Social Awareness Activation",
    client: "Mahindra and Mahindra",
    location: "Sonpur Mela, Bihar",
    year: "2024",
    guests: "Cattle traders, farmers & visitors",
    heroImage: sonpurMela1, // placeholder — replace with real activation photo
    summary:
      "A ground-level activation at one of India's oldest and largest cattle fairs, positioning Mahindra vehicles as a practical, sustainable alternative for a community built around animal trade.",
    body: [
      {
        text: "Sonpur Mela is one of Asia's largest cattle fairs, drawing farmers, traders, and visitors from across the region for centuries of tradition built around animal trade. Mahindra's brief was to enter this space not as an outsider disrupting tradition, but as a brand offering a genuine, socially conscious alternative — introducing their vehicles to a crowd whose livelihoods have long centred on cattle.",
      },
      {
        text: "The campaign was built around social and animal welfare messaging at its core, rather than a conventional sales push. This meant the activation had to earn trust in an environment defined by generations of custom, engaging visitors on their own terms rather than imposing a brand narrative on them.",
        image: sonpurMela2,
        imageCaption: "Engaging visitors at the Sonpur Mela grounds",
      },
      {
        text: "We stationed representatives across key points throughout the Mela, directly engaging cattle buyers, farmers, and visitors passing through. Conversations centred on positioning the Mahindra vehicle as cheaper, more sustainable, and increasingly more convenient than maintaining cattle — a comparison designed to resonate immediately with an audience that understands the real cost of animal ownership better than most.",
      },
      {
        text: "By meeting the community where they were — literally, on the fairgrounds — the activation delivered brand awareness that felt earned rather than inserted, opening a genuine dialogue between a modern vehicle brand and a deeply traditional audience.",
      },
    ],
    inlineImages: [
      {
        src: sonpurMela2,
        caption: "Representatives engaging Mela visitors",
      },
      {
        type: "video", // 👈 new video entry
        src: sonpurMelaVdo,
        poster: sonpurMela1, // thumbnail shown in the grid before it's clicked
        caption: "Highlight reel — record-attempt day",
      },
    ],
  },
  {
    id: 3,
    title: "Toyota at Ziro Music Festival",
    category: "Experiential Brand Activation",
    client: "Toyota",
    location: "Ziro Music Festival, Arunachal Pradesh",
    year: "2024",
    guests: "Festival attendees",
    heroImage: zira1,
    summary:
      "An experience-led brand presence woven into one of India's most culturally distinctive indie music festivals, built on organic discovery rather than hard selling.",
    body: [
      {
        text: "Ziro Music Festival is one of India's most celebrated indie music gatherings — known as much for its strong community and sustainability ethos as for its music, and drawing a culturally aware, experience-driven crowd from across the country. Toyota's brief was to build a meaningful presence within that ecosystem, one that felt native to the festival's spirit rather than layered on top of it.",
      },
      {
        text: "Rather than a conventional activation built around product displays and hard-sell messaging, Toyota's brand experience was integrated directly into the festival's flow through immersive engagement zones and interactive touchpoints, inviting festival-goers to discover the brand organically as they moved through the grounds.",
        image: zira4,
        imageCaption: "An interactive touchpoint within the festival grounds",
      },
      {
        text: "The activation prioritised experience-led interaction over transactional engagement, giving music lovers space to connect with Toyota in the same relaxed, culturally attuned environment they came to the festival for — a deliberate choice that let the brand earn attention rather than demand it.",
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
];

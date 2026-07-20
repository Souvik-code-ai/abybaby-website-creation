import dt2 from "../../src/assets/images/drumtao/dt2.webp";
import { useRef } from "react";
import mia1 from "../../src/assets/images/mia/mia 1.webp";
import zira1 from "../../src/assets/images/zira/zira1.webp";
import arun from "../../src/assets/images/arun/arun.webp";
import reebok1 from "../../src/assets/images/reebok/reebok1.webp.webp";
import agomoni1 from "../../src/assets/images/agomoni/agomoni1.webp";
import hurdlehawk1 from "../../src/assets/images/hurdle_hawk/hurdle_hawk1.webp";
import asianpaints1 from "../../src/assets/images/asian_paints/asianpaints1.webp";
import yamaha1 from "../../src/assets/images/yamaha/yamaha1.webp";
import cesc1 from "../../src/assets/images/cesc/cesc1.webp";
import somanytitles1 from "../../src/assets/images/somanytiles/somanytitles2.webp";
import industower1 from "../../src/assets/images/indus_tower_bandhan/indus_tower_1.webp";
import nh7weekeneder1 from "../../src/assets/images/nh7weekender/nh7weekender1.webp";
import revlonStreet2 from "../../src/assets/images/revlonStreet/revlonStreet2.webp";
import nlgi1 from "../../src/assets/images/nlgiIndiaChapter/nlgi1.webp";
import marutiRdse1 from "../../src/assets/images/marutiRdseMeet/MarutiRdse1.webp";
import xuvLaunch1 from "../../src/assets/images/XUVLaunch/xuvLaunch.webp";
import veritoLaunching1 from "../../src/assets/images/verito/verito1.webp";
import gyanbharati1 from "../../src/assets/images/gyanBharti/gyanBharati.webp";
import mahindraAO1 from "../../src/assets/images/mahindraAo/mahindraAO.webp";
import mahindraHHI1 from "../../src/assets/images/mahindraHHI/mahindraHHI.webp";
import vodafoneNorthStar1 from "../../src/assets/images/vodafoneNorthStar/vodafoneNorthStar.webp";
import vodafoneTakkar from "../../src/assets/images/vodafoneTarikka/vodafoneTakkar.webp";
import vodafoneTopGun1 from "../../src/assets/images/vodafoneTopGun/vodafoneTopGun.webp";
import karizmaCricket1 from "../../src/assets/images/karizmaCricket/karizmaCricket.webp";
import mahindraLogan1 from "../../src/assets/images/mahindraLogan/mahindraLogan.webp";
import sunfeast1 from "../../src/assets/images/sunfeast/sunfeast.webp";
import tataInstra1 from "../../src/assets/images/tataInstra/tataInstra.webp";
import toyotaCrystal1 from "../../src/assets/images/toyotaCrystal/toyotaCrystal.webp";
import vodafone_13_1 from "../../src/assets/images/vodafone_13/vodafone_2013_1.webp";
import mahindraNavistar1 from "../../src/assets/images/mahindraNavistarLaunch/mahindraNavistar1.webp";
export const EVENTS = [
  {
    id: 1,
    type: "Concert",
    status: "upcoming",
    name: " Toyota Drum Tao",
    date: "12 Oct 2026",
    location: "Kolkata",
    attendees: "70000+",
    image: dt2,
  },

  {
    id: 2,
    type: "Concert",
    status: "expired",
    name: "Toyota Ziro",
    date: "8 Feb 2027",
    location: "Assam",
    attendees: "10000+",
    image: zira1,
  },
  {
    id: 3,
    type: "Concert",
    status: "expired",
    name: "Agomoni",
    date: "3 Mar 2024",
    location: "Mumbai",
    attendees: "500+",
    image: agomoni1,
  },
  {
    id: 4,
    type: "MICE",
    status: "upcoming",
    name: "Toyota Execution",
    date: "26 Jan 2027",
    location: "Kolkata",
    attendees: "200+",
    image: arun,
  },

  // {
  //   id: 5,
  //   type: " MICE",
  //   status: "upcoming",
  //   name: "Tata Bandhan",
  //   date: "1 Dec 2026",
  //   location: "Kolkata",
  //   attendees: "600+",
  //   image:
  //     "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
  // },

  {
    id: 5,
    type: " MICE",
    status: "expired",
    name: "Asian Paint",
    date: "1 Dec 2026",
    location: "Kolkata",
    attendees: "700+",
    image: asianpaints1,
  },
  {
    id: 6,
    type: " Sports Events",
    status: "expired",
    name: "Hurdle Hawk",
    date: "1 Dec 2026",
    location: "Kolkata",
    attendees: "1000+",
    image: hurdlehawk1,
  },
  // {
  //   id: 9,
  //   type: " Sports Events",
  //   status: "upcoming",
  //   name: "Hillux",
  //   date: "1 Dec 2026",
  //   location: "Kolkata",
  //   attendees: "1400+",
  //   image:
  //     "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
  // },
  {
    id: 7,
    type: " Dealers Meet",
    status: "expired",
    name: "Somany Titles",
    date: "1 Dec 2026",
    location: "Kolkata",
    attendees: "650+",
    image: somanytitles1,
  },
  {
    id: 8,
    type: " Sports Events",
    status: "expired",
    name: "Yamaha",
    date: "1 Dec 2026",
    location: "Kolkata",
    attendees: "1500+",
    image: yamaha1,
  },
  {
    id: 9,
    type: " MICE",
    status: "expired",
    name: "CESC Annual Conference",
    date: "1 Dec 2026",
    location: "Kolkata",
    attendees: "150+",
    image: cesc1,
  },
  {
    id: 10,
    type: " MICE",
    status: "expired",
    name: "Indus Tower Bandhan",
    date: "1 Dec 2026",
    location: "Kolkata",
    attendees: "850+",
    image: industower1,
  },
  {
    id: 11,
    type: " Sports Events",
    status: "expired",
    name: "NH7 Weekender",
    date: "1 Dec 2026",
    location: "Kolkata",
    attendees: "40000+",
    image: nh7weekeneder1,
  },
  {
    id: 12,
    type: " Brand Prmomotion",
    status: "expired",
    name: "Revlon Street Wear Launch ",
    date: "1 Dec 2026",
    location: "Kolkata",
    attendees: "600+",
    image: revlonStreet2,
  },
  {
    id: 13,
    name: "Mahindra Navistar Launch",
    status: "expired",
    type: "Launch",
    image: mahindraNavistar1,
    date: "2nd dec",
    location: "kolkata",
    attendees: "2000+",
  },
];

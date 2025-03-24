// src/pages/Home.jsx
import React from "react";
import Hero from "../components/hero";      // Hero section
import Event from "../components/Event";    // Event section
import Organizer from "../components/organizer"; // Organizer section
import FAQ from "../components/faqsection";        // FAQ section
import Timetable from "../components/timetable"; // Timetable section
import Gallery from "../components/gallery";  // Gallery section
import ContactUs from "../components/contactus"; // Contact Us section

export default function Home() {
  return (
    <div>
      {/* Home page specific sections */}
      <Hero />
      <Event />
      <Organizer />
      <FAQ />
      <Timetable />
      <Gallery />
      <ContactUs />
    </div>
  );
}

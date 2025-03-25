// src/pages/Home.jsx
import React from "react";
import Hero from "../components/hero";      
import Event from "../components/Event";    
import Organizer from "../components/organizer"; 
import FAQ from "../components/faqsection";       
import Timetable from "../components/timetable"; 
import Gallery from "../components/gallery";  
import ContactUs from "../components/contactus"; 

export default function Home() {
  return (
    <div>
      <Hero />
      <Event />
      <Organizer />
      <FAQ />
      <Timetable />
      <Gallery />
      <div id="contact">
        <ContactUs />
      </div>
    </div>
  );
}

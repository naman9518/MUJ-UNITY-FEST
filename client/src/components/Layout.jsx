import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./hero";
import Event from "./Event";
import Organizer from "./organizer";
import FAQ from "./faqsection";
import Timetable from "./timetable"
import Gallery from "./gallery";
import ContactUs from "./contactus";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Outlet />
      <Event />
      <Organizer />
      <FAQ />
      <Timetable />
      <Gallery />
      <ContactUs />
      <Footer />
    </div>
  );
}

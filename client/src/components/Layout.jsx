// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";  // Navbar component used on every page
import Footer from "./Footer";  // Footer component used on every page

export default function Layout() {
  return (
    <div>
      {/* Navbar appears on every page */}
      <Navbar />
      
      {/* Outlet for page-specific content */}
      <Outlet />  {/* The page content will be injected here based on route */}
      
      {/* Footer appears on every page */}
      <Footer />
    </div>
  );
}

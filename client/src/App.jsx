import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Competition from "./pages/competition"
import Aboutus from "./pages/Aboutus";
import Contact from "./pages/Contact";


export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, 
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="competition" element={<Competition />} />
        {/* <Route path="sponsor" element={<Sponsor />} /> */}
        <Route path="about" element={<Aboutus />} />
        <Route path="contact" element={<Contact />} />
      
  
      </Route>

      {/* 404 Error Page */}
      <Route
        path="*"
        element={
          <h1 className="text-center text-red-600 font-bold text-3xl mt-10">
            Error 404 - Page Not Found
          </h1>
        }
      />
    </Routes>
  );
}

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";  
import Home from "./pages/Home";      
import Sponsor from "./pages/sponsor";   

import Aboutus from "./pages/Aboutus";   

import SignUp from "./pages/SignUp";     
import SignIn from "./pages/SignIn";      

export default function App() {
  return (
    <Routes>
      {/* Main Layout Wrapper */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />  
        <Route path="sponsor" element={<Sponsor />} />  

        <Route path="aboutus" element={<Aboutus />} />  
        <Route path="signup" element={<SignUp />} /> 
        <Route path="signin" element={<SignIn />} /> 
      </Route>

      {/* 404 Page Not Found */}
      <Route path="*" element={<h1 className="text-center text-red-600 font-bold text-3xl mt-10">Error 404 - Page Not Found</h1>} />
    </Routes>
  );
}

// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";  // Layout with Navbar and Footer
import Home from "./pages/Home";          // Home page content
import Aboutus from "./pages/Aboutus";    // About Us page content
import SignUp from "./pages/SignUp";      // SignUp page content
import SignIn from "./pages/SignIn";      // SignIn page content

export default function App() {
  return (
    <Routes>
      {/* Layout is shared across all pages */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />  {/* Home page */}
        <Route path="/aboutus" element={<Aboutus />} />  {/* About Us page */}
        <Route path="/signup" element={<SignUp />} />  {/* Sign Up page */}
        <Route path="/signin" element={<SignIn />} />  {/* Sign In page */}
      </Route>

      {/* Catch-all route for 404 page */}
      <Route path="*" element={<h1>Error 404 - Page Not Found</h1>} />
    </Routes>
  );
}

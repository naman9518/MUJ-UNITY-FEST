import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./utilis/Resuable/Layout";
import Home from "./pages/Home/Home";
import Competition from "./pages/competition/competition";
import Aboutus from "./pages/Aboutus/Aboutus";
import Sponsor from "./pages/sponsor/sponsor";
import Contact from "./pages/Contact/Contact";
import TreasureHunt from "./components/Competition component/Games/TreasureHunt/treasure_hunt";
import Quiz from "./components/Competition component/Games/Quiz/Quiz";
import LameJokes from "./components/Competition component/Games/LameJoke/Lamejokes";
import SpeedTyping from "./components/Competition component/Games/Typingspeed/typingspeed";
import Pubg from "./components/Competition component/Games/Pubg/pubg";
import CodingChallenge from "./components/Competition component/Games/Coding/coding";
import { AuthProvider } from "./contexts/authContext.jsx";

import "./style.css";
import "./components/Competition component/competition.css";
import "./utilis/Resuable/game.css";
import "./components/home component/home.css";
import "./components/Sponsor Component/sponsorform.css";
import "./components/Sponsor Component/sponsor.css";
import "./utilis/Resuable/Footer";
import "./utilis/Resuable/Header";
import "./utilis/Resuable/TeamMembers";
import "./pages/Auth/login/LoginModal.css";
import "./pages/Auth/signup/signup.css";
import "./pages/Auth/signup/SignupSuccess.css";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="competition" element={<Competition />} />
          <Route path="sponsor" element={<Sponsor />} />
          <Route path="about" element={<Aboutus />} />
          <Route path="contact" element={<Contact />} />
          <Route path="game/treasure-hunt" element={<TreasureHunt />} />
          <Route path="/game/quiz" element={<Quiz />} />
          <Route path="/game/lame-jokes" element={<LameJokes />} />
          <Route path="/game/speed-typing" element={<SpeedTyping />} />
          <Route path="/game/pubg" element={<Pubg />} />
          <Route path="/game/coding-challenge" element={<CodingChallenge />} />
        </Route>
        <Route
          path="*"
          element={
            <h1 className="text-center text-red-600 font-bold text-3xl mt-10">
              Error 404-Page Not Found
            </h1>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import instagram from "../assets/instagram.svg";
import whatsapp from "../assets/whatsapp.svg";
const Navbar = () => {
  return (
    <nav className="w-full shadow-md">
      <div className="bg-secondary text-white py-3 px-6 flex justify-end items-center gap-6 text-md">
        <div className="flex items-center gap-2">
          <img src={instagram} className="h-6" />
          <span>Instagram</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={whatsapp} className="h-4 " />
          <span>Whatsapp</span>
        </div>
      </div>

      <div className="bg-[#FFEE95] py-6 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-16" />
        </Link>

        <div className="bg-white py-4 px-10 flex items-center gap-6 rounded-4xl shadow-lg border border-secondary">
          <ul className="flex gap-6 text-black font-medium text-lg">
            {["Home", "Competitions", "Sponsor", "About Us", "Contact-Us"].map(
              (item, index) => (
                <li key={item} className="flex items-center gap-6">
                  <Link
                    to={`/${item}`}
                    className="relative hover:underline  hover:decoration-secondary hover:decoration-4 hover:transition-all hover:duration-400"
                  >
                    {item}
                  </Link>
                  {index !== 4 && <span className="text-[#FFD700]">|</span>}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-secondary hover:bg-primary text-white px-6 py-2 rounded shadow font-semibold"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="border bg-white border-[#C87826] px-6 py-2 rounded shadow font-semibold"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", path: "/" },
      { name: "Events", path: "/events" },
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "FAQs", path: "/faq" },
      { name: "Event Map", path: "/event-map" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms & Conditions", path: "/terms" },
    ],
  },
];

const socialLinks = [
  { name: "Facebook", icon: <FaFacebook size={20} />, url: "#" },
  { name: "Instagram", icon: <FaInstagram size={20} />, url: "#" },
  { name: "Twitter", icon: <FaTwitter size={20} />, url: "#" },
  { name: "LinkedIn", icon: <FaLinkedin size={20} />, url: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">Your Logo</h2>
          <p>
            MUJ-UNITY-FEST is a platform where users can unite with their
            batchmates and play games and win reward
          </p>
          <p className="mt-3">&copy; 2024 Your Company</p>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-gray-600 block">
                    &gt; {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  className="hover:text-gray-600 flex items-center space-x-2"
                >
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 text-center py-3 text-sm">
        Made by <span className="font-semibold">Your Name</span>
      </div>
    </footer>
  );
}

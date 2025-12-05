import React from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const SocialIcon = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-red-500 transition-colors duration-300"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">

          {/* Brand / Copyright */}
          <p className="text-sm text-gray-400 mt-6 md:mt-0 order-2 md:order-1 text-center md:text-left">
            © {new Date().getFullYear()} MyPortfolio — All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex space-x-6 order-1 md:order-2">
            <SocialIcon href="https://web.facebook.com/aminur.rahman4078/">
              <FaFacebookF className="h-5 w-5" />
            </SocialIcon>

            <SocialIcon href="https://github.com/aminur-tech">
              <FaGithub className="h-5 w-5" />
            </SocialIcon>

            <SocialIcon href="https://www.linkedin.com/in/aminur-rahman4078">
              <FaLinkedinIn className="h-5 w-5" />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { HiCode as Code, HiMenu as Menu, HiX as X } from "react-icons/hi"; // ✅ import icons

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      setIsOpen(false);
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => scrollToSection("hero")}
            className="flex items-center text-2xl font-bold text-white uppercase tracking-wider hover:text-red-500 transition"
          >
            <Code className="h-6 w-6 mr-2 text-red-600" />
            Aminur Rahman
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              <li><button onClick={() => scrollToSection("hero")} className="text-gray-300 hover:text-red-400">Home</button></li>
              <li><button onClick={() => scrollToSection("about")} className="text-gray-300 hover:text-red-400">About</button></li>
              <li><button onClick={() => scrollToSection("skills")} className="text-gray-300 hover:text-red-400">Skills</button></li>
              <li><button onClick={() => scrollToSection("projects")} className="text-gray-300 hover:text-red-400">Projects</button></li>
              <li><button onClick={() => scrollToSection("contact")} className="text-gray-300 hover:text-red-400">Contact</button></li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-gray-300 hover:text-red-500">
            {isOpen ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <nav className="lg:hidden bg-gray-900/95 border-b border-gray-800 shadow-lg pb-4">
          <ul className="flex flex-col items-center space-y-4 pt-4">
            <li><button onClick={() => scrollToSection("hero")}>Home</button></li>
            <li><button onClick={() => scrollToSection("about")}>About</button></li>
            <li><button onClick={() => scrollToSection("skills")}>Skills</button></li>
            <li><button onClick={() => scrollToSection("projects")}>Projects</button></li>
            <li><button onClick={() => scrollToSection("contact")}>Contact</button></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

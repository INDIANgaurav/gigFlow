import { useState } from "react";
import { Link } from "react-router-dom";
import CompanyLogo from "../assets/CompanyLogo.png";
import profilePic from "../assets/profilepic.jpg";
import { CiSettings } from "react-icons/ci";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[linear-gradient(153.05deg,_#9CBCF8_-1.23%,_#FFFFFF_246.46%)] rounded-4xl w-[90%] max-w-7xl mx-auto mt-4 mb-4 px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <img src={CompanyLogo} alt="company-logo" className="w-36 md:w-44" />
      </div>

      {/* Hamburger button for small screens */}
      <button
        className="md:hidden text-blue-600 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </button>

      {/* Links - hidden on small screens unless menuOpen */}
    <div
  className={`flex-col md:flex-row md:flex items-center gap-3 text-blue-500 absolute md:static top-18 md:top-auto left-1/2 transform -translate-x-1/2 md:translate-x-0 bg-white md:bg-transparent w-[50%] text-center md:w-auto rounded-b-2xl md:rounded-none shadow-md md:shadow-none transition-transform ${
    menuOpen ? "translate-y-0" : "-translate-y-[500px]"
  } md:translate-y-0 z-20`}
>

        <Link
          to="/dashboard"
          className="block md:inline-block px-4 py-2 hover:bg-white hover:text-blue rounded-2xl transition"
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          to="/people"
          className="block md:inline-block px-4 py-2 hover:bg-white hover:text-blue rounded-2xl transition"
          onClick={() => setMenuOpen(false)}
        >
          People
        </Link>
        <Link
          to="/hiring"
          className="block md:inline-block px-4 py-2 hover:bg-white hover:text-blue rounded-2xl transition"
          onClick={() => setMenuOpen(false)}
        >
          Hiring
        </Link>
        <Link
          to="/salary"
          className="block md:inline-block px-4 py-2 hover:bg-white hover:text-blue rounded-2xl transition"
          onClick={() => setMenuOpen(false)}
        >
          Salary
        </Link>
        <Link
          to="/reviews"
          className="block md:inline-block px-4 py-2 hover:bg-white hover:text-blue rounded-2xl transition"
          onClick={() => setMenuOpen(false)}
        >
          Reviews
        </Link>
      </div>

      {/* Right side icons */}
      <div className="hidden md:flex items-center gap-3 text-blue-600">
        <CiSettings size={22} />
        <HiOutlineBellAlert size={22} />

        <div className="w-px h-6 bg-black" />

        <img
          src={profilePic}
          alt="profile-pic"
          className="rounded-full w-10 h-10 "
        />
      </div>
    </nav>
  );
};

export default Navbar;

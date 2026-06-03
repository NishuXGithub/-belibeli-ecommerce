"use client";

import { useState } from "react";

const navLinks = [
  { label: "Mitra BeliBeli", href: "/mitra" },
  { label: "About BeliBeli", href: "/about" },
  { label: "BeliBeli Care", href: "/care" },
  { label: "Promo", href: "/promo" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-100 border border-gray-200">
      <div className="w-full h-[80px] px-4 md:px-10 flex items-center justify-between">
        
        {/* Left Side */}
        <div className="text-white flex gap-2">
          <div className="flex items-center justify-center rounded-sm bg-gray-300 w-4 h-5">
            <span className="text-white font-bold">M</span>
          </div>

          <h3 className="font-roboto text-gray-400 font-semibold text-sm">
            Download BeliBeli App
          </h3>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-roboto text-gray-400 text-sm">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex gap-3 items-center">
          <div className="hidden sm:flex gap-3">
            <span className="text-gray-200">|</span>
            <div className="font-bold text-black">Sign Up</div>

            <span className="text-gray-200">|</span>
            <div className="font-bold text-black">Login</div>
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl text-black z-50"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden w-full bg-white border-t border-gray-200 px-4 py-4 flex flex-col gap-4 shadow-lg">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <div className="border-t pt-3 flex gap-4">
            <span className="font-bold text-black">Sign Up</span>
            <span className="font-bold text-black">Login</span>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
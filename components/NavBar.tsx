"use client";

import Link from "next/link";
import Image from "next/image";
import { content } from "@/data";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-garden-dark/90 backdrop-blur-sm">
        <div className="container flex items-center justify-between py-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg font-medium tracking-tight text-primary"
          >
            <Image
              src="/logo.png"
              alt={`${content.websiteInfo.name} Logo`}
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
            <span className="font-heading">{content.websiteInfo.name}</span>
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-primary hover:text-gray-300 transition-colors duration-200 uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={content.websiteInfo.instagram}
              target="_blank"
              className="text-gray-400 hover:text-primary transition-colors text-sm font-medium"
            >
              IG
            </Link>
            <button
              className="md:hidden text-primary relative w-6 h-6 flex flex-col justify-center gap-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div
                className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-garden-dark/95 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-primary hover:text-gray-300 transition-all duration-300 text-2xl font-medium uppercase tracking-wider transform ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div
            className={`pt-8 border-t border-gray-800 transition-all duration-300 transform ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <Link
              href={content.websiteInfo.instagram}
              target="_blank"
              className="text-gray-400 hover:text-primary transition-colors text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

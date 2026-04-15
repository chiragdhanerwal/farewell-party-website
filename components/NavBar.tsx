"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { label: "Drinks", href: "/drinks" },
  { label: "Main Course", href: "/main-course" },
  { label: "Starters", href: "/starters" },
  { label: "Desserts", href: "/desserts" },
];

const navLinksBefore = [
  { label: "AGENDA", href: "/agenda" },
];

const navLinksAfter = [
  { label: "EVENT FLOW", href: "#event-flow" },
  { label: "DETAILS", href: "#details" },
  { label: "QUERIES", href: "#queries" },
];

interface NavBarProps {
  onJoin: () => void;
}

export default function NavBar({ onJoin }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full flex flex-wrap items-center justify-center gap-4 py-4 px-4">

      {/* Links before menu (AGENDA) */}
      {navLinksBefore.map((link) =>
        link.href.startsWith("/") ? (
          <Link
            key={link.label}
            id={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
            href={link.href}
            className="
              px-4 py-2.5 text-xs md:text-sm tracking-widest uppercase font-bold
              text-white/50 hover:text-white transition-colors duration-300
            "
          >
            {link.label}
          </Link>
        ) : (
          <a
            key={link.label}
            id={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
            href={link.href}
            className="
              px-4 py-2.5 text-xs md:text-sm tracking-widest uppercase font-bold
              text-white/50 hover:text-white transition-colors duration-300
            "
          >
            {link.label}
          </a>
        )
      )}

      {/* Menu dropdown */}
      <div ref={menuRef} className="relative">
        <button
          id="menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="
            flex items-center gap-1.5 px-6 py-2.5 text-xs md:text-sm tracking-widest uppercase font-bold
            border border-white/30 text-white/80
            hover:border-white hover:text-white transition-all duration-300
          "
        >
          MENU
          <motion.div animate={{ rotate: menuOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown size={14} />
          </motion.div>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: 0.2 }}
              className="
                absolute left-1/2 -translate-x-1/2 top-full mt-2
                w-44 bg-black/95 border border-white/10 backdrop-blur-sm
                z-50 overflow-hidden
              "
            >
              {menuItems.map((item, i) =>
                item.href ? (
                  <Link
                    key={item.label}
                    id={`menu-item-${i}`}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="
                      block w-full px-5 py-3 text-left text-xs tracking-widest uppercase
                      text-white/60 hover:text-white hover:bg-[#ff2d2d]/10 transition-colors duration-200
                      border-b border-white/5 last:border-0
                    "
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    id={`menu-item-${i}`}
                    className="
                      block w-full px-5 py-3 text-left text-xs tracking-widest uppercase
                      text-white/60 hover:text-white hover:bg-[#ff2d2d]/10 transition-colors duration-200
                      border-b border-white/5 last:border-0
                    "
                  >
                    {item.label}
                  </button>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Links after menu (EVENT FLOW, DETAILS, QUERIES) */}
      {navLinksAfter.map((link) => (
        <a
          key={link.label}
          id={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
          href={link.href}
          className="
            px-4 py-2.5 text-xs md:text-sm tracking-widest uppercase font-bold
            text-white/50 hover:text-white transition-colors duration-300
          "
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Service", href: "/services" },
  { name: "Package", href: "/packages" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Magnetic amount={0.2}>
            <Link href="/" className="nav-logo">
              <img src="/botmate-icon.png" alt="BotMate Logo" className="logo-img" />
            </Link>
          </Magnetic>
        </motion.div>

        {/* Desktop Links */}
        <ul className="nav-links">
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Magnetic amount={0.15}>
                <Link href={link.href} className="nav-link">
                  {link.name}
                  <motion.div className="link-underline" layoutId="nav-underline" />
                </Link>
              </Magnetic>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Magnetic amount={0.2}>
              <Link href="/get-started" className="nav-cta">
                Get Started
              </Link>
            </Magnetic>
          </motion.li>
        </ul>

        {/* Mobile Toggle */}
        <button 
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu open"
          >
            <div className="mobile-links">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={link.href} onClick={() => setMobileMenuOpen(false)}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/get-started" className="m-cta" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 72px;
          background: rgba(4, 8, 15, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 229, 255, 0.07);
          transition: all 0.3s ease;
        }

        .navbar-scrolled {
          background: rgba(4, 8, 15, 0.9);
          backdrop-filter: blur(25px);
          height: 64px;
          border-bottom: 1px solid rgba(0, 229, 255, 0.15);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }
        .logo-img { height: 100px; width: auto; object-fit: contain; }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s;
          letter-spacing: 0.2px;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #00e5ff;
          background: rgba(0, 229, 255, 0.08);
        }

        .nav-cta {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #060a0f;
          text-decoration: none;
          padding: 10px 26px;
          border-radius: 50px;
          background: #00e5ff;
          margin-left: 10px;
          transition: all 0.25s;
          box-shadow: 0 4px 18px rgba(0, 229, 255, 0.38);
          white-space: nowrap;
          display: inline-block;
        }

        .nav-cta:hover {
          background: #00f7ff;
          box-shadow: 0 6px 28px rgba(0, 229, 255, 0.55);
          transform: translateY(-1px);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1001;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s;
        }
        .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mobile-menu {
          position: fixed;
          inset: 0;
          background: rgba(4, 8, 15, 0.98);
          backdrop-filter: blur(25px);
          z-index: 999;
          display: none;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(-20px);
        }
        .mobile-menu.open {
          display: flex;
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .mobile-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        .mobile-links a {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          transition: color 0.3s;
        }
        .mobile-links a:hover { color: #00e5ff; }
        .m-cta {
          margin-top: 10px;
          padding: 16px 48px !important;
          background: #00e5ff !important;
          color: #060a0f !important;
          border-radius: 50px !important;
        }

        @media (max-width: 960px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .navbar { padding: 0 24px; }
        }
      `}</style>
    </>
  );
}

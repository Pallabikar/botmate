"use client";

import React from "react";
import Link from "next/link";
import BotDefenseGame from "./BotDefenseGame";
import { Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { StaggerReveal, RevealItem, AnimatedText } from "./AnimationSystem";
import Magnetic from "./Magnetic";

export default function GlobalFooter() {
  return (
    <footer className="global-footer">
        <StaggerReveal stagger={0.15}>
          <div className="footer-inner">
            
            {/* Brand Col */}
            <RevealItem>
              <div className="footer-col brand-col">
                <Magnetic amount={0.25}>
                  <Link href="/" className="footer-logo">
                    BOT<span>MATE</span>
                  </Link>
                </Magnetic>
                <div className="footer-tagline-wrap">
                  <AnimatedText 
                    text="Leading the digital evolution through AI-driven strategies, futuristic design, and high-performance automation."
                    className="footer-tagline"
                    delay={0.4}
                  />
                </div>
                <div className="footer-socials">
                  <Magnetic amount={0.3}>
                    <a href="#" className="footer-social"><Twitter size={14} /></a>
                  </Magnetic>
                  <Magnetic amount={0.3}>
                    <a href="#" className="footer-social"><Linkedin size={14} /></a>
                  </Magnetic>
                  <Magnetic amount={0.3}>
                    <a href="https://www.instagram.com/thebotmate" target="_blank" className="footer-social"><Instagram size={14} /></a>
                  </Magnetic>
                </div>
              </div>
            </RevealItem>

            {/* Links Col */}
            <RevealItem>
              <div className="footer-col">
                <h4 className="footer-col-heading">Protocols</h4>
                <ul className="footer-links">
                  <li><Link href="/" className="footer-link">Home</Link></li>
                  <li><Link href="/about" className="footer-link">About Us</Link></li>
                  <li><Link href="/services" className="footer-link">Services</Link></li>
                  <li><Link href="/packages" className="footer-link">Packages</Link></li>
                </ul>
              </div>
            </RevealItem>

            {/* Contact Col */}
            <RevealItem>
              <div className="footer-col">
                <h4 className="footer-col-heading">Transmission</h4>
                <ul className="footer-contact-list">
                  <li>
                    <Mail size={14} /> 
                    <span>contactbotmate@gmail.com</span>
                  </li>
                  <li>
                    <Phone size={14} /> 
                    <span>+91 97772 09527</span>
                  </li>
                  <li>
                    <MapPin size={14} /> 
                    <span>Bhubaneswar, ODISHA 751015</span>
                  </li>
                </ul>
              </div>
            </RevealItem>

            {/* Interactive Col */}
            <RevealItem>
              <div className="footer-col interactive-col">
                <h4 className="footer-col-heading">System Defense</h4>
                <div className="game-wrapper">
                   <BotDefenseGame />
                </div>
              </div>
            </RevealItem>

          </div>
        </StaggerReveal>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} BOTMATE AI SYSTEMS. ALL RIGHTS RESERVED.</p>
          <div className="footer-meta">
            <span>SECURE CONNECTION</span>
            <div className="status-dot" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');

        .global-footer {
          background: #030609;
          border-top: 1px solid rgba(0,229,255,0.08);
          font-family: 'Montserrat', sans-serif;
          color: #fff;
          position: relative;
          z-index: 10;
        }

        .footer-top {
          padding: 100px 0 60px;
        }
        .footer-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 48px;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 1fr 1.5fr;
          gap: 60px;
        }

        .footer-logo { 
          font-size: 26px; font-weight: 900; color: #fff; text-decoration: none;
          letter-spacing: -.5px; display: block; margin-bottom: 20px;
        }
        .footer-logo span { color: #00e5ff; }
        
        .footer-tagline { 
          font-size: 13.5px; color: rgba(255,255,255,0.4); 
          line-height: 1.8; margin-bottom: 30px; max-width: 280px; 
        }

        .footer-socials { display: flex; gap: 12px; }
        .footer-social {
          width: 38px; height: 38px; border-radius: 12px;
          background: rgba(0,229,255,0.04);
          border: 1px solid rgba(0,229,255,0.12);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5); text-decoration: none;
          transition: all 0.3s ease;
        }
        .footer-social:hover {
          border-color: #00e5ff; color: #00e5ff; background: rgba(0,229,255,0.08);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,229,255,0.2);
        }

        .footer-col-heading {
          font-size: 11px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.2em; color: rgba(255,255,255,0.3); margin-bottom: 24px;
        }

        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-link { 
          font-size: 14px; color: rgba(255,255,255,0.5); 
          text-decoration: none; transition: color 0.2s; 
        }
        .footer-link:hover { color: #00e5ff; }

        .footer-contact-list { list-style: none; display: flex; flex-direction: column; gap: 16px; }
        .footer-contact-list li { 
          display: flex; gap: 12px; align-items: flex-start;
          font-size: 13.5px; color: rgba(255,255,255,0.45); 
        }
        .footer-contact-list li span { line-height: 1.4; }

        .game-wrapper {
          border-radius: 16px; overflow: hidden;
          border: 1px solid rgba(0,229,255,0.1);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 30px 0;
        }
        .footer-bottom-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 48px;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 11px; color: rgba(255,255,255,0.25); font-weight: 600;
          letter-spacing: 0.05em;
        }
        .footer-meta { display: flex; align-items: center; gap: 10px; }
        .status-dot { 
          width: 6px; height: 6px; background: #00e5ff; border-radius: 50%; 
          box-shadow: 0 0 8px #00e5ff; animation: pulseStatus 2s infinite;
        }

        @keyframes pulseStatus {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        @media (max-width: 1100px) {
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 48px; }
          .interactive-col { grid-column: span 2; }
        }
        @media (max-width: 768px) {
          .footer-inner { grid-template-columns: 1fr; gap: 40px; }
          .interactive-col { grid-column: span 1; }
          .footer-bottom-inner { flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
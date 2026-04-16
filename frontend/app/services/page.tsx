"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { StaggerReveal, RevealItem, AnimatedText } from "@/components/AnimationSystem";

/* ─────────────────────────────────────────────
   DETAILED SERVICES
───────────────────────────────────────────── */
const SERVICES_DETAIL = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6M11 8v6"/></svg>,
    title: "SEO Optimization",
    features: ["Advanced Keyword Intelligence", "Technical SEO Audits", "AI-Powered Content Optimization", "Premium Backlink Strategy"],
    desc: "We don't just optimize for search engines; we optimize for conversion. Our AI-driven SEO strategies identify high-intent keywords that competitors miss.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: "Social Media Management",
    features: ["Viral Content Design", "Community Engagement AI", "Cross-Platform Strategy", "Influencer Partnerships"],
    desc: "Transform your social presence into a community. We use trend-prediction AI to ensure your brand is always part of the conversation.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4M9 9h1.5a1.5 1.5 0 0 1 0 3H9v3M14 9h2M14 12h2M14 15h2"/></svg>,
    title: "AI Chatbots",
    features: ["Natural Language Processing", "Seamless CRM Integration", "24/7 Lead Qualification", "Multi-Language Support"],
    desc: "Intelligent agents that sound human and sell effectively. Our chatbots learn from every interaction to improve your customer experience.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    title: "Paid Ads",
    features: ["Algorithmic Bidding", "Creative A/B Testing", "Retargeting Mastery", "ROI Tracking Dashboards"],
    desc: "Stop wasting budget. We use predictive modeling to allocate your spend where it will generate the highest return on investment.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    title: "Content Creation",
    features: ["High-End Motion Graphics", "AI-Assisted Copywriting", "Professional Photography", "Brand Storytelling"],
    desc: "Content that captures attention and commands respect. We blend artistic creativity with data-backed content structures.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    title: "Web Development",
    features: ["Next.js & React Apps", "Performance Optimization", "Secure API Integration", "Conversion-Focused Design"],
    desc: "Your digital headquarters. We build lightning-fast, secure, and visually stunning websites that turn visitors into loyal customers.",
  },
];

function ServicesDetail() {
  return (
    <section className="services-detail">
      <div className="grid-overlay" />
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Capabilities
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText 
            text="Exploiting cutting-edge technologies to scale your digital presence." 
            className="section-sub"
            delay={0.6}
          />
        </div>
        <StaggerReveal stagger={0.1}>
          <div className="detail-grid">
            {SERVICES_DETAIL.map((s, i) => (
              <RevealItem key={i}>
                <motion.div 
                  className="detail-card"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(0,229,255,0.1)"
                  }}
                >
                  <div className="card-header">
                    <div className="icon-box">{s.icon}</div>
                    <h3 className="title">{s.title}</h3>
                  </div>
                  <div className="desc-wrap">
                     <AnimatedText text={s.desc} delay={0.4 + i * 0.1} />
                  </div>
                  <ul className="feature-list">
                    {s.features.map((f, j) => (
                      <li key={j} className="feature">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="card-bg-glow" />
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
      <style jsx>{`
        .services-detail { 
          padding: 100px 0; 
          background: #060a0f; 
          position: relative;
          overflow: hidden;
        }
        .grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,175,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,175,255,0.04) 1px, transparent 1px);
          background-size: 100px 100px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
        }
        .section-inner { max-width: 1280px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }

        .section-heading-wrap { text-align: center; margin-bottom: 72px; }
        .section-heading {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -1px;
          margin-bottom: 14px;
        }
        .cyan-underline {
          width: 56px; height: 3px;
          background: #00e5ff;
          border-radius: 2px;
          margin: 0 auto;
          box-shadow: 0 0 14px rgba(0,229,255,0.5);
        }
        .section-sub {
          color: rgba(255,255,255,0.42);
          font-size: 15px;
          margin-top: 14px;
          line-height: 1.6;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; }
        
        .detail-card {
          background: rgba(4, 8, 15, 0.6);
          border: 1px solid rgba(0, 229, 255, 0.1);
          border-radius: 28px;
          padding: 50px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .detail-card:hover {
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(0, 229, 255, 0.4);
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }
        .card-header { display: flex; align-items: center; gap: 20px; margin-bottom: 24px; }
        .icon-box { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: rgba(0, 229, 255, 0.05); border-radius: 12px; }
        .title { font-size: 24px; font-weight: 800; color: #fff; }
        .desc { font-size: 15px; color: rgba(255, 255, 255, 0.5); line-height: 1.8; margin-bottom: 30px; }
        
        .feature-list { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .feature { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #fff; font-weight: 500; }
        
        .card-bg-glow {
          position: absolute; bottom: -50px; right: -50px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        @media (max-width: 960px) {
          .detail-grid { grid-template-columns: 1fr; }
          .detail-card { padding: 40px 30px; }
          .feature-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TECH STACK
───────────────────────────────────────────── */
const TECH = ["OpenAI", "Meta Ads", "Google Analytics", "Next.js", "Python", "TensorFlow", "HubSpot", "Shopify"];

function TechStack() {
  return (
    <section className="tech-section">
      <div className="section-inner">
        <h2 className="title">Powered by Leading <span className="highlight">Technologies</span></h2>
        <StaggerReveal stagger={0.08}>
          <div className="tech-grid">
            {TECH.map((t, i) => (
              <RevealItem key={i}>
                <div className="tech-item">{t}</div>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
      <style jsx>{`
        .tech-section { padding: 100px 0; background: #07090e; text-align: center; border-top: 1px solid rgba(0, 229, 255, 0.05); }
        .section-inner { max-width: 1280px; margin: 0 auto; padding: 0 48px; }
        .title { font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 60px; }
        .highlight { color: #00e5ff; }
        .tech-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
        .tech-item {
          padding: 16px 36px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        .tech-item:hover { color: #00e5ff; border-color: #00e5ff; background: rgba(0, 229, 255, 0.05); transform: scale(1.05); }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <main className="services-main">
      <PageHeader 
        title="Our Capabilities" 
        subtitle="Harnessing the power of AI to drive exponential business growth. From organic visibility to automated sales engines, we build the systems that scale."
      />
      <ServicesDetail />
      <TechStack />
      <Footer />

      <style jsx global>{`
        body { background: #060a0f; margin: 0; }
        .services-main { background: #060a0f; }
        .simple-footer { background: #030609; padding: 40px 24px; text-align: center; color: rgba(255,255,255,0.2); font-size: 12px; border-top: 1px solid rgba(0,229,255,0.05); }
      `}</style>
    </main>
  );
}

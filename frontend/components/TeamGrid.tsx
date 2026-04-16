"use client";

import { motion } from "framer-motion";
import FuturisticPlaceholder from "./FuturisticPlaceholder";
import { Terminal, Users, Code } from "lucide-react";
import { useState } from "react";
import { StaggerReveal, RevealItem, AnimatedText } from "./AnimationSystem";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  clearance: string;
  icon: any;
  image: string;
  objectPosition?: string;
}

const team: TeamMember[] = [
  {
    name: "Mr. Dev Dibyansu",
    role: "Founder & CEO",
    description: "Dev Dibyansu is the visionary behind BOTMATE and the driving force of the company. He leads the overall strategy, business growth and long-term direction of the brand.",
    clearance: "LEVEL 5",
    icon: Terminal,
    image: "/team/dev.jpg",
    objectPosition: "object-top"
  },
  {
    name: "Mr. Advik Sharma",
    role: "Co-Founder & CMO",
    description: "Advik Sharma leads marketing strategy and brand growth. He specializes in social media growth, performance marketing and lead-generation systems.",
    clearance: "LEVEL 4",
    icon: Users,
    image: "/team/advik.jpg",
    objectPosition: "object-top"
  },
  {
    name: "Ms. Pallabi Kar",
    role: "Director & CTO",
    description: "Pallabi Kar heads technology and product development. She ensures every automation and digital solution is fast, scalable and future-ready.",
    clearance: "LEVEL 4",
    icon: Code,
    image: "/team/pallabi.jpg",
    objectPosition: "object-top"
  }
];

interface TeamGridProps {
  sectionTitle?: string;
  introText?: string;
}

export default function TeamGrid({
  sectionTitle = "Our Leadership",
  introText = "Behind BOTMATE is a passionate team of innovators and developers dedicated to helping brands grow in the digital world."
}: TeamGridProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section className="team-section">
      <div className="grid-overlay" />
      <div className="section-inner">
        
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {sectionTitle}
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText 
            text={introText} 
            className="section-sub"
            delay={0.6}
          />
        </div>

        <StaggerReveal stagger={0.15}>
          <div className="team-grid">
            {team.map((member, index) => (
              <RevealItem key={index}>
                <motion.div
                  className="member-card"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 25px 50px rgba(0,229,255,0.12)"
                  }}
                >
                  <div className="card-top">
                    <div className="avatar-wrap">
                      {failedImages[member.name] ? (
                        <div className="placeholder">{member.name[0]}</div>
                      ) : (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="avatar-img"
                          onError={() => setFailedImages(p => ({...p, [member.name]: true}))}
                        />
                      )}
                      <div className="clearance-badge">{member.clearance}</div>
                    </div>
                  </div>

                  <div className="card-content">
                    <h3 className="m-name">{member.name}</h3>
                    <p className="m-role">{member.role}</p>
                    <p className="m-bio">
                      <AnimatedText text={member.description} delay={0.6 + index * 0.1} />
                    </p>
                    <div className="card-footer">
                      <member.icon size={16} className="m-icon" />
                      <span className="m-status">SECURE PERSONNEL</span>
                    </div>
                  </div>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>

      <style jsx>{`
        .team-section { 
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

        .section-heading-wrap { text-align: center; margin-bottom: 64px; }
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

        .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        
        .member-card {
          background: rgba(4, 8, 15, 0.6);
          border: 1px solid rgba(0, 229, 255, 0.1);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex; flex-direction: column;
        }
        .member-card:hover {
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(0, 229, 255, 0.4);
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .card-top { position: relative; padding: 40px 0 0; display: flex; justify-content: center; }
        .avatar-wrap { 
          width: 140px; height: 140px; border-radius: 50%; padding: 4px;
          background: linear-gradient(135deg, rgba(0,229,255,0.4), transparent);
          position: relative;
        }
        .avatar-img { 
          width: 100%; height: 100%; border-radius: 50%; object-fit: cover; 
          border: 4px solid #060a0f;
        }
        .placeholder {
          width: 100%; height: 100%; border-radius: 50%; background: #0b1117;
          display: flex; align-items: center; justify-content: center;
          font-size: 32px; font-weight: 800; color: #00e5ff; border: 4px solid #060a0f;
        }
        .clearance-badge {
          position: absolute; bottom: 0; right: 0;
          background: #00e5ff; color: #060a0f;
          font-family: monospace; font-size: 10px; font-weight: 900;
          padding: 4px 10px; border-radius: 20px;
          box-shadow: 0 4px 10px rgba(0,229,255,0.4);
        }

        .card-content { padding: 32px; text-align: center; flex-grow: 1; }
        .m-name { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .m-role { 
          font-size: 12px; font-weight: 700; color: #00e5ff; 
          text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; 
        }
        .m-bio { font-size: 14px; color: rgba(255, 255, 255, 0.45); line-height: 1.7; margin-bottom: 24px; }
        
        .card-footer {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 20px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .m-icon { color: rgba(0, 229, 255, 0.6); }
        .m-status { font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.25); letter-spacing: 1px; }

        @media (max-width: 960px) {
          .team-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
          .section-inner { padding: 0 28px; }
        }
      `}</style>
    </section>
  );
}

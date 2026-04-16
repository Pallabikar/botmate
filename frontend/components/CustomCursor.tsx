"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position for the main dot
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the outer ring to create a "lagging" trailing effect
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 250 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 250 });

  useEffect(() => {
    setMounted(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted) return null;

  return (
    <div className="custom-cursor-container" style={{ opacity: isVisible ? 1 : 0 }}>
      {/* Outer Spring Ring */}
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 80 : 40,
          height: isHovered ? 80 : 40,
          borderColor: isHovered ? "rgba(0, 229, 255, 0.8)" : "rgba(0, 229, 255, 0.3)",
          borderWidth: isHovered ? 1 : 1,
        }}
      >
        <div className="scanning-line" />
      </motion.div>

      {/* Main Center Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? "#fff" : "#00e5ff",
        }}
      />

      <style jsx>{`
        .custom-cursor-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          transition: opacity 0.3s ease;
        }
        .cursor-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #00e5ff;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.8);
          z-index: 2;
        }
        .cursor-ring {
          position: absolute;
          border: 1px solid rgba(0, 229, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 1;
        }
        .scanning-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.4), transparent);
          animation: scan 2s linear infinite;
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200px); }
        }

        @media (max-width: 1024px) {
          .custom-cursor-container { display: none; }
        }
      `}</style>
    </div>
  );
}

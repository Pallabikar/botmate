"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { Bug, Shield, RefreshCw, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface BugEntity {
  id: number;
  x: number;
  y: number;
  speed: number;   // spawn interval contribution
  type: "normal" | "fast" | "armored";
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function randomBugType(): BugEntity["type"] {
  const r = Math.random();
  if (r < 0.6) return "normal";
  if (r < 0.85) return "fast";
  return "armored";
}

const BUG_CONFIG = {
  normal:  { color: "text-red-500",    glow: "rgba(255,0,0,0.8)",     label: "THREAT",   points: 100 },
  fast:    { color: "text-orange-400", glow: "rgba(255,140,0,0.9)",   label: "FAST",     points: 200 },
  armored: { color: "text-purple-400", glow: "rgba(168,85,247,0.9)",  label: "ARMORED",  points: 350 },
};

// ── Animated Shield Icon ───────────────────────────────────────────────────
function AnimatedShield({ danger }: { danger: number }) {
  return (
    <motion.div
      animate={
        danger >= 4
          ? { scale: [1, 1.15, 1], rotate: [-4, 4, -4, 0] }
          : danger >= 2
          ? { scale: [1, 1.05, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 0.5, repeat: danger >= 2 ? Infinity : 0, repeatDelay: 0.8 }}
    >
      <Shield
        className={`w-10 h-10 transition-colors duration-500 ${
          danger >= 4 ? "text-red-500" : danger >= 2 ? "text-yellow-400" : "text-[#00AFFF]"
        }`}
        style={{
          filter: `drop-shadow(0 0 ${danger * 3}px ${
            danger >= 4 ? "rgba(255,0,0,0.7)" : "rgba(0,175,255,0.5)"
          })`,
        }}
      />
    </motion.div>
  );
}

// ── Kill Flash Particle ───────────────────────────────────────────────────
function KillSplash({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-30"
      style={{ left: `${x}%`, top: `${y}%` }}
      onAnimationComplete={onDone}
    >
      <motion.div 
        className="absolute inset-0 w-12 h-12 -ml-6 -mt-6 border border-[#00AFFF] rounded-full"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
      {[...Array(6)].map((_, i) => (
        <motion.div
           key={i}
           className="absolute w-1 h-1 bg-[#00e5ff]"
           initial={{ x: 0, y: 0, opacity: 1 }}
           animate={{ 
             x: Math.cos(i * 60 * Math.PI / 180) * 40,
             y: Math.sin(i * 60 * Math.PI / 180) * 40,
             opacity: 0,
             scale: 0
           }}
           transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
}

// ── Score Pop ─────────────────────────────────────────────────────────────
function ScorePop({ x, y, pts, onDone }: { x: number; y: number; pts: number; onDone: () => void }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-30 font-mono font-bold text-sm text-[#00AFFF]"
      style={{ left: `${x}%`, top: `${y}%`, textShadow: "0 0 8px #00AFFF" }}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onAnimationComplete={onDone}
    >
      +{pts}
    </motion.div>
  );
}

// ── Individual Bug ─────────────────────────────────────────────────────────
function BugButton({ bug, onKill }: { bug: BugEntity; onKill: (bug: BugEntity) => void }) {
  const cfg = BUG_CONFIG[bug.type];
  const ctrl = useAnimationControls();
  const [pressed, setPressed] = useState(false);

  // Idle wiggle
  useEffect(() => {
    ctrl.start({
      rotate: [0, -10, 10, -6, 6, 0],
      y: [0, -3, 0, -2, 0],
      transition: {
        duration: bug.type === "fast" ? 0.6 : 1.2,
        repeat: Infinity,
        repeatDelay: Math.random() * 1.5 + 0.5,
        ease: "easeInOut",
      },
    });
  }, [ctrl, bug.type]);

  return (
    <motion.button
      key={bug.id}
      initial={{ scale: 0, rotate: -30, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0, rotate: 30, opacity: 0, transition: { duration: 0.2 } }}
      className="absolute z-10 p-2 group cursor-pointer"
      style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
      onClick={(e) => {
        e.stopPropagation();
        if (!pressed) {
          setPressed(true);
          onKill(bug);
        }
      }}
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.75, rotate: 15 }}
    >
      <motion.div animate={ctrl}>
        {/* Radar Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-red-500/20"
          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <Bug
          className={`w-6 h-6 ${cfg.color} transition-transform`}
          style={{ filter: `drop-shadow(0 0 8px ${cfg.glow})` }}
        />
      </motion.div>
      {/* Target Crosshair */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 border border-[#00e5ff]/50 rounded-sm scale-110" />
      </div>
      {/* Threat label tooltip */}
      <motion.span
        className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#00e5ff] bg-black/80 px-1.5 py-0.5 rounded border border-[#00e5ff]/20 pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ID_{bug.id.toString().slice(-4)}: {cfg.label}
      </motion.span>
    </motion.button>
  );
}

// ── Main Game ──────────────────────────────────────────────────────────────
export default function BotDefenseGame() {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bugs, setBugs] = useState<BugEntity[]>([]);
  const [splashes, setSplashes] = useState<Particle[]>([]);
  const [scorePops, setScorePops] = useState<{ id: number; x: number; y: number; pts: number }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [active, setActive] = useState(false);
  const [shieldHit, setShieldHit] = useState(false);
  const comboTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const zapCtrl = useAnimationControls();

  const danger = bugs.length;

  // Spawn loop
  useEffect(() => {
    if (!active || gameOver) return;
    const interval = setInterval(() => {
      setBugs((prev) => {
        if (prev.length >= 5) {
          setGameOver(true);
          return prev;
        }
        return [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 76 + 8,
            y: Math.random() * 60 + 20,
            speed: 1,
            type: randomBugType(),
          },
        ];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [active, gameOver]);

  // Shield breach animation
  useEffect(() => {
    if (bugs.length >= 5) {
      setShieldHit(true);
      setTimeout(() => setShieldHit(false), 600);
    }
  }, [bugs.length]);

  const killBug = (bug: BugEntity) => {
    const pts = BUG_CONFIG[bug.type].points;
    const newCombo = combo + 1;
    const comboBonus = newCombo >= 3 ? Math.floor(pts * 0.5) : 0;
    const total = pts + comboBonus;

    setBugs((prev) => prev.filter((b) => b.id !== bug.id));
    setScore((prev) => prev + total);
    setCombo(newCombo);

    // Score pop
    const popId = Date.now() + Math.random();
    setScorePops((prev) => [...prev, { id: popId, x: bug.x, y: bug.y, pts: total }]);

    // Splash
    const splashId = Date.now() + Math.random() + 1;
    setSplashes((prev) => [...prev, { id: splashId, x: bug.x, y: bug.y }]);

    // Zap icon flash
    zapCtrl.start({
      scale: [1, 1.8, 1],
      opacity: [0.4, 1, 0.4],
      transition: { duration: 0.3 },
    });

    // Reset combo timer
    if (comboTimer.current) clearTimeout(comboTimer.current);
    comboTimer.current = setTimeout(() => setCombo(0), 2000);
  };

  const restart = () => {
    setScore(0);
    setCombo(0);
    setBugs([]);
    setSplashes([]);
    setScorePops([]);
    setGameOver(false);
    setActive(true);
  };

  // ── Idle screen ──────────────────────────────────────────────────────────
  if (!active) {
    return (
      <motion.div
        className="w-full h-48 rounded-xl border border-[#00AFFF]/20 bg-[#0B0F14]/50 flex flex-col items-center justify-center p-4 text-center cursor-pointer group"
        onClick={restart}
        whileHover={{ borderColor: "rgba(0,175,255,0.7)", scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-10 h-10 text-[#00AFFF] mb-3" style={{ filter: "drop-shadow(0 0 8px rgba(0,175,255,0.6))" }} />
        </motion.div>
        <h3 className="text-white font-bold tracking-widest text-sm">SYSTEM SECURE</h3>
        <motion.p
          className="text-xs text-gray-500 mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Click to Launch Defense Simulation
        </motion.p>
      </motion.div>
    );
  }

  // ── Active game ──────────────────────────────────────────────────────────
  return (
    <div
      className="w-full h-48 rounded-xl border bg-[#001a2f] relative overflow-hidden select-none transition-colors duration-300"
      style={{
        borderColor: danger >= 4 ? "rgba(255,60,60,0.7)" : "rgba(0,175,255,0.7)",
        boxShadow: danger >= 4
          ? "0 0 20px rgba(255,0,0,0.2)"
          : "0 0 12px rgba(0,175,255,0.15)",
      }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(${danger >= 3 ? "#ff4444" : "#00AFFF"} 1px, transparent 1px), linear-gradient(90deg, ${danger >= 3 ? "#ff4444" : "#00AFFF"} 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          opacity: danger >= 3 ? 0.2 : 0.12,
        }}
      />

      {/* HUD bar */}
      <div className="absolute top-0 left-0 right-0 px-3 py-1.5 flex justify-between items-center bg-black/30 backdrop-blur-sm z-10">
        {/* Left: shield + threats */}
        <div className="flex items-center gap-2">
          <AnimatedShield danger={danger} />
          <div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-sm"
                  animate={{
                    backgroundColor: i < danger
                      ? (danger >= 4 ? "#ef4444" : "#f97316")
                      : "#1e3a4f",
                    scale: i < danger ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <span className="text-[9px] font-mono text-gray-400">THREATS</span>
          </div>
        </div>

        {/* Center: combo */}
        <AnimatePresence>
          {combo >= 2 && (
            <motion.div
              key="combo"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="flex items-center gap-1"
            >
              <motion.div animate={zapCtrl}>
                <Zap className="w-3 h-3 text-yellow-400" style={{ filter: "drop-shadow(0 0 4px gold)" }} />
              </motion.div>
              <motion.span
                className="text-xs font-mono font-bold text-yellow-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
                key={combo}
              >
                x{combo} COMBO
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right: score */}
        <motion.span
          className="text-xs font-mono text-white"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.2 }}
          key={score}
        >
          {score.toLocaleString()}
        </motion.span>
      </div>

      {/* Screen flash on shield hit */}
      <AnimatePresence>
        {shieldHit && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none bg-red-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Game Over */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            className="absolute inset-0 z-20 bg-black/85 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <AlertTriangle className="w-8 h-8 text-red-500 mb-2 mx-auto" style={{ filter: "drop-shadow(0 0 10px red)" }} />
            </motion.div>
            <motion.h3
              className="text-red-500 font-bold text-lg tracking-widest"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              SYSTEM BREACHED
            </motion.h3>
            <p className="text-white text-sm mt-1 mb-3 font-mono">
              Score: <span className="text-[#00AFFF] font-bold">{score.toLocaleString()}</span>
            </p>
            <motion.button
              onClick={restart}
              className="flex items-center gap-2 px-4 py-2 bg-[#00AFFF] text-black rounded font-bold text-sm"
              whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: gameOver ? 360 : 0 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw size={14} />
              </motion.div>
              Reboot
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kill splashes */}
      <AnimatePresence>
        {splashes.map((s) => (
          <KillSplash
            key={s.id}
            x={s.x}
            y={s.y}
            onDone={() => setSplashes((prev) => prev.filter((p) => p.id !== s.id))}
          />
        ))}
      </AnimatePresence>

      {/* Score pops */}
      <AnimatePresence>
        {scorePops.map((p) => (
          <ScorePop
            key={p.id}
            x={p.x}
            y={p.y}
            pts={p.pts}
            onDone={() => setScorePops((prev) => prev.filter((sp) => sp.id !== p.id))}
          />
        ))}
      </AnimatePresence>

      {/* Bugs */}
      <AnimatePresence>
        {bugs.map((bug) => (
          <BugButton key={bug.id} bug={bug} onKill={killBug} />
        ))}
      </AnimatePresence>
    </div>
  );
}
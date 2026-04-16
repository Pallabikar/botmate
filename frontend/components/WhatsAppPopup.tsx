"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Initial opening after 3 seconds
        const timer = setTimeout(() => {
            if (!hasInteracted) {
                setIsOpen(true);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [hasInteracted]);

    useEffect(() => {
        if (isOpen && !hasInteracted && window.innerWidth < 768) {
            const hideTimer = setTimeout(() => {
                setIsOpen(false);
            }, 8000);
            return () => clearTimeout(hideTimer);
        }
    }, [isOpen, hasInteracted]);

    // Handle re-opening logic if user hasn't fully dismissed it (optional aggressive mode)
    // For now, we'll stick to the initial 3s trigger to be less annoying but compliant.

    const handleOpen = () => {
        setIsOpen(true);
        setHasInteracted(true);
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(false);
        setHasInteracted(true);
    };

    const whatsappNumber = "919777209527";
    const message = "Hello! I'm interested in BotMate services.";
    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 sm:gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 30, scale: 0.8, filter: "blur(10px)" }}
                        className="glass-popup bg-[#060a0f]/80 backdrop-blur-xl border border-[#00e5ff]/20 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-[280px] relative overflow-hidden"
                    >
                        {/* Scanning Bar Effect */}
                        <motion.div 
                          className="absolute top-0 left-0 right-0 h-[1px] bg-[#00e5ff] opacity-40"
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 p-1.5 text-white/30 hover:text-[#00e5ff] transition-colors z-10"
                        >
                            <X size={14} />
                        </button>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                                    <MessageCircle size={22} />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-sm text-white letter-spacing-1">NEURAL_LINK</h4>
                                    <div className="flex items-center gap-1.5">
                                      <div className="w-1 h-1 rounded-full bg-[#25D366] animate-pulse" />
                                      <span className="text-[9px] font-mono text-[#25D366]/80">OPERATIVE_READY</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[#fff]/50 text-xs leading-relaxed font-medium">
                                Transmission sequence ready. Connect with our core mission control for immediate strategy analysis.
                            </p>
                            <a 
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#00e5ff] text-[#060a0f] text-[11px] font-extrabold py-2.5 rounded-lg text-center tracking-wider hover:bg-white transition-colors"
                            >
                              INITIATE_CHAT
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setHasInteracted(true)}
                className="relative group"
            >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all"
                >
                    <MessageCircle size={24} className="sm:hidden" />
                    <MessageCircle size={28} className="hidden sm:block" />
                </motion.div>

                {/* Pulse Effect */}
                <span className="absolute -inset-2 rounded-full border border-[#25D366] opacity-0 group-hover:opacity-100 animate-ping pointer-events-none" />
            </a>
        </div>
    );
}

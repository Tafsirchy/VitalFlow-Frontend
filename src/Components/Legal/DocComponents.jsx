import React from "react";
import { motion as Motion } from "framer-motion";

export const NeuralGrid = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-red)_0%,transparent_70%)] opacity-[0.03]" />
    <div 
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage: `linear-gradient(var(--primary-red) 1px, transparent 1px), linear-gradient(90deg, var(--primary-red) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    />
  </div>
);

export const ScanlineOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    
  </div>
);

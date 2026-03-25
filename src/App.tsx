/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Zap, Activity, Terminal, AlertTriangle } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-glitch-black flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 font-pixel">
      {/* Glitch Overlays */}
      <div className="static-overlay" />
      <div className="screen-tear" style={{ animationDelay: '1.5s' }} />
      <div className="screen-tear" style={{ animationDelay: '4s', opacity: 0.1 }} />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-full h-[1px] bg-glitch-cyan/20 animate-pulse" />
        <div className="absolute bottom-1/3 right-0 w-full h-[1px] bg-glitch-magenta/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-end mb-12 z-10"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-glitch-magenta animate-bounce" />
            <span className="text-[8px] uppercase tracking-tighter text-glitch-magenta">UNAUTHORIZED_ACCESS_DETECTED</span>
          </div>
          <h1 className="glitch-text-large text-glitch-cyan" data-text="VOID_RUNNER_v0.1">
            VOID_RUNNER_v0.1
          </h1>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-6 text-[8px] uppercase tracking-tighter text-glitch-cyan/40">
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-glitch-cyan" />
            <span>SYNC_RATE: 99.9%</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-glitch-magenta" />
            <span>KERNEL: 0xDEADBEEF</span>
          </div>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start z-10">
        
        {/* Left Sidebar - Cryptic Info */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 space-y-8 hidden lg:block"
        >
          <div className="p-6 bg-black border-2 border-glitch-cyan shadow-[4px_4px_0px_#ff00ff]">
            <h4 className="text-[10px] text-glitch-cyan uppercase mb-6 border-b border-glitch-cyan/30 pb-2">VECTORS</h4>
            <ul className="space-y-4 text-[8px] tracking-tighter">
              <li className="flex justify-between items-center">
                <span className="text-glitch-cyan/60">NAVIGATE</span>
                <span className="text-glitch-magenta">ARROWS</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-glitch-cyan/60">INTERRUPT</span>
                <span className="text-glitch-magenta">SPACE</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-glitch-cyan/60">REBOOT</span>
                <span className="text-glitch-magenta">R_KEY</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-black border-2 border-glitch-magenta shadow-[4px_4px_0px_#00ffff]">
            <h4 className="text-[10px] text-glitch-magenta uppercase mb-6 border-b border-glitch-magenta/30 pb-2">LOG_HISTORY</h4>
            <div className="space-y-4">
              {[
                { name: 'USER_001', val: '002450' },
                { name: 'USER_002', val: '001820' },
                { name: 'USER_003', val: '001540' },
              ].map((entry, i) => (
                <div key={i} className="flex justify-between items-center font-mono-retro text-lg">
                  <span className="text-white/40">{entry.name}</span>
                  <span className="text-glitch-cyan">{entry.val}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center - Game */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-6 flex justify-center"
        >
          <SnakeGame />
        </motion.div>

        {/* Right Sidebar - Music Player */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 w-full space-y-8"
        >
          <MusicPlayer />
          
          <div className="p-6 bg-black border-2 border-glitch-cyan/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,255,255,0.05)_1px,rgba(0,255,255,0.05)_2px)] pointer-events-none" />
            <p className="text-[8px] leading-relaxed text-glitch-cyan/60 tracking-tighter italic">
              "THE_GRID_IS_ABSOLUTE. RESISTANCE_IS_CALCULATED. CONSUME_DATA_OR_BE_CONSUMED."
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-[8px] tracking-[0.8em] text-glitch-magenta/40 z-10 animate-pulse">
        [SYSTEM_END_TRANSMISSION]
      </footer>
    </div>
  );
}

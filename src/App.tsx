/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Metrics } from './components/Metrics';
import { AgentArch } from './components/AgentArch';
import { ExecutionLog } from './components/ExecutionLog';
import { Education } from './components/Education';
import { TechStack } from './components/TechStack';
import { Footer } from './components/Footer';
import { ExperienceSidebar } from './components/ExperienceSidebar';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { Background3D } from './components/Background3D';

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLightMode]);

  return (
    <div className="min-h-screen bg-obsidian-bg text-obsidian-text transition-colors duration-300 relative">
      <Background3D isLightMode={isLightMode} />
      <div className="relative z-10 flex flex-col min-h-screen">
        <SmoothScroll />
        <CustomCursor />
        
        <motion.div
          className="fixed left-0 right-0 h-1.5 md:h-1 z-[9999] origin-left pointer-events-none"
          style={{ 
            scaleX,
            backgroundColor: isLightMode ? '#000000' : '#ffffff',
            bottom: 'env(safe-area-inset-bottom, 0px)'
          }}
        />

        <Navbar 
          onOpenExperience={() => setSidebarOpen(true)} 
          isLightMode={isLightMode}
          toggleTheme={() => setIsLightMode(!isLightMode)}
        />
        <Hero />
        <Metrics />
        <AgentArch />
        <ExecutionLog onOpenExperience={() => setSidebarOpen(true)} />
        <Education />
        <TechStack />
        <Footer />
        
        <ExperienceSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      </div>
    </div>
  );
}


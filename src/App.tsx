/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

const THEME_STORAGE_KEY = 'dhyan-portfolio-theme';

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) !== 'dark';
  });

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }

    localStorage.setItem(THEME_STORAGE_KEY, isLightMode ? 'light' : 'dark');
  }, [isLightMode]);

  return (
    <div className="min-h-screen bg-obsidian-bg text-obsidian-text transition-colors duration-300 relative">
      <Background3D isLightMode={isLightMode} />
      <div className="relative z-10 flex flex-col min-h-screen">
        <SmoothScroll />
        <CustomCursor />
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

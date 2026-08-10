import React, { useRef } from 'react';
import { Terminal, Sun, Moon, Briefcase, Download } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RESUME_URL } from '../constants';

interface NavbarProps {
  onOpenExperience: () => void;
  isLightMode: boolean;
  toggleTheme: () => void;
}

export function Navbar({ onOpenExperience, isLightMode, toggleTheme }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const links = gsap.utils.toArray('.nav-btn');
    links.forEach((link: any) => {
      link.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(link, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      });
    });
  }, { scope: navRef });

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-40 bg-obsidian-bg/80 backdrop-blur-md border-b border-obsidian-border">
      <div className="max-w-7xl mx-auto px-[20px] md:px-[64px] h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-2 nav-btn">
          <Terminal className="w-5 h-5 text-obsidian-text" />
          <span className="font-display font-bold text-lg tracking-tight uppercase">Dhyan Jariwala</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="nav-btn p-2 border border-obsidian-border hover:bg-obsidian-surface-hover transition-colors duration-300 cursor-pointer text-obsidian-muted hover:text-obsidian-text"
            aria-label="Toggle Theme"
          >
            {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={onOpenExperience}
            className="nav-btn hidden md:flex items-center gap-2 p-2 border border-obsidian-border hover:bg-obsidian-surface-hover transition-colors duration-300 cursor-pointer text-obsidian-muted hover:text-obsidian-text font-mono text-[10px] uppercase tracking-widest"
          >
            <Briefcase className="w-4 h-4" />
            <span>Experience</span>
          </button>

          <a 
            href={RESUME_URL}
            download 
            className="nav-btn hidden md:flex items-center gap-2 p-2 border border-obsidian-border hover:bg-obsidian-surface-hover transition-colors duration-300 cursor-pointer text-obsidian-muted hover:text-obsidian-text font-mono text-[10px] uppercase tracking-widest"
          >
            <Download className="w-4 h-4" />
            <span>Resume</span>
          </a>

          <a href="mailto:dhyanjar98@gmail.com" className="nav-btn border border-obsidian-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-obsidian-surface-hover transition-colors duration-300 cursor-pointer flex items-center">
            Connect
          </a>
        </div>
      </div>
    </nav>
  );
}

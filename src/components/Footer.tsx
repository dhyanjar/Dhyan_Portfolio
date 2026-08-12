import React, { useRef } from 'react';
import { Mail, Link } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.section-title .char', 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    const footerWords = gsap.utils.toArray('.footer-word .word');
    gsap.fromTo(footerWords,
      { opacity: 0.1, y: 5 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.footer-word-container',
          start: 'top 95%',
          end: 'bottom 80%',
          scrub: true
        }
      }
    );
  }, { scope: container });

  return (
    <footer ref={container} className="bg-obsidian-bg">
      <div className="py-[100px] md:py-[160px] flex flex-col items-center justify-center border-b border-obsidian-border footer-word-container">
        <h2 className="font-display text-[16px] md:text-[20px] font-semibold uppercase tracking-widest mb-10 text-center leading-[1.4]">
          <SplitText text="INITIATE" className="section-title" /><br/>
          <SplitText text="SEQUENCE" className="section-title" />
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="mailto:dhyanjar98@gmail.com" className="footer-elem flex items-center justify-center gap-3 bg-obsidian-text text-obsidian-bg px-6 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-obsidian-accent transition-colors group">
            <Mail className="w-4 h-4" />
            <span className="footer-word"><SplitText text="Email Output" type="word" /></span>
          </a>
          <a href="https://www.linkedin.com/in/dhyan-jariwala-05a004139" target="_blank" rel="noopener noreferrer" className="footer-elem flex items-center justify-center gap-3 border border-obsidian-border bg-obsidian-surface px-6 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-obsidian-surface-hover transition-colors group">
            <Link className="w-4 h-4 text-obsidian-muted group-hover:text-obsidian-accent transition-colors" />
            <span className="text-obsidian-muted group-hover:text-obsidian-accent transition-colors footer-word"><SplitText text="LinkedIn Node" type="word" /></span>
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-[20px] md:px-[64px] py-8 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-obsidian-muted uppercase tracking-widest gap-4 footer-word-container">
        <div className="footer-word"><SplitText text="© Dhyan Jariwala — Engineered for precision" type="word" /></div>
        <div className="flex gap-4">
          <a href="https://github.com/dhyanjar98" target="_blank" rel="noopener noreferrer" className="footer-elem hover:text-obsidian-accent transition-colors footer-word"><SplitText text="GitHub" type="word" /></a>
          <a href="https://twitter.com/dhyanjar98" target="_blank" rel="noopener noreferrer" className="footer-elem hover:text-obsidian-accent transition-colors footer-word"><SplitText text="Twitter" type="word" /></a>
        </div>
      </div>
    </footer>
  );
}

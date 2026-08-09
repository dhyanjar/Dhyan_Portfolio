import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from './SplitText';
import { Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, ease: 'power4.out', delay: 0.2 })
      .fromTo('.hero-title-line1 .char', 
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.05, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo('.hero-title-line2 .char', 
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.05, ease: 'back.out(1.7)' },
        '-=0.8'
      );

    const descWords = gsap.utils.toArray('.hero-desc .word');
    gsap.fromTo(descWords,
      { opacity: 0.1, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-desc',
          start: 'top 95%',
          end: 'bottom 60%',
          scrub: true
        }
      }
    );
      
    gsap.to('.hero-bg', {
      y: 200,
      rotation: 2,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.hero-content', {
      y: 100,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative pt-[180px] pb-[80px] md:pt-[240px] md:pb-[120px] border-b border-obsidian-border overflow-hidden">
      <div className="hero-bg absolute -inset-[150px] bg-grid-pattern opacity-50 pointer-events-none transform origin-center" />
      <div className="hero-content max-w-7xl mx-auto px-[20px] md:px-[64px] relative z-10">
        
        <div className="hero-badge inline-flex items-center gap-2 border border-obsidian-border bg-obsidian-surface px-3 py-1.5 mb-8">
          <div className="w-1.5 h-1.5 bg-obsidian-accent animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-obsidian-accent">Portfolio</span>
        </div>

        <h1 className="font-display text-[56px] md:text-[96px] font-bold leading-[1.0] tracking-[-0.04em] uppercase max-w-3xl mb-8 flex flex-col gap-2" style={{ perspective: '1000px' }}>
          <span className="hero-title-line1 block overflow-hidden pb-2">
            <SplitText text="DHYAN" className="" />
          </span>
          <span className="hero-title-line2 block overflow-hidden pb-2 text-obsidian-muted">
            <SplitText text="JARIWALA" className="" />
          </span>
        </h1>

        <p className="hero-desc font-body text-[16px] md:text-[20px] text-obsidian-muted max-w-xl leading-[1.6]">
          <SplitText text="Senior Software Engineer & AI Systems Architect. Architecting resilient backend systems and deploying scalable NLP agents." type="word" />
        </p>

        <div className="hero-desc mt-10">
          <a href="/Dhyan_Jariwala_Resume.pdf" download className="inline-flex items-center justify-center gap-3 bg-obsidian-text text-obsidian-bg px-6 py-4 font-mono text-[10px] md:text-[12px] uppercase tracking-widest hover:bg-obsidian-accent transition-colors group">
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </a>
        </div>

      </div>
    </section>
  );
}

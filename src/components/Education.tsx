import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

export function Education() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.education-title .char', 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    const items = gsap.utils.toArray('.edu-item');
    items.forEach((item: any) => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, { x: 10, duration: 0.3, ease: 'power2.out' });
        const dot = item.querySelector('.timeline-dot');
        if (dot) gsap.to(dot, { scale: 1.5, backgroundColor: 'var(--theme-accent)', duration: 0.3 });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(item, { x: 0, duration: 0.3, ease: 'power2.out' });
        const dot = item.querySelector('.timeline-dot');
        if (dot) gsap.to(dot, { scale: 1, backgroundColor: 'var(--theme-bg)', duration: 0.3 });
      });

      const words = item.querySelectorAll('.word');
      gsap.fromTo(words, 
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.02,
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            end: 'bottom 80%',
            scrub: true
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-[80px] md:py-[120px] border-b border-obsidian-border bg-obsidian-bg">
      <div className="max-w-7xl mx-auto px-[20px] md:px-[64px]">
        <h2 className="font-display text-[24px] md:text-[32px] font-semibold uppercase tracking-tight mb-12 md:mb-16">
          <SplitText text="Education" className="education-title" />
        </h2>
        
        <div className="relative border-l border-obsidian-border ml-1.5 md:ml-2 pl-8 md:pl-12 flex flex-col gap-12 md:gap-16 max-w-3xl">
          <div className="edu-item relative cursor-none">
            {/* Dot */}
            <div className="timeline-dot absolute -left-[37px] md:-left-[53px] top-1.5 w-[11px] h-[11px] border border-obsidian-accent bg-obsidian-bg rounded-full transform origin-center" />
            
            <div className="font-mono text-[10px] uppercase tracking-widest text-obsidian-muted mb-3">
              <SplitText text="May 2016 – May 2020" type="word" />
            </div>
            <h3 className="font-display text-[20px] md:text-[24px] font-semibold mb-1">
              <SplitText text="Institute of Technology, Nirma University, India" type="word" />
            </h3>
            <div className="font-mono text-[12px] text-obsidian-accent mb-4 uppercase tracking-widest">
              <SplitText text="Bachelors in Information Technology" type="word" />
            </div>
            <p className="font-body text-[14px] md:text-[16px] text-obsidian-muted leading-[1.6]">
              <SplitText text="Project - Produced a Gujarati Text Dictionary by extracting content from 'Shabdakosh' and Gujarati newspaper (Divya Bhaskar), utilizing LSTM and RNN algorithms to establish a Gujarati wordnet with 10,000+ words." type="word" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

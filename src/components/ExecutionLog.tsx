import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const logs = [
  {
    period: 'Oct 2025 - Aug 2026',
    company: 'Walmart',
    desc: 'Architecting highly available microservices and optimizing Kubernetes deployments. Improved deployment speeds by 50% across edge nodes.',
  },
  {
    period: 'Mar 2024 - Oct 2025',
    company: 'British Petroleum',
    desc: 'Lead backend engineer for logistics data pipelines. Reduced processing latency and saved estimated 3 months of manual operational overhead.',
  },
  {
    period: 'Sep 2021 - Mar 2024',
    company: 'Amazon',
    desc: 'Resolved 230+ critical operational issues. Scaled internal fulfillment APIs to handle 10x peak traffic during Q4 events.',
  }
];

export function ExecutionLog({ onOpenExperience }: { onOpenExperience: () => void }) {
  const container = useRef<HTMLDivElement>(null);

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
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    const items = gsap.utils.toArray('.log-item');
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 md:mb-16 gap-4">
          <h2 className="font-display text-[24px] md:text-[32px] font-semibold uppercase tracking-tight">
            <SplitText text="Experience" className="section-title" />
          </h2>
          <button 
            onClick={onOpenExperience}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-obsidian-muted hover:text-obsidian-accent transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>View Full Details</span>
          </button>
        </div>
        
        <div className="relative border-l border-obsidian-border ml-1.5 md:ml-2 pl-8 md:pl-12 flex flex-col gap-12 md:gap-16 max-w-3xl">
          {logs.map((log, i) => (
            <div key={i} className="log-item relative cursor-none">
              {/* Dot */}
              <div className="timeline-dot absolute -left-[37px] md:-left-[53px] top-1.5 w-[11px] h-[11px] border border-obsidian-accent bg-obsidian-bg rounded-full transform origin-center" />
              
              <div className="font-mono text-[10px] uppercase tracking-widest text-obsidian-muted mb-3">
                <SplitText text={log.period} type="word" />
              </div>
              <h3 className="font-display text-[20px] md:text-[24px] font-semibold mb-3">
                <SplitText text={log.company} type="word" />
              </h3>
              <p className="font-body text-[14px] md:text-[16px] text-obsidian-muted leading-[1.6]">
                <SplitText text={log.desc} type="word" />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: 'Optimization', value: '50%', desc: 'Faster K8s Deploy' },
  { label: 'Efficiency', value: '3 Mo', desc: 'Dev Time Saved' },
  { label: 'Resolution', value: '230+', desc: 'Ops Issues Fixed' },
  { label: 'Data Scale', value: '10k+', desc: 'NLP Datasets' },
];

export function Metrics() {
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

    const cards = gsap.utils.toArray('.metric-card');
    cards.forEach((card: any) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -8, backgroundColor: 'var(--theme-surface-hover)', duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, backgroundColor: 'var(--theme-surface)', duration: 0.3, ease: 'power2.out' });
      });

      const words = card.querySelectorAll('.word, .metric-val');
      gsap.fromTo(words, 
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          scrollTrigger: {
            trigger: card,
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
        <h2 className="font-display text-[24px] md:text-[32px] font-semibold uppercase tracking-tight mb-8 md:mb-12">
          <SplitText text="Performance_Metrics" className="section-title" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-obsidian-border border border-obsidian-border overflow-hidden">
          {metrics.map((metric, i) => (
            <div key={i} className="metric-card bg-obsidian-surface p-6 flex flex-col justify-between min-h-[160px] md:min-h-[200px] transition-colors duration-300 group cursor-none">
              <span className="font-mono text-[10px] uppercase tracking-widest text-obsidian-muted group-hover:text-obsidian-accent transition-colors">
                <SplitText text={metric.label} type="word" />
              </span>
              <div>
                <div className="metric-val font-display text-[40px] md:text-[48px] font-bold leading-none mb-2">
                  {metric.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-obsidian-muted">
                  <SplitText text={metric.desc} type="word" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

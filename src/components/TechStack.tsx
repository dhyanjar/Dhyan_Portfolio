import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: 'Core',
    skills: ['Java', 'AWS', 'Kubernetes', 'Distributed Systems', 'System Design']
  },
  {
    category: 'Backend & Cloud',
    skills: ['Node.js', 'GraphQL', 'REST APIs', 'AWS ECS', 'Fargate', 'Route53', 'CloudFront']
  },
  {
    category: 'AI & Data',
    skills: ['Palantir Foundry', 'Functions', 'Ontology', 'OpenCV', 'PyTesseract', 'FastMCP', 'Python', 'RAG', 'LLM APIs', 'Langchain', 'LangGraph']
  },
  {
    category: 'Observability & Tools',
    skills: ['OpenObserve', 'Kibana', 'Elasticsearch', 'CI/CD', 'Docker']
  },
  {
    category: 'Familiar',
    skills: ['React', 'TypeScript']
  }
];

export function TechStack() {
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

    const groups = gsap.utils.toArray('.skill-group');
    groups.forEach((group: any) => {
      const pills = group.querySelectorAll('.stack-pill');
      gsap.fromTo(pills,
        { scale: 0.9, opacity: 0, y: 10 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: group,
            start: 'top 90%',
          }
        }
      );
    });

    const pills = gsap.utils.toArray('.stack-pill');
    pills.forEach((pill: any) => {
      pill.addEventListener('mouseenter', () => {
        gsap.to(pill, { scale: 1.05, y: -2, backgroundColor: 'var(--theme-surface-hover)', borderColor: 'var(--theme-text)', duration: 0.3, ease: 'back.out(2)' });
      });
      pill.addEventListener('mouseleave', () => {
        gsap.to(pill, { scale: 1, y: 0, backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)', duration: 0.3, ease: 'power2.out' });
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-[80px] md:py-[120px] border-b border-obsidian-border relative">
      <div className="max-w-7xl mx-auto px-[20px] md:px-[64px] relative z-10">
        <h2 className="font-display text-[24px] md:text-[32px] font-semibold uppercase tracking-tight mb-12 md:mb-16">
          <SplitText text="Skills_&_Technologies" className="section-title" />
        </h2>
        
        <div className="flex flex-col gap-8 md:gap-10 max-w-5xl">
          {skillGroups.map((group, idx) => (
            <div key={idx} className="skill-group flex flex-col md:flex-row gap-4 md:gap-8 md:items-start border-t border-obsidian-border pt-6 md:pt-8 first:border-t-0 first:pt-0">
              <div className="font-mono text-[12px] uppercase tracking-widest text-obsidian-muted w-48 shrink-0 pt-2">
                {group.category}
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {group.skills.map((item, i) => (
                  <div 
                    key={i} 
                    className="stack-pill border border-obsidian-border bg-obsidian-surface px-4 py-2 font-mono text-[10px] md:text-[12px] uppercase tracking-widest text-obsidian-accent cursor-default transition-colors"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

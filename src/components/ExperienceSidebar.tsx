import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

interface ExperienceSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const experiences = [
  {
    period: 'PRESENT',
    company: 'Domain specific RAG engine & AI Agent',
    role: 'FastMCP & Python',
    points: [
      'Architected a Retrieval-Augmented Generation (RAG) system using FastMCP (Model Context Protocol) to enable low-latency semantic search and tool-calling over structured domain knowledge bases.',
      'Built custom retrieval and context-injection pipelines using Python, optimizing vector indexing to supply relevant context into LLM prompts.',
      'Designed agentic tool interfaces to handle multi-step reasoning and dynamic query execution across high-complexity dataset rule sets.'
    ]
  },
  {
    period: 'Oct 2025 - Aug 2026',
    company: 'Walmart',
    role: 'Senior Software Engineer (International Fulfilment)',
    points: [
      'Leading cross-border fulfillment integrations to streamline global order processing across international markets.',
      'Built proactive alerting systems for missing critical data attributes, significantly reducing downstream failures and operational escalations.',
      'Worked on workload identity changes which automated the manual Kafka certificate rotation.'
    ]
  },
  {
    period: 'Mar 2024 - Oct 2025',
    company: 'British Petroleum',
    role: 'SDE-2 (Castrol shop)',
    points: [
      'Developed a pipeline using Palantir Foundry to process refinery instrument PDFs, generating Foundry objects and ontologies using PyTesseract OCR and OpenCV algorithms deployed on Foundry Functions.',
      'Led a team of 4 engineers to launch Castrol Shop for Turkey, scaling the platform to support Turkish clients monthly users with localized, GDPR-compliant backend systems.',
      'Optimized Kubernetes and Docker pipelines, cutting deployment times by 50% and improving release velocity for a 20-developer team.',
      'Enhanced APIs using a secure user identity (CIP), leveraging GraphQL for efficient data access.',
      'Integrated Google Analytics on React based Castrolshop UI for real-time insights, driving a 90% reduction in error pages through faster detection and fixes.',
      'Improved platform security and maintainability by resolving vulnerabilities and upgrading Node.js and Webpack.'
    ]
  },
  {
    period: 'Sep 2021 - Mar 2024',
    company: 'Amazon, India',
    role: 'SDE-1 (Consumer Payments)',
    points: [
      'Automated Elasticsearch/Kibana updates for payment execution data, saving 10+ engineering hours per week.',
      'Built a PayStation self-service onboarding platform using React and AWS (Route53, CDN), reducing onboarding effort by ~3 months.',
      'Automated ECS monitoring and alarms using AWS RUM, improving issue detection and service reliability.',
      'Reduced common development setup time from 6 weeks to 6 hours by creating reusable ECS Fargate templates.',
      'Built a DocHub using Docusaurus to auto-generate documentation; received 20+ internal recognitions.',
      'Resolved 230+ operational issues and earned "Operational Excellence Achiever" recognition.',
      'Mentored two interns through successful full-time conversions and contributed to university/lateral hiring by conducting 10+ core DSA interview rounds.'
    ]
  },
  {
    period: 'Jul 2020 – Sep 2021',
    company: 'Bank of America Pvt. Ltd.',
    role: 'Software Engineer 1-B',
    points: [
      'Supported CI/CD pipelines and coordinated frontend releases with the Core Team.',
      'Developed .NET APIs integrated with the React.js based Customer CX platform for client loan workflows.'
    ]
  }
];

export function ExperienceSidebar({ isOpen, onClose }: ExperienceSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block', ease: 'power2.out' });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.4, ease: 'power3.out' });
      gsap.fromTo('.sidebar-item', 
        { x: 30, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'power3.out' }
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: 'none', ease: 'power2.in' });
      gsap.to(sidebarRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
    }
  }, [isOpen]);

  return (
    <>
      <div 
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden opacity-0"
      />
      
      <div 
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full max-w-xl bg-obsidian-bg border-l border-obsidian-border z-50 transform translate-x-full overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-obsidian-bg/90 backdrop-blur-md border-b border-obsidian-border p-6 flex items-center justify-between z-10">
          <h2 className="font-display text-[24px] font-semibold uppercase tracking-tight">
            Full_Experience
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-obsidian-surface transition-colors border border-transparent hover:border-obsidian-border cursor-pointer"
          >
            <X className="w-5 h-5 text-obsidian-text" />
          </button>
        </div>

        <div className="p-6 md:p-10 flex flex-col gap-12">
          <div className="relative border-l border-obsidian-border ml-2 pl-8 flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <div key={i} className="sidebar-item relative">
                <div className="absolute -left-[37px] top-1.5 w-[11px] h-[11px] border border-obsidian-accent bg-obsidian-bg rounded-full" />
                
                <div className="font-mono text-[10px] uppercase tracking-widest text-obsidian-muted mb-2">
                  {exp.period}
                </div>
                <h3 className="font-display text-[20px] font-semibold mb-1">
                  {exp.company}
                </h3>
                <div className="font-mono text-[12px] text-obsidian-accent mb-4 uppercase tracking-widest">
                  {exp.role}
                </div>
                
                <ul className="flex flex-col gap-3">
                  {exp.points.map((point, j) => (
                    <li key={j} className="font-body text-[14px] text-obsidian-muted leading-[1.6] relative pl-4">
                      <span className="absolute left-0 top-2 w-1 h-1 bg-obsidian-muted rounded-full" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

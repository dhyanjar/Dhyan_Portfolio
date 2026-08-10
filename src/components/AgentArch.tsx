import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const codeString = `from fastmcp import FastMCP
from langchain_community.vectorstores import Chroma

# Initialize High-Performance MCP Server
mcp = FastMCP("RAG_Agent", host="0.0.0.0", port=8000)
vector_db = Chroma(persist_directory="./data")

@mcp.tool()
async def query_knowledge_base(query: str) -> str:
    """Retrieve context for LLM grounding."""
    docs = await vector_db.asimilarity_search(query, k=3)
    return "\\n".join([d.page_content for d in docs])

if __name__ == "__main__":
    mcp.start()`;

export function AgentArch() {
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

    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
      codeWindow.addEventListener('mouseenter', () => {
        gsap.to(codeWindow, { y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)', duration: 0.3, ease: 'power2.out' });
      });
      codeWindow.addEventListener('mouseleave', () => {
        gsap.to(codeWindow, { y: 0, boxShadow: 'none', duration: 0.3, ease: 'power2.out' });
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="py-[80px] md:py-[120px] border-b border-obsidian-border relative">
      <div className="max-w-7xl mx-auto px-[20px] md:px-[64px] relative z-10">
        <h2 className="font-display text-[24px] md:text-[32px] font-semibold uppercase tracking-tight mb-8 md:mb-12">
          <SplitText text="Agent_Arch" className="section-title" />
        </h2>
        
        <div className="code-window border border-obsidian-border bg-obsidian-surface w-full overflow-hidden flex flex-col max-w-4xl cursor-default transition-colors">
          <div className="h-10 border-b border-obsidian-border flex items-center px-4 justify-between bg-obsidian-surface-hover/50">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-obsidian-border" />
              <div className="w-2.5 h-2.5 rounded-full bg-obsidian-border" />
              <div className="w-2.5 h-2.5 rounded-full bg-obsidian-border" />
            </div>
            <div className="font-mono text-[10px] text-obsidian-muted uppercase tracking-widest absolute left-1/2 -translate-x-1/2">
              fastmcp_rag.py
            </div>
          </div>
          <div className="p-6 md:p-8 overflow-x-auto">
            <pre className="font-mono text-[12px] md:text-[14px] leading-[1.6] text-obsidian-accent">
              <code>{codeString}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

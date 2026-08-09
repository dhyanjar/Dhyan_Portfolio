import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' });
      gsap.to(follower, { x: mouseX, y: mouseY, duration: 0.5, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMouseMove);

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(follower, { 
        scale: 1.5, 
        backgroundColor: 'transparent', 
        border: '1px solid var(--theme-accent)', 
        duration: 0.3 
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { 
        scale: 1, 
        backgroundColor: 'var(--theme-accent)', 
        opacity: 0.2,
        border: 'none', 
        duration: 0.3 
      });
    };

    // Need a slight delay to ensure DOM elements are painted for the querySelector
    setTimeout(() => {
      const interactiveElements = document.querySelectorAll('a, button, .nav-btn, .metric-card, .stack-pill, .log-item, .code-window');
      
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    }, 500);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      const interactiveElements = document.querySelectorAll('a, button, .nav-btn, .metric-card, .stack-pill, .log-item, .code-window');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-obsidian-accent rounded-full pointer-events-none z-[100] hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 bg-obsidian-accent opacity-20 rounded-full pointer-events-none z-[99] hidden md:block backdrop-blur-[2px]" />
    </>
  );
}

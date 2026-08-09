import React from 'react';

export function SplitText({ text, className = '', type = 'char' }: { text: string; className?: string, type?: 'char' | 'word' }) {
  if (type === 'word') {
    return (
      <span className={`inline-block ${className}`} aria-label={text}>
        {text.split(' ').map((word, index) => (
          <span 
            key={index} 
            className="inline-block word mr-[0.25em]" 
            aria-hidden="true"
          >
            {word}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="inline-block char" 
          aria-hidden="true" 
          style={{ minWidth: char === ' ' ? '0.5em' : 'auto' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

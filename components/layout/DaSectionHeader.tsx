"use client";

import React, { forwardRef } from 'react';
import DaText from '@/components/ui/typography/DaText';
import { cn } from '@/lib/utils';

interface DaSectionHeaderProps {
  headline: string;
  className?: string;
  maxW?: string;
  align?: 'left' | 'center';
  variant?: 'headlineSm' | 'headlineMd' | 'headlineLg';
  headerRef?: React.RefObject<HTMLDivElement | null>;
  titleRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Reusable Section Header with animated word reveal support.
 */
const DaSectionHeader = forwardRef<HTMLDivElement, DaSectionHeaderProps>(
  ({ headline, className, maxW = '700px', align = 'left', variant = 'headlineSm', headerRef, titleRef }, ref) => {
    const headlineWords = headline.split(" ");

    return (
      <div 
        ref={headerRef || ref} 
        className={cn(
          "w-full max-w-[1200px] mx-auto",
          align === 'center' ? 'text-center' : 'text-left',
          className
        )}
      >
        <div className="overflow-hidden">
          <div ref={titleRef}>
            <DaText 
              variant={variant} 
              className={cn(
                "flex flex-wrap",
                align === 'center' ? 'justify-center' : 'justify-start',
                align === 'center' && 'mx-auto'
              )}
              style={{ maxWidth: maxW }}
            >
              {headlineWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] leading-[1.4]">
                  <span className="word-inner inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </DaText>
          </div>
        </div>
      </div>
    );
  }
);

DaSectionHeader.displayName = 'DaSectionHeader';

export default DaSectionHeader;

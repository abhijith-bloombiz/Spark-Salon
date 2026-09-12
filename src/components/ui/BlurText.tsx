'use client';

import { motion } from 'motion/react';
import React, { useEffect, useRef, useState, useMemo } from 'react';

export interface BlurTextProps {
  text?: string;
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, any>;
  animationTo?: Array<Record<string, any>>;
  easing?: any;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  once?: boolean;
  // Polymorphic & style extensions
  as?: React.ElementType;
  style?: React.CSSProperties;
  spanClassName?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  highlightIndices?: number[];
  highlightStyle?: React.CSSProperties;
}

const buildKeyframes = (
  from: Record<string, any>,
  steps: Array<Record<string, any>>
): Record<string, any[]> => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);

  const keyframes: Record<string, any[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

// Helper to extract plain string from React children (supports numbers, arrays, template literals)
const extractText = (node: React.ReactNode): string => {
  if (node == null) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node) && (node.props as any)?.children) {
    return extractText((node.props as any).children);
  }
  return '';
};

export const BlurText: React.FC<BlurTextProps> = ({
  text: textProp,
  children,
  delay: delayProp,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.04,
  rootMargin = '0px 0px -30px 0px',
  animationFrom,
  animationTo,
  easing = [0.16, 1, 0.3, 1],
  onAnimationComplete,
  stepDuration = 0.42,
  once: onceProp,
  as: Component = 'p',
  style,
  spanClassName = '',
  highlightWords = [],
  highlightClassName = 'text-gold-gradient',
  highlightIndices,
  highlightStyle,
}) => {
  // Intelligent delay defaults: 80ms for monumental titles, 20ms for rapid smooth paragraphs
  const isHeading = typeof Component === 'string' && ['h1', 'h2', 'h3'].includes(Component);
  const delay = delayProp ?? (isHeading ? 75 : 18);
  // Always replay on both forward and reverse scroll
  const once = onceProp !== undefined ? onceProp : false;

  const text = textProp ?? extractText(children);

  const elements = useMemo(() => {
    if (!text) return [];
    if (animateBy === 'words') {
      const lines = text.split('\n');
      const result: string[] = [];
      lines.forEach((line, lineIndex) => {
        const words = line.trim().split(/\s+/).filter(Boolean);
        words.forEach((word) => {
          result.push(word);
        });
        if (lineIndex < lines.length - 1) {
          result.push('\n');
        }
      });
      return result;
    }
    return text.split('');
  }, [text, animateBy]);

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          // Instant reset when scrolled away, so reverse scroll immediately replays the animation
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  // Refined GPU-optimized blur and offset for 120fps fluid scrolling
  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(5px)', opacity: 0, y: -18 }
        : { filter: 'blur(5px)', opacity: 0, y: 18 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    []
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  // Memoize keyframes so they don't rebuild every render
  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, toSnapshots),
    [fromSnapshot, toSnapshots]
  );

  // Helper to determine if a word/letter should receive highlight styling
  const isHighlighted = (token: string, wordIdx: number) => {
    if (highlightIndices?.includes(wordIdx)) return true;
    if (!highlightWords || highlightWords.length === 0) return false;
    const cleanToken = token.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (!cleanToken) return false;
    return highlightWords.some((hw) => {
      const cleanHw = hw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      return cleanHw && (cleanToken === cleanHw || cleanToken.includes(cleanHw) || cleanHw.includes(cleanToken));
    });
  };

  // Find index of the last animatable token for onAnimationComplete callback
  const lastAnimatableIndex = useMemo(() => {
    for (let i = elements.length - 1; i >= 0; i--) {
      if (elements[i] !== '\n') return i;
    }
    return -1;
  }, [elements]);

  let animIndex = 0;

  const isCenter = style?.textAlign === 'center' || className.includes('text-center');
  const computedJustify = isCenter ? 'center' : (style?.justifyContent || 'flex-start');

  const Tag = Component as any;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: computedJustify,
        alignItems: 'baseline',
        ...style,
      }}
    >
      {elements.map((segment, index) => {
        if (segment === '\n') {
          return (
            <span
              key={`br-${index}`}
              style={{
                display: 'block',
                flexBasis: '100%',
                width: '100%',
                height: 0,
                margin: 0,
                padding: 0,
              }}
              aria-hidden="true"
            />
          );
        }

        const currentAnimIndex = animIndex++;
        const isHighlight = isHighlighted(segment, currentAnimIndex);

        // When in view, animate forward staggered. When out of view, gentle non-flashing exit to conserve GPU frames.
        const spanTransition: any = inView
          ? {
              duration: totalDuration,
              times,
              delay: (currentAnimIndex * delay) / 1000,
              ease: easing,
            }
          : {
              duration: 0.22,
              delay: 0,
              ease: 'easeOut',
            };

        const isNextNewline = index < elements.length - 1 && elements[index + 1] === '\n';
        const shouldAddSpace = animateBy === 'words' && index < elements.length - 1 && !isNextNewline;

        const combinedSpanClass = [
          'inline-block',
          spanClassName,
          isHighlight ? highlightClassName : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <motion.span
            className={combinedSpanClass}
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              ...(isHighlight && highlightStyle ? highlightStyle : {}),
            }}
            onAnimationComplete={index === lastAnimatableIndex ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {shouldAddSpace && '\u00A0'}
          </motion.span>
        );
      })}
    </Tag>
  );
};

export default BlurText;

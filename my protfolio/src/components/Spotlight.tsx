import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

export const Spotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Use a ref to update the background directly for better performance with complex strings
  useEffect(() => {
    const unsubscribeX = springX.on('change', (latestX) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${latestX}px`);
      }
    });
    const unsubscribeY = springY.on('change', (latestY) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-y', `${latestY}px`);
      }
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [springX, springY]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--accent-glow), transparent 80%)`,
      }}
    />
  );
};

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './Desk.css';

interface DeskProps {
  children: React.ReactNode;
}

export const Desk: React.FC<DeskProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // MAIN ZOOM LOGIC:
  // Laptop Frame is 960x600. 
  // To fill a 1920x1080 screen exactly, we need ~2.0x scale.
  // We'll scale up to a point where the BEZEL is off-screen.
  const scale = useTransform(smoothProgress, [0, 1], [0.6, 2.1]);
  const yTranslate = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  
  // Internal content scales from miniature (0.46) to full (1.0)
  const internalScale = useTransform(smoothProgress, [0, 1], [0.48, 1]);
  
  // Fade out desk items
  const deskOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const itemsY = useTransform(smoothProgress, [0, 1], [0, 300]);

  // IMPORTANT: Only enable pointer events when scroll is at 100% (1.0)
  const pointerEvents = useTransform(smoothProgress, (val) => val >= 0.99 ? 'auto' : 'none');

  return (
    <div className="desk-environment" ref={containerRef}>
      <div className="desk-content">
        <div className="table-surface" />
        
        {/* Grounded items */}
        <motion.div 
            className="desk-item physical-note" 
            style={{ 
                opacity: deskOpacity,
                left: 'calc(50% - 650px)',
                bottom: '100px',
                y: itemsY,
                rotate: -8
            }}
        >
            Welcome to the future. - Momin
        </motion.div>
        
        <motion.div 
            className="desk-item coffee-mug" 
            style={{ 
                opacity: deskOpacity,
                right: 'calc(50% - 600px)',
                bottom: '80px',
                y: itemsY
            }}
        >
            <div className="coffee-handle" />
        </motion.div>

        <motion.div 
          className="laptop-container"
          style={{ 
            scale,
            y: yTranslate,
            perspective: 2000
          }}
        >
          <motion.div 
            className="laptop-screen-frame"
          >
            <div className="laptop-screen-content">
              <motion.div 
                style={{ 
                  width: '100vw', 
                  height: '100vh',
                  flexShrink: 0,
                  scale: internalScale,
                  pointerEvents,
                  transformOrigin: 'center center'
                }}
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
          <div className="laptop-bottom" />
        </motion.div>

        <motion.div 
          className="scroll-hint"
          style={{ opacity: deskOpacity }}
        >
          Scroll to explore ↓
        </motion.div>
      </div>
    </div>
  );
};

export default Desk;

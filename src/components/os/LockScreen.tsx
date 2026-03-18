import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LockScreen.css';
import tahoeBg from '../../assets/26-Tahoe-Light-6K.png';

interface LockScreenProps {
  onUnlock: () => void;
}

const greetings = [
  'hello',
  'hola',
  'ciao',
  'hei',
  'bonjour',
  'hallo',
  'salut',
];

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onUnlock();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUnlock]);

  return (
    <div 
      className="lock-screen-container"
      style={{ backgroundImage: `url(${tahoeBg})` }}
    >
      <div className="lock-screen-overlay" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={greetings[index]}
          className="hello-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {greetings[index]}
        </motion.div>
      </AnimatePresence>

      <motion.div 
        className="intro-text"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1>Welcome to Momin's Portfolio</h1>
        <p>
            Building the future, one line at a time. Explore my projects,
            achievements, and experience through this interactive macOS Tahoe environment.
        </p>
        
        <button className="enter-button" onClick={onUnlock}>
            Get Started
        </button>
        
        <div className="enter-hint">
            or press <strong>Enter</strong> to begin
        </div>
      </motion.div>
    </div>
  );
};

export default LockScreen;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Desktop from './components/os/Desktop';
import LockScreen from './components/os/LockScreen';
import './App.css';

function App() {
  const [isLocked, setIsLocked] = useState(true);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isLocked ? (
          <motion.div
            key="lock-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ width: '100vw', height: '100vh' }}
          >
            <LockScreen onUnlock={() => setIsLocked(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="desktop"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ width: '100vw', height: '100vh' }}
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

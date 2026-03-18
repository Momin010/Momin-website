import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { AppId, AppConfig } from './Desktop';
import './os.css';

interface DockProps {
  apps: AppConfig[];
  openApp: (id: AppId) => void;
  openApps: AppId[];
  activeApp: AppId | null;
}

const Dock: React.FC<DockProps> = ({ apps, openApp, openApps, activeApp }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div 
      className="dock-container"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {apps.map((app) => (
        <DockIcon 
            key={app.id} 
            mouseX={mouseX} 
            app={app} 
            onClick={() => openApp(app.id)}
            isOpen={openApps.includes(app.id)}
            isActive={activeApp === app.id}
        />
      ))}
    </div>
  );
};

interface DockIconProps {
  mouseX: any;
  app: AppConfig;
  onClick: () => void;
  isOpen: boolean;
  isActive: boolean;
}

const DockIcon: React.FC<DockIconProps> = ({ mouseX, app, onClick, isOpen, isActive }) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [50, 80, 50]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="dock-icon"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      <div className={`dock-icon-inner ${isActive ? 'active' : ''}`}>
        <img src={app.icon} alt={app.title} style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
      </div>
      <div className="dock-tooltip">{app.title}</div>
      {isOpen && <div className="dock-dot" />}
    </motion.div>
  );
};

export default Dock;

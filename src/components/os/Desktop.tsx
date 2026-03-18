import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from './Window';

// Asset imports
import tahoeBg from '../../assets/26-Tahoe-Light-6K.png';
import finderIcon from '../../assets/finder.png';
import mailIcon from '../../assets/mail.png';
import notesIcon from '../../assets/notes.png';
import photosIcon from '../../assets/photos.png';
import safariIcon from '../../assets/safari.png';
import diskIcon from '../../assets/disk.png';
import findmyIcon from '../../assets/findmy.png';
import mapsIcon from '../../assets/maps.png';

// Import actual content components
import About from '../About';
import Projects from '../Projects';
import Achievements from '../Achievements';
import Experience from '../Experience';
import Goals from '../Goals';
import Contact from '../Contact';
import Notes from '../Notes';

export type AppId = 'about' | 'projects' | 'achievements' | 'experience' | 'goals' | 'contact' | 'notes' | 'photos' | 'maps';

export interface AppConfig {
  id: AppId;
  title: string;
  icon: string; // Image path now
  component: React.FC;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
}

const apps: AppConfig[] = [
  { id: 'about', title: 'About Me', icon: finderIcon, component: About, defaultWidth: 700, defaultHeight: 500 },
  { id: 'experience', title: 'Experience', icon: safariIcon, component: Experience, defaultWidth: 700, defaultHeight: 500 },
  { id: 'projects', title: 'Projects', icon: photosIcon, component: Projects, defaultWidth: 800, defaultHeight: 600 },
  { id: 'achievements', title: 'Achievements', icon: findmyIcon, component: Achievements, defaultWidth: 600, defaultHeight: 400 },
  { id: 'goals', title: 'Goals', icon: mapsIcon, component: Goals, defaultWidth: 500, defaultHeight: 400 },
  { id: 'notes', title: 'Notes', icon: notesIcon, component: Notes, defaultWidth: 400, defaultHeight: 500 },
  { id: 'contact', title: 'Contact', icon: mailIcon, component: Contact, defaultWidth: 400, defaultHeight: 350 },
];

export const Desktop: React.FC = () => {
  const [openApps, setOpenApps] = useState<AppId[]>([]);
  const [minimizedApps, setMinimizedApps] = useState<AppId[]>([]);
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [zIndexes, setZIndexes] = useState<Record<string, number>>({});

  const openApp = (id: AppId) => {
    if (minimizedApps.includes(id)) {
      setMinimizedApps(minimizedApps.filter(appId => appId !== id));
    } else if (!openApps.includes(id)) {
      setOpenApps([...openApps, id]);
    }
    focusApp(id);
  };

  const closeApp = (id: AppId) => {
    setOpenApps(openApps.filter((appId) => appId !== id));
    setMinimizedApps(minimizedApps.filter(appId => appId !== id));
    if (activeApp === id) {
      setActiveApp(null);
    }
  };

  const minimizeApp = (id: AppId) => {
    setMinimizedApps([...minimizedApps, id]);
    if (activeApp === id) {
        setActiveApp(null);
    }
  };

  const focusApp = (id: AppId) => {
    setActiveApp(id);
    setZIndexes((prev) => {
      const maxZ = Math.max(0, ...Object.values(prev));
      return { ...prev, [id]: maxZ + 1 };
    });
  };

  return (
    <div
      className="desktop-container"
      style={{
        backgroundImage: `url(${tahoeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Liquid Glass Refraction SVG Filter */}
      <svg style={{ display: 'none' }}>
        <filter id="liquid-refraction">
          <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <MenuBar />
      
      <div className="desktop-area">
        {/* Desktop Icons */}
        <div style={{ position: 'absolute', right: 20, top: 50, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="desktop-icon" onDoubleClick={() => openApp('about')}>
            <img src={diskIcon} alt="Macintosh HD" style={{ width: 45, height: 45 }} />
            <span className="desktop-icon-label">Macintosh HD</span>
          </div>
          {/* Add a placeholder for Trash or other icons if needed */}
        </div>

        <AnimatePresence>
          {openApps.map((appId) => {
            const app = apps.find((a) => a.id === appId);
            const isMinimized = minimizedApps.includes(appId);
            if (!app || isMinimized) return null;
            return (
              <Window
                key={appId}
                app={app}
                isActive={activeApp === appId}
                zIndex={zIndexes[appId] || 1}
                onClose={() => closeApp(appId)}
                onMinimize={() => minimizeApp(appId)}
                onFocus={() => focusApp(appId)}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <Dock 
        apps={apps} 
        openApp={openApp} 
        openApps={openApps} 
        activeApp={activeApp}
      />
    </div>
  );
};

export default Desktop;

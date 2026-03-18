import React, { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import './os.css';

interface WindowProps {
  app: {
    title: string;
    component: React.FC;
    defaultWidth?: number;
    defaultHeight?: number;
    defaultX?: number;
    defaultY?: number;
  };
  isActive: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
}

const Window: React.FC<WindowProps> = ({ app, isActive, zIndex, onClose, onMinimize, onFocus }) => {
  const dragControls = useDragControls();
  const [isMaximized, setIsMaximized] = useState(false);
  
  // Stable initial values
  const [size, setSize] = useState({
    width: app.defaultWidth || 600,
    height: app.defaultHeight || 450
  });
  
  const [pos, setPos] = useState({
    x: app.defaultX || Math.floor(Math.random() * 100 + 100),
    y: app.defaultY || Math.floor(Math.random() * 100 + 100)
  });

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    onFocus();
  };

  const handleResize = (_: any, info: any) => {
    setSize({
        width: Math.max(300, size.width + info.delta.x),
        height: Math.max(200, size.height + info.delta.y)
    });
  };

  return (
    <motion.div
      className={`window-frame liquid-glass ${isActive ? 'active' : ''} ${isMaximized ? 'maximized' : ''}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        x: isMaximized ? 0 : pos.x, 
        y: isMaximized ? 32 : pos.y, 
        width: isMaximized ? '100vw' : size.width, 
        height: isMaximized ? 'calc(100vh - 32px)' : size.height 
      }}
      exit={{ scale: 0.8, opacity: 0, y: 400 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      style={{
        zIndex,
        position: 'absolute',
      }}
      drag={!isMaximized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      onDragEnd={(_, info) => {
          setPos({ x: pos.x + info.offset.x, y: pos.y + info.offset.y });
      }}
      onPointerDown={onFocus}
    >
      <div
        className="title-bar"
        onPointerDown={(e) => {
          if (!isMaximized) dragControls.start(e);
          onFocus();
        }}
        onDoubleClick={toggleMaximize}
      >
        <div className="traffic-lights">
            <div 
                className="traffic-light light-close" 
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            />
            <div 
                className="traffic-light light-minimize" 
                onClick={(e) => {
                    e.stopPropagation();
                    onMinimize();
                }}
            />
            <div 
                className="traffic-light light-maximize" 
                onClick={(e) => {
                    e.stopPropagation();
                    toggleMaximize();
                }}
            />
        </div>
        <div className="window-title">{app.title}</div>
      </div>
      
      <div className="window-content-area">
        <div className="liquid-glass-bg" />
        <div className="window-inner-content">
            <app.component />
        </div>
      </div>

      {!isMaximized && (
        <motion.div 
            className="resize-handle" 
            drag
            dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
            dragElastic={0}
            dragMomentum={false}
            onDrag={handleResize}
            onPointerDown={(e) => e.stopPropagation()}
        />
      )}
    </motion.div>
  );
};

export default Window;

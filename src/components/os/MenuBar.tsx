import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search } from 'lucide-react';
import './os.css';

const MenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="menu-bar">
      <div className="menu-item apple-logo"><Apple size={16} fill="black" /></div>
      <div className="menu-item" style={{ fontWeight: 'bold' }}>Finder</div>
      <div className="menu-item">File</div>
      <div className="menu-item">Edit</div>
      <div className="menu-item">View</div>
      <div className="menu-item">Go</div>
      <div className="menu-item">Window</div>
      <div className="menu-item">Help</div>
      
      <div style={{ flexGrow: 1 }}></div>
      
      <div className="menu-item"><Wifi size={14} /></div>
      <div className="menu-item"><Battery size={14} /></div>
      <div className="menu-item"><Search size={14} /></div>
      <div className="menu-item">{formattedDate}</div>
      <div className="menu-item">{formattedTime}</div>
    </div>
  );
};

export default MenuBar;

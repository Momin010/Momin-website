import React, { useState } from 'react';

const Notes: React.FC = () => {
  const [note, setNote] = useState('Welcome to my portfolio! Feel free to look around.');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '10px' }}>
      <textarea
        style={{
          flex: 1,
          width: '100%',
          border: 'none',
          resize: 'none',
          padding: '10px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          fontSize: '15px',
          lineHeight: '1.5',
          outline: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          color: '#1d1d1f',
        }}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type a note..."
      />
    </div>
  );
};

export default Notes;

// MouseCursor.jsx
import React, { useState, useEffect } from 'react';
import './MouseCursor.css';

const MouseCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveHandler);
    return () => window.removeEventListener('mousemove', moveHandler);
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    />
  );
};

export default MouseCursor;

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { playClickSound } from '../utils/audioManager';

const Intro = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    playClickSound();
    const audio = new Audio('/assets/audio/intro-sound.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
    setTimeout(() => navigate('/home'), 400);
  };

  return (
    <motion.div
      className="intro"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } }}
      exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.8, ease: 'easeIn' } }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#ebebed',
        color: '#4f4f58',
      }}
    >
      <motion.h1 style={{ fontSize: '4rem', fontFamily: 'Georgia, serif', margin: 0, textShadow: '0 0 10px rgba(255, 215, 0, 0.3)' }}>
        Olympus
      </motion.h1>
      <motion.p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
        L'entrée d’un sanctuaire d’œuvres sacrées
      </motion.p>
      <button
        onClick={handleEnter}
        style={{
          marginTop: '2rem',
          padding: '0.8rem 2rem',
          fontSize: '1rem',
          background: 'transparent',
          border: '1px solid #4f4f58',
          color: '#4f4f58',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        ENTRER DANS L'OLYMPE
      </button>
    </motion.div>
  );
};

export default Intro;

// CTA.jsx
import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <motion.button
      className="cta-button"
      whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(255, 215, 0, 0.6)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        padding: '1rem 2rem',
        fontSize: '1.2rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        background: '#ffcc00',
        color: '#000',
      }}
    >
      Découvrir l'Expérience
    </motion.button>
  );
};

export default CTA;


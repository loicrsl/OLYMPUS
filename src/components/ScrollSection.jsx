// ScrollSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ScrollSection = ({ title, content }) => {
  return (
    <motion.section
      className="scroll-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        padding: '4rem 2rem',
        background: '#000',
        color: '#fff',
        textAlign: 'center'
      }}
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{title}</h2>
      <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>{content}</p>
    </motion.section>
  );
};

export default ScrollSection;

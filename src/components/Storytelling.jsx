// Storytelling.jsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Storytelling = () => {
  // Suivi du défilement pour synchroniser l'animation
  const { scrollYProgress } = useScroll();
  // Transformation pour une transition subtile du texte
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.section
      className="storytelling"
      style={{
        opacity,
        y,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        background: '#000', // Fond sombre pour renforcer l'ambiance sacrée
      }}
    >
      <motion.h2
        style={{
          fontSize: '3rem',
          color: '#fff',
          marginBottom: '1rem',
        }}
      >
        Notre Histoire Sacrée
      </motion.h2>
      <motion.p
        style={{
          fontSize: '1.5rem',
          color: '#ccc',
          maxWidth: '800px',
          textAlign: 'center',
        }}
      >
        Entrez dans un voyage mystique, où chaque mot et chaque image révèle un fragment d'un univers divin, empreint de beauté et de mystère.
      </motion.p>
    </motion.section>
  );
};

export default Storytelling;

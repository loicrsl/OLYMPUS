// Parallax.jsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Parallax.jsx
 * Ce composant applique un effet de parallax aux éléments enfants.
 * L'effet est contrôlé par le scroll et la propriété "offset" (valeur par défaut : 100).
 */
const Parallax = ({ children, offset = 100 }) => {
  const { scrollY } = useScroll();
  // Transforme le scrollY en une translation verticale allant de 0 à -offset
  const y = useTransform(scrollY, [0, 500], [0, -offset]);

  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  );
};

export default Parallax;

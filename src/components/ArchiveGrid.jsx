// ArchiveGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const ArchiveGrid = () => {
  // Exemple d'éléments d'archives (œuvres sacrées)
  const archiveItems = [
    { id: 1, title: "Œuvre Sacrée 1", image: "https://via.placeholder.com/400?text=Œuvre+1" },
    { id: 2, title: "Œuvre Sacrée 2", image: "https://via.placeholder.com/400?text=Œuvre+2" },
    { id: 3, title: "Œuvre Sacrée 3", image: "https://via.placeholder.com/400?text=Œuvre+3" },
    { id: 4, title: "Œuvre Sacrée 4", image: "https://via.placeholder.com/400?text=Œuvre+4" },
  ];

  return (
    <motion.div
      className="archive-grid"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        padding: '2rem',
        background: '#111',
      }}
    >
      {archiveItems.map(item => (
        <motion.div
          key={item.id}
          className="archive-item"
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(255, 215, 0, 0.8)' }}
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '250px',
            borderRadius: '8px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            className="archive-title"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '0',
              width: '100%',
              padding: '0.5rem',
              background: 'rgba(0, 0, 0, 0.6)',
              color: '#fff',
              textAlign: 'center',
              fontSize: '1rem',
            }}
          >
            {item.title}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ArchiveGrid;


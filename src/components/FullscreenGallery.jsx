// FullscreenGallery.jsx
import React from 'react';
import { motion } from 'framer-motion';

const galleryVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const images = [
  'https://via.placeholder.com/1920x1080?text=Image+1',
  'https://via.placeholder.com/1920x1080?text=Image+2',
  'https://via.placeholder.com/1920x1080?text=Image+3',
];

const FullscreenGallery = () => {
  return (
    <motion.div
      className="fullscreen-gallery"
      variants={galleryVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        width: '100%',
        height: '100vh',
      }}
    >
      {images.map((src, index) => (
        <motion.div
          key={index}
          className="gallery-item"
          variants={imageVariants}
          style={{
            flex: '0 0 100%',
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
          }}
        />
      ))}
    </motion.div>
  );
};

export default FullscreenGallery;


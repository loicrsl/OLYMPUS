// PageTransition.jsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const transitionVariants = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(10px)' },
};

const PageTransition = ({ children }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={window.location.pathname} // Utilise la clé de la route pour déclencher la transition
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

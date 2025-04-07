import React from 'react';
import Parallax from '../components/Parallax';
import ScrollSection from '../components/ScrollSection';
import OverlayFX from '../components/OverlayFX';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div
      className="home-page"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#ebebed',
        fontFamily: 'Georgia, serif',
      }}
    >
      <OverlayFX />
      <Parallax />

      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '10vh',
          padding: '10vh 8vw',
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <ScrollSection
          title="L’Olympe du Design"
          subtitle="Un sanctuaire d’œuvres visuelles transcendantes"
          description="Découvrez un univers où chaque création est une offrande au sacré, où le marbre, la lumière et le silence racontent une histoire divine."
        />

        <ScrollSection
          title="Une galerie céleste"
          subtitle="Inspirée des musées de la Renaissance"
          description="Entre colonnes de marbre et halos dorés, cette section vous plonge dans une expérience contemplative hors du temps."
        />

        <ScrollSection
          title="Direction artistique sacrée"
          subtitle="Minimalisme, raffinement, éternité"
          description="L’univers Olympus repose sur une esthétique sobre, luxueuse, et intemporelle. Chaque détail est pensé comme un fragment d’immortalité."
        />
      </motion.div>
    </div>
  );
};

export default Home;

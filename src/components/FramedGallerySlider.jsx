import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectGallery.css';
import Parallax from './Parallax';
import { playClickSound } from '../utils/audioManager';

import frameSquare from '../assets/frames/frame-square.png';
import frameSquareMask from '../assets/frames/frame-square-mask.png';
import marbleBackground from '../assets/textures/marble-background.jpg';

const ProjectGallery = ({ isLightMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [artworks, setArtworks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const brigliaArtworks = [
      {
        id: 1,
        title: "Artwork 1",
        artist: "77Briglia",
        year: "2023",
        description: "Première création Behance pour la galerie Olympus.",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/2800/9aef2a105305975.643a08df037b7.png",
        location: "Paris, France"
      },
      {
        id: 2,
        title: "Artwork 2",
        artist: "77Briglia",
        year: "2023",
        description: "Deuxième visuel inspiration mode & design.",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3a336f119958217.67b2bea8c64bf.jpg",
        location: "London, UK"
      },
      {
        id: 3,
        title: "Artwork 3",
        artist: "77Briglia",
        year: "2023",
        description: "Troisième visuel, inspirations street/néon.",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/2800/d83245168424297.643a10cb25ee5.jpg",
        location: "NYC, USA"
      },
    ];
    setArtworks(brigliaArtworks);
  }, []);

  const handleOpenModal = () => {
    playClickSound();
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    playClickSound();
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    playClickSound();
    setCurrentIndex((prevIndex) => prevIndex === 0 ? artworks.length - 1 : prevIndex - 1);
  };

  const goToNext = () => {
    playClickSound();
    setCurrentIndex((prevIndex) => prevIndex === artworks.length - 1 ? 0 : prevIndex + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'Escape' && isModalOpen) handleCloseModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isModalOpen, artworks.length]);

  if (artworks.length === 0) {
    return <div className="gallery-loading"><h2>Chargement de la galerie...</h2></div>;
  }

  const currentArtwork = artworks[currentIndex];

  return (
    <div 
      className={`museum-gallery ${isLightMode ? 'light' : 'dark'}`}
      ref={galleryRef}
      style={{ background: 'transparent' }}
    >
      <div
        className="marble-background"
        style={{
          backgroundImage: `url(${marbleBackground})`,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -10,
          opacity: 0.8
        }}
      />

      <div className="gallery-header">
        <Parallax offset={-30}>
          <h1 className="gallery-title" style={{ color: '#d4af37' }}>LA GALERIE OLYMPUS</h1>
        </Parallax>
      </div>

      <div className="museum-view" style={{ background: 'transparent' }}>
        <button className="nav-button prev-button" onClick={goToPrevious}>‹</button>

        <div className="artwork-display-container" style={{ background: 'transparent' }}>
          <div className="artwork-display" style={{ background: 'transparent' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentArtwork.id}
                className="artwork-frame"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onClick={handleOpenModal}
              >
                <div style={{ position: 'relative', width: '700px', height: '700px' }}>
                  <img 
                    src={frameSquare}
                    alt="Cadre doré Olympus"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      pointerEvents: 'none',
                      zIndex: 2
                    }}
                  />
                  <img
                    src={currentArtwork.image}
                    alt={currentArtwork.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      zIndex: 1,
                      WebkitMaskImage: `url(${frameSquareMask})`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      WebkitMaskMode: 'alpha',
                      maskImage: `url(${frameSquareMask})`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      maskMode: 'alpha'
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="artwork-plaque">
            <div className="plaque-content">
              <h2 className="artwork-title">{currentArtwork.title}</h2>
              <h3 className="artwork-creator">{currentArtwork.artist}, {currentArtwork.year}</h3>
              <p className="artwork-location">{currentArtwork.location}</p>
              <button className="info-button" onClick={handleOpenModal}>Plus d'informations</button>
            </div>
          </div>
        </div>

        <button className="nav-button next-button" onClick={goToNext}>›</button>
      </div>

      <div className="gallery-pagination">
        {artworks.map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              playClickSound();
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="artwork-modal-overlay" onClick={handleCloseModal}>
          <div className="artwork-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>×</button>
            <div className="modal-frame">
              <img src={currentArtwork.image} alt={currentArtwork.title} className="modal-artwork-image" />
            </div>
            <div className="modal-artwork-info">
              <h2>{currentArtwork.title}</h2>
              <h3>{currentArtwork.artist}, {currentArtwork.year}</h3>
              <p className="artwork-location">{currentArtwork.location}</p>
              <p className="modal-artwork-description">{currentArtwork.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="decorative-column left-column"></div>
      <div className="decorative-column right-column"></div>
    </div>
  );
};

export default ProjectGallery;

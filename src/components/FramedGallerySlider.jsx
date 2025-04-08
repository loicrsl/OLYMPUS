import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectGallery.css';
import frameSquare from '../assets/frames/frame-square.png';
import frameSquareMask from '../assets/frames/frame-square-mask.png';
import { playClickSound } from '../utils/audioManager';

const ProjectGallery = ({ isLightMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [artworks, setArtworks] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);

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
    preloadImages(brigliaArtworks);
  }, []);

  const preloadImages = (items) => {
    const imagePromises = items.map(item => {
      return new Promise(resolve => {
        const img = new Image();
        img.src = item.image;
        img.onload = resolve;
      });
    });
    Promise.all(imagePromises).then(() => setLoadedImages(items.map(i => i.id)));
  };

  const goToPrevious = () => {
    playClickSound();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artworks.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    playClickSound();
    setCurrentIndex((prevIndex) =>
      prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (artworks.length === 0) {
    return (
      <div className="gallery-loading">
        <h2>Chargement de la galerie...</h2>
      </div>
    );
  }

  const currentArtwork = artworks[currentIndex];
  const isLoaded = loadedImages.includes(currentArtwork.id);

  return (
    <div className={`museum-gallery ${isLightMode ? 'light' : 'dark'}`}>      
      <div className="marble-background" />

      <div className="gallery-header">
        <h1 className="gallery-title">LA GALERIE OLYMPUS</h1>
      </div>

      <div className="museum-view">
        <button className="nav-button prev-button" onClick={goToPrevious}>‹</button>

        <div className="artwork-display-container">
          <div className="artwork-display">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentArtwork.id}
                className="artwork-frame"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '700px',
                    height: '700px',
                    filter: isLoaded ? 'drop-shadow(0 0 20px rgba(212,175,55,0.2))' : 'blur(5px)',
                    transition: 'filter 0.5s ease'
                  }}
                >
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
                    loading="lazy"
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
              <h3 className="artwork-creator">
                {currentArtwork.artist}, {currentArtwork.year}
              </h3>
              <p className="artwork-location">{currentArtwork.location}</p>
              <button className="info-button">
                Plus d'informations
              </button>
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
    </div>
  );
};

export default ProjectGallery;

/*******************************************************
 * ProjectGallery.jsx - Version Carrousel
 *
 * Règle clé: "Ne jamais rien enlever sans validation."
 * => On garde toutes les lignes et commentaires.
 * => On enlève explicitement la rotation 3D (cadre
 *    parallax) avec permission de Loïc.
 * => On réduit le conteneur à 700×700.
 * => On fonce la couleur dorée du titre.
 * => On garde la plaque intacte.
 * => On améliore les media queries dans le CSS.
 *******************************************************/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectGallery.css';
import Parallax from './Parallax';
import { playClickSound } from '../utils/audioManager';

// Frame & Mask
import frameSquare from '../assets/frames/frame-square.png';
import frameSquareMask from '../assets/frames/frame-square-mask.png';

/* ProjectGallery - Le slider en carrousel
   => Composant principal de la page "Portfolio" 
   => Scène immersive ~ (Parallax sur cadre) => plus maintenant, retiré.
   => Artwork mis en avant dans un cadre baroque 
   => Plaque pour titre, artiste, date, description
   => Modale pour détails supplémentaires
*/
const ProjectGallery = ({ isLightMode }) => {
  /********************************************
   * States
   ********************************************/
  const [currentIndex, setCurrentIndex] = useState(0);
  const [artworks, setArtworks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Référence pour le container => rotation 3D
  // (We keep this but won't use it for rotation)
  const galleryRef = useRef(null);

  /********************************************
   * Chargement des œuvres
   * => Liens Behance (version validée)
   ********************************************/
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

  /********************************************
   * Fonctions modale
   ********************************************/
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

  /********************************************
   * Navigation Carrousel
   ********************************************/
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

  // Gestion touches clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isModalOpen, artworks.length]);

  /********************************************
   * Rotation 3D oeuvre centrale
   * => (Removed with permission)
   ********************************************/
  /*
   const handleMouseMove = (e) => {
     // old code removed
   };

   const resetRotation = () => {
     // old code removed
   };
  */

  /********************************************
   * Si aucune œuvre n'est chargée
   ********************************************/
  if (artworks.length === 0) {
    return (
      <div className="gallery-loading">
        <h2>Chargement de la galerie...</h2>
      </div>
    );
  }

  // Artwork courant
  const currentArtwork = artworks[currentIndex];

  /********************************************
   * Rendu final
   ********************************************/
  return (
    <div 
      className={`museum-gallery ${isLightMode ? 'light' : 'dark'}`}
      ref={galleryRef}
      // onMouseMove={handleMouseMove} // removed
      // onMouseLeave={resetRotation}  // removed
    >
      {/* Background marbre */}
      <div className="marble-background"></div>

      {/* Titre - Parallax sur le texte, pas sur le cadre */}
      <div className="gallery-header">
        <Parallax offset={-30}>
          <h1 className="gallery-title">LA GALERIE OLYMPUS</h1>
        </Parallax>
      </div>
      
      {/* La zone du carrousel */}
      <div className="museum-view">
        <button className="nav-button prev-button" onClick={goToPrevious}>
          ‹
        </button>
        
        <div className="artwork-display-container">
          <div className="artwork-display">
            {/* Animation slider Framer Motion */}
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
                {/*
                  OPTION C revisited => 700×700 container
                */}
                <div
                  className="frame-container-700" 
                  style={{
                    position: 'relative',
                    width: '700px',
                    height: '700px'
                  }}
                >
                  {/* Cadre PNG en superposition */}
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

                  {/* Artwork masqué par frameSquareMask */}
                  <img
                    src={currentArtwork.image}
                    alt={currentArtwork.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
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
          
          {/* Plaque info (non modifiée) */}
          <div className="artwork-plaque">
            <div className="plaque-content">
              <h2 className="artwork-title">{currentArtwork.title}</h2>
              <h3 className="artwork-creator">
                {currentArtwork.artist}, {currentArtwork.year}
              </h3>
              <p className="artwork-location">{currentArtwork.location}</p>
              <button className="info-button" onClick={handleOpenModal}>
                Plus d'informations
              </button>
            </div>
          </div>
        </div>
        
        <button className="nav-button next-button" onClick={goToNext}>
          ›
        </button>
      </div>
      
      {/* Pagination Dots */}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="artwork-modal-overlay" onClick={handleCloseModal}>
          <div className="artwork-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>×</button>
            <div className="modal-frame">
              <img 
                src={currentArtwork.image} 
                alt={currentArtwork.title} 
                className="modal-artwork-image"
              />
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

      {/* Colonnes décoratives inspirées de l'architecture classique */}
      <div className="decorative-column left-column"></div>
      <div className="decorative-column right-column"></div>
    </div>
  );
};

export default ProjectGallery;

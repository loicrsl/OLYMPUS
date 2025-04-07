// ProjectGallery.jsx - Version carrousel
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectGallery.css';
import Parallax from './Parallax';
import { playClickSound } from '../utils/audioManager';

const ProjectGallery = ({ isLightMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [artworks, setArtworks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const galleryRef = useRef(null);
  
  // Simuler le chargement des données des œuvres
  useEffect(() => {
    // Données factices pour la démo
    const demoArtworks = [
      {
        id: 1,
        title: "La Nuit Étoilée",
        artist: "Vincent van Gogh",
        year: "1889",
        description: "\"Quand je regarde les étoiles et avec elles mon être tout entier, je suis partie d'une de ces étoiles.\"",
        image: "/api/placeholder/600/600",
        location: "MoMA, New York"
      },
      {
        id: 2,
        title: "La Création d'Adam",
        artist: "Michel-Ange",
        year: "1512",
        description: "Un fragment emblématique de la fresque du plafond de la chapelle Sixtine, représentant Dieu donnant la vie à Adam par le toucher.",
        image: "/api/placeholder/800/500",
        location: "Chapelle Sixtine, Vatican"
      },
      {
        id: 3,
        title: "La Joconde",
        artist: "Léonard de Vinci",
        year: "1503",
        description: "Un portrait mondialement célèbre dont le sourire reste mystérieux, chef-d'œuvre de la Renaissance italienne.",
        image: "/api/placeholder/500/800",
        location: "Musée du Louvre, Paris"
      },
      {
        id: 4,
        title: "Les Tournesols",
        artist: "Vincent van Gogh",
        year: "1888",
        description: "Une série de tableaux représentant des tournesols dans un vase, symbole de dévotion et d'admiration.",
        image: "/api/placeholder/600/600",
        location: "National Gallery, Londres"
      },
      {
        id: 5,
        title: "La Persistance de la Mémoire",
        artist: "Salvador Dalí",
        year: "1931",
        description: "Une œuvre surréaliste connue pour ses montres molles, représentant la fluidité du temps dans un paysage onirique.",
        image: "/api/placeholder/800/500",
        location: "MoMA, New York"
      },
      {
        id: 6,
        title: "Guernica",
        artist: "Pablo Picasso",
        year: "1937",
        description: "Une puissante représentation de la guerre civile espagnole, symbole universel des souffrances de la guerre.",
        image: "/api/placeholder/800/500",
        location: "Museo Reina Sofía, Madrid"
      },
      {
        id: 7,
        title: "Le Cri",
        artist: "Edvard Munch",
        year: "1893",
        description: "Une expression de l'angoisse existentielle, devenue une icône de l'art moderne.",
        image: "/api/placeholder/500/800",
        location: "Galerie nationale, Oslo"
      },
    ];

    setArtworks(demoArtworks);
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

  // Gestion des touches clavier
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

  // Effet de rotation de l'œuvre centrale
  const handleMouseMove = (e) => {
    if (!galleryRef.current) return;
    
    const { left, top, width, height } = galleryRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculer l'angle de rotation basé sur la position de la souris
    const angleX = (mouseY - centerY) / 40;
    const angleY = (centerX - mouseX) / 40;
    
    if (galleryRef.current) {
      const artworkElement = galleryRef.current.querySelector('.artwork-display');
      if (artworkElement) {
        artworkElement.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      }
    }
  };

  const resetRotation = () => {
    if (galleryRef.current) {
      const artworkElement = galleryRef.current.querySelector('.artwork-display');
      if (artworkElement) {
        artworkElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    }
  };

  // Si aucune œuvre n'est chargée, afficher un message de chargement
  if (artworks.length === 0) {
    return (
      <div className="gallery-loading">
        <h2>Chargement de la galerie...</h2>
      </div>
    );
  }

  const currentArtwork = artworks[currentIndex];

  return (
    <div 
      className={`museum-gallery ${isLightMode ? 'light' : 'dark'}`}
      ref={galleryRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <div className="marble-background"></div>
      
      <div className="gallery-header">
        <Parallax offset={-30}>
          <h1 className="gallery-title">LA GALERIE OLYMPUS</h1>
        </Parallax>
      </div>
      
      <div className="museum-view">
        <button className="nav-button prev-button" onClick={goToPrevious}>
          ‹
        </button>
        
        <div className="artwork-display-container">
          <div className="artwork-display">
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
                <div className="frame-border">
                  <div className="frame-inner">
                    <img 
                      src={currentArtwork.image} 
                      alt={currentArtwork.title} 
                      className="artwork-image" 
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="artwork-plaque">
            <div className="plaque-content">
              <h2 className="artwork-title">{currentArtwork.title}</h2>
              <h3 className="artwork-creator">{currentArtwork.artist}, {currentArtwork.year}</h3>
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
      
      {/* Modal pour les détails de l'œuvre */}
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
              <p className="modal-artwork-location">{currentArtwork.location}</p>
              <p className="modal-artwork-description">{currentArtwork.description}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Éléments décoratifs inspirés de l'architecture classique */}
      <div className="decorative-column left-column"></div>
      <div className="decorative-column right-column"></div>
    </div>
  );
};

export default ProjectGallery;
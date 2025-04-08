import React, { useState, useEffect, useRef } from 'react';
import './FramedGallerySlider.css';

const artworks = [
  {
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/2800/9aef2a105305975.643a08df037b7.png',
    title: 'Silence Divin',
    description: 'Un fragment de lumière suspendu dans l’éternité céleste.'
  },
  {
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3a336f119958217.67b2bea8c64bf.jpg',
    title: 'Mémoire de l’Olympe',
    description: 'Souvenir sacré d’un paradis hors du temps.'
  },
  {
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/2800/d83245168424297.643a10cb25ee5.jpg',
    title: 'Nébuleuse de Vermeil',
    description: 'Une présence cosmique encadrée dans l’or sacré.'
  },
];

const FramedGallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  const playClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const nextArtwork = () => {
    playClick();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % artworks.length);
  };

  const prevArtwork = () => {
    playClick();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + artworks.length) % artworks.length);
  };

  const goToIndex = (index) => {
    playClick();
    setCurrentIndex(index);
  };

  return (
    <div className="gallery-wrapper">
      <audio ref={audioRef} src="/assets/audio/ui-click.mp3" preload="auto" />

      <div className="gallery-nav">
        <button onClick={prevArtwork}>&larr;</button>
        <div className="frame-container fade-in">
          <img
            src="/assets/frames/frame-square.png"
            alt="Cadre divin"
            className="frame-image"
          />
          <img
            src={artworks[currentIndex].image}
            alt={artworks[currentIndex].title}
            className="masked-art"
          />
        </div>
        <button onClick={nextArtwork}>&rarr;</button>
      </div>

      <div className="art-description">
        <h3>{artworks[currentIndex].title}</h3>
        <p>{artworks[currentIndex].description}</p>
      </div>

      <div className="pagination">
        {artworks.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default FramedGallerySlider;

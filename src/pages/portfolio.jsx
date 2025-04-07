// Portfolio.jsx mis à jour
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ProjectGallery from '../components/ProjectGallery';
import './Portfolio.css';

const Portfolio = () => {
  const { isLightMode } = useOutletContext() || { isLightMode: true };
  
  return (
    <div className="portfolio-page">
      <ProjectGallery isLightMode={isLightMode} />
    </div>
  );
};

export default Portfolio;
import React from 'react';
import './projectgallery.css';

const ProjectGallery = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="zoom-modal" onClick={onClose}>
      <div className="frame">
        <img src={project.image} alt={project.title} />
        <div className="plaque">
          <h2>{project.title}</h2>
          <h3>{project.artist}, {project.year}</h3>
          <p>{project.location}</p>
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;

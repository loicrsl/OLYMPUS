import React from 'react';

const ZoomModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="zoom-modal" onClick={onClose}>
      <img src={project.image} alt={project.title} />
      <p className="zoom-title">{project.title}</p>
    </div>
  );
};

export default ZoomModal;

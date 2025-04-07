// OverlayFX.jsx
import React from 'react';

const OverlayFX = () => {
  return (
    <div
      className="overlay-fx"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999,
        background: 'url(/assets/overlays/grain.png) repeat',
        opacity: 0.2,
        animation: 'overlayAnim 10s linear infinite'
      }}
    >
      {/* Ce conteneur peut être enrichi d'autres effets (brume, halos, etc.) via des shaders ou keyframes CSS */}
    </div>
  );
};

export default OverlayFX;

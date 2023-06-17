import React from 'react';
import '../styles/LoadingOverlay.css';

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingOverlay;
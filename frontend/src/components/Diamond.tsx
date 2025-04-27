import React from 'react';
import './Diamond.css';

export default function Diamond() {
  return (
    <div className="diamond-container" role="img" aria-label="Rotating diamond">
      <div className="diamond">
        <div className="face front" />
        <div className="face back" />
        <div className="face right" />
        <div className="face left" />
      </div>
      <div className="diamond-center">
      </div>
    </div>
  );
} 
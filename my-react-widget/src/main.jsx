import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Optional: If you have styles

// Expose a function to the global window object
window.renderMyReactWidget = (elementId, props = {}) => {
  const container = document.getElementById(elementId);

  if (container) {
    const root = createRoot(container);
    root.render(<App {...props} />);
  } else {
    console.error(`Target element #${elementId} not found.`);
  }
};


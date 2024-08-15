// src/components/Widget.js
import React from 'react';

function Widget({ widget, removeWidget }) {
  return (
    <div className="widget">
      <div className="widget-header">
        <h3>{widget.name}</h3>
        <span className="remove-widget-btn" onClick={removeWidget}>×</span>
      </div>
      <p>{widget.text}</p>
    </div>
  );
}

export default Widget;

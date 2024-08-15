// src/components/Widget.js
import React from 'react';

function Widget({ widget, removeWidget }) {
  return (
    <div className="widget">
      <h3>{widget.name}</h3>
      <p>{widget.text}</p>
      <button className="remove-widget-btn" onClick={removeWidget}>Remove</button>
    </div>
  );
}

export default Widget;

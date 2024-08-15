import React from 'react';
import './Widget.css';

function Widget({ widget, onAdd, onRemove }) {
  if (widget.type === 'empty') {
    return (
      <div className="widget empty-widget">
        <button onClick={onAdd} className="add-widget-btn">
          + Add Widget
        </button>
      </div>
    );
  }

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>{widget.name}</h3>
        <button className="remove-widget-btn" onClick={onRemove}>×</button>
      </div>
      <div className="widget-body">
        {widget.type === 'custom' && <div className="widget-custom">{widget.text}</div>}
        {/* Render other types as needed */}
      </div>
    </div>
  );
}

export default Widget;

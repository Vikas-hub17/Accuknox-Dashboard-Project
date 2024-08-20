import React from 'react';
import './Widget.css';
import donutImg from '../assests/donut.png';

function Widget({ widget, onAdd, onRemove}) {
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
        <h3>{widget.name}</h3><button onClick={onRemove}>✕</button>
      </div>
      <div className="widget-body">
        {/* Widget content based on type */}
        <img src={donutImg} alt="donut" />
        {widget.type === 'custom' && <div className="widget-custom">{widget.text}</div>}
        {/* Add other widget type renderings here */}
      </div>
    </div>
  );
}

export default Widget;

import React, { useState } from 'react';
import './AddWidgetModal.css';

function AddWidgetModal({ widgets, selectedWidgetId, onSubmit, onClose }) {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleSubmit = () => {
    if (widgetName && widgetText) {
      onSubmit({ name: widgetName, text: widgetText });
    }
  };

  const handleUncheck = (id) => {
    onSubmit({ name: '', text: '', id });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Widget</h2>
        <label>
          Widget Name:
          <input
            type="text"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            required
          />
        </label>
        <label>
          Widget Text:
          <textarea
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
            required
          />
        </label>
        <div className="widget-list">
          <h3>Existing Widgets</h3>
          {widgets.filter(widget => widget.type !== 'empty').map(widget => (
            <div key={widget.id} className="widget-item">
              <input
                type="checkbox"
                checked={widget.id === selectedWidgetId}
                onChange={() => handleUncheck(widget.id)}
              />
              <span>{widget.name}</span>
            </div>
          ))}
        </div>
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Add Widget</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddWidgetModal;

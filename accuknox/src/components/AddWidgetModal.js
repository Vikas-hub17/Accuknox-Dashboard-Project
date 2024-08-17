import React, { useState } from 'react';
import './AddWidgetModal.css';

function AddWidgetModal({ onSubmit, onClose }) {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleSubmit = () => {
    onSubmit({ name: widgetName, text: widgetText });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Widget</h2>
        <input
          type="text"
          placeholder="Widget Name"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Widget Text"
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Add Widget</button>
        </div>
      </div>
    </div>
  );
}

export default AddWidgetModal;

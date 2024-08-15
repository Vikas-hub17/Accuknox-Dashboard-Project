// src/components/WidgetSelectorModal.js
import React, { useState } from 'react';
import './WidgetSelector.css';

const widgetCategories = {
  CSPM: [
    { name: 'Cloud Accounts', id: 1 },
    { name: 'Cloud Account Risk Assessment', id: 2 }
    // Add more widgets under CSPM category here
  ],
  CWPP: [
    { name: 'Workload Alerts', id: 3 },
    { name: 'Top 5 Namespace Specific Alerts', id: 4 }
    // Add more widgets under CWPP category here
  ],
  Image: [
    { name: 'Image Risk Assessment', id: 5 },
    { name: 'Image Security Issues', id: 6 }
    // Add more widgets under Image category here
  ],
  Ticket: [
    { name: 'Open Tickets', id: 7 },
    { name: 'Closed Tickets', id: 8 }
    // Add more widgets under Ticket category here
  ]
};

function WidgetSelectorModal({ isOpen, onClose, onSave, selectedWidgets }) {
  const [activeCategory, setActiveCategory] = useState('CSPM');
  const [widgets, setWidgets] = useState(selectedWidgets || []);

  const toggleWidget = (widget) => {
    if (widgets.includes(widget)) {
      setWidgets(widgets.filter(w => w !== widget));
    } else {
      setWidgets([...widgets, widget]);
    }
  };

  const handleSave = () => {
    onSave(widgets);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Add Widget</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="tabs">
            {Object.keys(widgetCategories).map(category => (
              <button
                key={category}
                className={`tab-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="widget-options">
            {widgetCategories[activeCategory].map(widget => (
              <div key={widget.id} className="widget-option">
                <input
                  type="checkbox"
                  checked={widgets.includes(widget)}
                  onChange={() => toggleWidget(widget)}
                />
                <label>{widget.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="confirm-button" onClick={handleSave}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default WidgetSelectorModal;

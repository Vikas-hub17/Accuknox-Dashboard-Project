import React, { useState } from 'react';
import './WidgetSelectorModal.css';

function WidgetSelectorModal({ isOpen, onClose, onSave, selectedWidgets }) {
  const [selected, setSelected] = useState(selectedWidgets);

  const handleToggle = (widget) => {
    const isSelected = selected.some(w => w.id === widget.id);
    if (isSelected) {
      setSelected(selected.filter(w => w.id !== widget.id));
    } else {
      setSelected([...selected, widget]);
    }
  };

  const handleSave = () => {
    onSave(selected);
  };

  if (!isOpen) return null;

  const availableWidgets = [
    { id: 1, name: 'Cloud Accounts', type: 'pie' },
    { id: 2, name: 'Cloud Account Risk Assessment', type: 'donut' },
    { id: 3, name: 'Top 5 Namespace Specific Alerts', type: 'graph' },
    { id: 4, name: 'Workload Alerts', type: 'graph' },
    { id: 5, name: 'Image Risk Assessment', type: 'bar' },
    { id: 6, name: 'Image Security Issues', type: 'bar' },
  ];

  return (
    <div className="widget-selector-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Widget</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <div className="modal-body">
          {availableWidgets.map(widget => (
            <div key={widget.id} className="widget-option">
              <input
                type="checkbox"
                checked={selected.some(w => w.id === widget.id)}
                onChange={() => handleToggle(widget)}
              />
              <label>{widget.name}</label>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button onClick={handleSave} className="save-btn">Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default WidgetSelectorModal;

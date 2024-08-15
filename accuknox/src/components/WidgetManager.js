// src/components/WidgetManager.js
import React, { useState } from 'react';

const allWidgets = [
  { name: 'Widget 1', text: 'Random text for Widget 1' },
  { name: 'Widget 2', text: 'Random text for Widget 2' },
  { name: 'Widget 3', text: 'Random text for Widget 3' },
  // Add more widgets here as needed
];

function WidgetManager({ category, addWidget, removeWidget }) {
  const [selectedWidgets, setSelectedWidgets] = useState(
    category.widgets.map(widget => widget.name)
  );

  const handleCheckboxChange = (widget) => {
    if (selectedWidgets.includes(widget.name)) {
      setSelectedWidgets(selectedWidgets.filter(name => name !== widget.name));
      removeWidget(category.name, widget.name);
    } else {
      setSelectedWidgets([...selectedWidgets, widget.name]);
      addWidget(category.name, widget);
    }
  };

  return (
    <div className="widget-manager">
      <h3>Manage Widgets for {category.name}</h3>
      <div className="widget-list">
        {allWidgets.map(widget => (
          <div key={widget.name} className="widget-item">
            <input
              type="checkbox"
              checked={selectedWidgets.includes(widget.name)}
              onChange={() => handleCheckboxChange(widget)}
            />
            <label>{widget.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WidgetManager;

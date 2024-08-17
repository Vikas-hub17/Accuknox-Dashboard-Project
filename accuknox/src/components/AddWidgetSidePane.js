import React, { useState } from 'react';
import './AddWidgetSidePane.css';

function AddWidgetSidePane({ widgets, onSubmit, onClose }) {
  const [selectedWidgets, setSelectedWidgets] = useState({});
  
  const handleCheckboxChange = (section, widgetId, event) => {
    const widgetKey = `${section}-${widgetId}`;
    setSelectedWidgets(prevState => ({
      ...prevState,
      [widgetKey]: {
        ...widgets[section].find(widget => widget.id === widgetId),
        selected: event.target.checked
      }
    }));
  };

  const handleNameChange = (section, widgetId, event) => {
    const widgetKey = `${section}-${widgetId}`;
    setSelectedWidgets(prevState => ({
      ...prevState,
      [widgetKey]: {
        ...prevState[widgetKey],
        name: event.target.value
      }
    }));
  };

  const handleTextChange = (section, widgetId, event) => {
    const widgetKey = `${section}-${widgetId}`;
    setSelectedWidgets(prevState => ({
      ...prevState,
      [widgetKey]: {
        ...prevState[widgetKey],
        text: event.target.value
      }
    }));
  };

  const handleConfirm = () => {
    onSubmit(Object.values(selectedWidgets).filter(widget => widget.selected));
  };

  return (
    <div className="side-pane">
      <div className="side-pane-content">
        <h3>Add Widget</h3>
        <div className="tab-buttons">
          <button>CSPM</button>
          <button>CWPP</button>
          <button>Image</button>
          <button>Ticket</button>
        </div>

        <div className="widget-selection">
          {Object.keys(widgets).map(section => (
            <div key={section}>
              <h4>{section.toUpperCase()}</h4>
              {widgets[section].map(widget => (
                <div key={widget.id} className="widget-item">
                  <input 
                    type="checkbox" 
                    checked={selectedWidgets[`${section}-${widget.id}`]?.selected || false}
                    onChange={(e) => handleCheckboxChange(section, widget.id, e)} 
                  />
                  <input 
                    type="text" 
                    placeholder="Widget Name"
                    value={selectedWidgets[`${section}-${widget.id}`]?.name || widget.name}
                    onChange={(e) => handleNameChange(section, widget.id, e)} 
                  />
                  <input 
                    type="text" 
                    placeholder="Widget Text"
                    value={selectedWidgets[`${section}-${widget.id}`]?.text || ''}
                    onChange={(e) => handleTextChange(section, widget.id, e)} 
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="side-pane-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default AddWidgetSidePane;

import React, { useState } from 'react';
import Widget from './Widget';
import AddWidgetModal from './AddWidgetModal';
import './Dashborad.css';

const initialWidgets = {
  cspm: [
    { id: 1, name: 'Cloud Accounts', type: 'pie' },
    { id: 2, name: 'Cloud Account Risk Assessment', type: 'donut' },
  ],
  cwpp: [
    { id: 3, name: 'Top 5 Namespace Specific Alerts', type: 'graph' },
    { id: 4, name: 'Workload Alerts', type: 'graph' },
    { id: 5, name: '', type: 'empty' },  // Empty widget placeholder
  ],
  registry: [
    { id: 6, name: 'Image Risk Assessment', type: 'bar' },
    { id: 7, name: 'Image Security Issues', type: 'bar' },
    { id: 8, name: '', type: 'empty' },  // Empty widget placeholder
  ]
};

const allWidgets = {
  cspm: [
    { id: 1, name: 'Cloud Accounts', type: 'pie' },
    { id: 2, name: 'Cloud Account Risk Assessment', type: 'donut' },
    { id: 3, name: 'New Widget', type: 'custom' }
  ],
  cwpp: [
    { id: 4, name: 'Top 5 Namespace Specific Alerts', type: 'graph' },
    { id: 5, name: 'Workload Alerts', type: 'graph' },
    { id: 6, name: 'Another Widget', type: 'custom' }
  ],
  registry: [
    { id: 7, name: 'Image Risk Assessment', type: 'bar' },
    { id: 8, name: 'Image Security Issues', type: 'bar' },
    { id: 9, name: 'Yet Another Widget', type: 'custom' }
  ]
};


function Dashboard() {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWidgetSection, setSelectedWidgetSection] = useState('');
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);
  const [isSidePaneOpen, setIsSidePaneOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('cspm');
  const [selectedWidgets, setSelectedWidgets] = useState({
    cspm: initialWidgets.cspm.map(widget => widget.id),
    cwpp: initialWidgets.cwpp.map(widget => widget.id),
    registry: initialWidgets.registry.map(widget => widget.id),
  });

  const toggleWidgetSelection = (widgetId) => {
    setSelectedWidgets(prevSelectedWidgets => {
      const updatedWidgets = [...prevSelectedWidgets[selectedCategory]];
      const widgetIndex = updatedWidgets.indexOf(widgetId);

      if (widgetIndex > -1) {
        updatedWidgets.splice(widgetIndex, 1);
      } else {
        updatedWidgets.push(widgetId);
      }

      return { ...prevSelectedWidgets, [selectedCategory]: updatedWidgets };
    });
  };

  const handleConfirmSelection = () => {
    setIsSidePaneOpen(false);
  };

  const handleAddWidgetClick = (section, widgetId) => {
    setSelectedWidgetSection(section);
    setSelectedWidgetId(widgetId);
    setIsModalOpen(true);
  };
  const handleModalSubmit = (widgetData) => {
    const updatedSection = widgets[selectedWidgetSection].map(widget =>
      widget.id === selectedWidgetId
        ? { ...widget, ...widgetData, type: 'custom' }
        : widget
    );
    setWidgets({ ...widgets, [selectedWidgetSection]: updatedSection });
    setIsModalOpen(false);
  };

  const handleWidgetToggle = (widgetId, category) => {
    const currentWidgets = widgets[category];
    const widgetIndex = currentWidgets.findIndex(widget => widget.id === widgetId);
    if (widgetIndex > -1) {
      // Remove widget if it exists
      const updatedWidgets = currentWidgets.filter(widget => widget.id !== widgetId);
      setWidgets({ ...widgets, [category]: updatedWidgets });
    } else {
      // Add widget if it doesn't exist
      const widgetToAdd = allWidgets[category].find(widget => widget.id === widgetId);
      setWidgets({ ...widgets, [category]: [...currentWidgets, widgetToAdd] });
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">CNAPP Dashboard</h2>
        <div className="dashboard-actions">
          <button className="action-btn" onClick={() => setIsSidePaneOpen(true)}>Add Widget +</button>
          <button className="refresh-btn">⟲</button>
          <button className="menu-btn">⋮</button>
          <button className="date-filter-btn">Last 2 days ▼</button>
        </div>
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">CSPM Executive Dashboard</h3>
        <div className="widgets-grid">
          {widgets.cspm.filter(widget => selectedWidgets.cspm.includes(widget.id)).map(widget => (
            <Widget key={widget.id} widget={widget} onAdd={() => handleAddWidgetClick('cspm', widget.id)}  />
          ))}
          {widgets.cspm.filter(widget => !selectedWidgets.cspm.includes(widget.id)).map(widget => (
            <div key={widget.id} className="widget-placeholder">+ Add Widget</div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">CWPP Dashboard</h3>
        <div className="widgets-grid">
          {widgets.cwpp.filter(widget => selectedWidgets.cwpp.includes(widget.id)).map(widget => (
            <Widget key={widget.id} widget={widget} onAdd={() => handleAddWidgetClick('cspm', widget.id)} />
          ))}
          {widgets.cwpp.filter(widget => !selectedWidgets.cwpp.includes(widget.id)).map(widget => (
            <div key={widget.id} className="widget-placeholder">+ Add Widget</div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">Registry Scan</h3>
        <div className="widgets-grid">
          {widgets.registry.filter(widget => selectedWidgets.registry.includes(widget.id)).map(widget => (
            <Widget key={widget.id} widget={widget} onAdd={() => handleAddWidgetClick('cspm', widget.id)} />
          ))}
          {widgets.registry.filter(widget => !selectedWidgets.registry.includes(widget.id)).map(widget => (
            <div key={widget.id} className="widget-placeholder">+ Add Widget</div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <AddWidgetModal
          widgets={widgets}
          selectedWidgetId={selectedWidgetId}
          onSubmit={handleModalSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isSidePaneOpen && (
        <div className="side-pane">
          <div className="side-pane-header">
            <h2>Add Widget</h2>
            <button className="close-btn" onClick={() => setIsSidePaneOpen(false)}>✕</button>
          </div>
          <div className="side-pane-content">
            <nav className="widget-nav">
              {Object.keys(initialWidgets).map(category => (
                <button 
                  key={category} 
                  className={`nav-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </nav>
            <div className="widget-list">
              {widgets[selectedCategory].map(widget => (
                <label key={widget.id} className="widget-item">
                  <input 
                    type="checkbox" 
                    checked={selectedWidgets[selectedCategory].includes(widget.id)} 
                    onChange={() => handleWidgetToggle(widget.id, selectedCategory)} 
                  />
                  {widget.name}
                </label>
              ))}
            </div>
          </div>
          <div className="side-pane-footer">
            <button className="confirm-btn" onClick={handleConfirmSelection}>Confirm</button>
            <button className="cancel-btn" onClick={() => setIsSidePaneOpen(false)}>Cancel</button>
          </div>
        </div>
        
      )}
    </div>
  );
}

export default Dashboard;

import React, { useState } from 'react';
import Widget from './Widget';
import './Dashborad.css';

const initialWidgets = {
  cspm: [
    { id: 1, name: 'Cloud Accounts', type: 'pie' },
    { id: 2, name: 'Cloud Account Risk Assessment', type: 'donut' },
    { id: 3, name: '', type: 'empty' },  // Empty widget placeholder
  ],
  cwpp: [
    { id: 4, name: 'Top 5 Namespace Specific Alerts', type: 'graph' },
    { id: 5, name: 'Workload Alerts', type: 'graph' },
    { id: 6, name: '', type: 'empty' },  // Empty widget placeholder
  ],
  registry: [
    { id: 7, name: 'Image Risk Assessment', type: 'bar' },
    { id: 8, name: 'Image Security Issues', type: 'bar' },
    { id: 9, name: '', type: 'empty' },  // Empty widget placeholder
  ]
};

const allWidgets = {
  cspm: [
    { id: 1, name: 'Cloud Accounts', type: 'pie' },
    { id: 2, name: 'Cloud Account Risk Assessment', type: 'donut' },
    { id: 3, name: 'New CSPM Widget', type: 'custom' }
  ],
  cwpp: [
    { id: 4, name: 'Top 5 Namespace Specific Alerts', type: 'graph' },
    { id: 5, name: 'Workload Alerts', type: 'graph' },
    { id: 6, name: 'New CWPP Widget', type: 'custom' }
  ],
  registry: [
    { id: 7, name: 'Image Risk Assessment', type: 'bar' },
    { id: 8, name: 'Image Security Issues', type: 'bar' },
    { id: 9, name: 'New Registry Widget', type: 'custom' }
  ]
};

function Dashboard() {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [isSidePaneOpen, setIsSidePaneOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('cspm');
  const [selectedWidgetSection, setSelectedWidgetSection] = useState('');
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);

  const handleAddWidgetClick = (section, widgetId) => {
    setSelectedWidgetSection(section);
    setSelectedWidgetId(widgetId);
    setIsSidePaneOpen(true);
  };

  const handleWidgetToggle = (widgetId, section) => {
    const currentWidgets = widgets[section];
    const widgetIndex = currentWidgets.findIndex(widget => widget.id === widgetId);
    if (widgetIndex > -1) {
      // Remove widget if it exists
      const updatedWidgets = currentWidgets.filter(widget => widget.id !== widgetId);
      setWidgets({ ...widgets, [section]: updatedWidgets });
    } else {
      // Add widget if it doesn't exist
      const widgetToAdd = allWidgets[section].find(widget => widget.id === widgetId);
      setWidgets({ ...widgets, [section]: [...currentWidgets, widgetToAdd] });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddWidget = (widget) => {
    const updatedWidgets = [...widgets[selectedCategory], widget];
    setWidgets({ ...widgets, [selectedCategory]: updatedWidgets });
    setIsSidePaneOpen(false);
  };

  return (
    <div className="dashboard">
      <span className='nav'>
        Home &gt; <strong style={{ color: 'rgb(2, 2, 137)', cursor: 'pointer' }}>Dashboard V2</strong>
        <input 
          type="text" 
          placeholder="Search anything..." 
          className="search-bar" 
        />
      </span>
      
      <div className="dashboard-header">
        <h2>CNAPP Dashboard</h2>
        <div className="dashboard-actions">
          <button 
            className="action-btn" 
            onClick={handleAddWidgetClick}
          >
            Add Widget +
          </button>
          <button className="action-btn">⟲</button>
          <button className="action-btn">⋮</button>
          <button className="date-filter-btn">Last 2 days ▼</button>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>CSPM Executive Dashboard</h3>
        <div className="widgets-grid">
          {widgets.cspm.map(widget => (
            <Widget 
            key={widget.id} 
            widget={widget}
            onAdd={() => handleAddWidgetClick('cspm', widget.id)} />
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>CWPP Dashboard</h3>
        <div className="widgets-grid">
          {widgets.cwpp.map(widget => (
            <Widget 
            key={widget.id} 
            widget={widget}
            onAdd={() => handleAddWidgetClick('cspm', widget.id)} />
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Registry Scan</h3>
        <div className="widgets-grid">
          {widgets.registry.map(widget => (
            <Widget 
            key={widget.id} 
            widget={widget}
            onAdd={() => handleAddWidgetClick('cspm', widget.id)} />
          ))}
        </div>
      </div>

      {isSidePaneOpen && (
        <div className="side-pane">
          <div className="side-pane-header">
            <h3>Add Widget</h3>
            <button onClick={() => setIsSidePaneOpen(false)}>✖</button>
          </div>
          <nav className="side-pane-nav">
            <button 
              className={`nav-item ${selectedCategory === 'cspm' ? 'active' : ''}`} 
              onClick={() => handleCategoryChange('cspm')}
            >
              CSPM
            </button>
            <button 
              className={`nav-item ${selectedCategory === 'cwpp' ? 'active' : ''}`} 
              onClick={() => handleCategoryChange('cwpp')}
            >
              CWPP
            </button>
            <button 
              className={`nav-item ${selectedCategory === 'registry' ? 'active' : ''}`} 
              onClick={() => handleCategoryChange('registry')}
            >
              Registry
            </button>
          </nav>
          <div className="widget-options">
            {widgets[selectedCategory].map(widget => (
              <div key={widget.id} className="widget-option">
                <input 
                  type="checkbox" 
                  id={`widget-${widget.id}`} 
                  name={`widget-${widget.id}`}
                  onChange={() => handleAddWidget(widget)} 
                />
                <label htmlFor={`widget-${widget.id}`}>{widget.name}</label>
              </div>
            ))}
          </div>
          <button className="confirm-btn" onClick={() => setIsSidePaneOpen(false)}>Confirm</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

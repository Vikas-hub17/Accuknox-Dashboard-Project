import React, { useState } from 'react';
import Widget from './Widget';
import './Dashborad.css';


const initialWidgets = {
  cspm: [
    { id: 1, name: 'Cloud Accounts', type: 'pie', hasData: true, imgSrc: '../assests/donut.jpg'},
    { id: 2, name: 'Cloud Account Risk Assessment', type: 'donut', hasData: true, imgSrc: '../assests/donut.png'},
  ],
  cwpp: [
    { id: 4, name: 'Top 5 Namespace Specific Alerts', type: 'graph', hasData: false, imgSrc: '../assests/donut.png'},
    { id: 5, name: 'Workload Alerts', type: 'graph', hasData: false, imgSrc: '../assests/donut.png'},
  ],
  registry: [
    { id: 7, name: 'Image Risk Assessment', type: 'bar', hasData: true, imgSrc: '../assests/donut.png'},
    { id: 8, name: 'Image Security Issues', type: 'bar', hasData: true, imgSrc: '../assests/donut.png'},
  ],
};

function Dashboard() {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [isSidePaneOpen, setIsSidePaneOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('cspm');
  const [selectedWidgets, setSelectedWidgets] = useState({
    cspm: initialWidgets.cspm.map(widget => widget.id),
    cwpp: initialWidgets.cwpp.map(widget => widget.id),
    registry: initialWidgets.registry.map(widget => widget.id),
  });

  const [searchTerm, setSearchTerm] = useState('');

  // New State for Adding a Widget
  const [newWidget, setNewWidget] = useState({ name: '', description: '' });
  const [isAddingWidget, setIsAddingWidget] = useState(false);
  const [categoryForNewWidget, setCategoryForNewWidget] = useState(null);

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

  const handleAddWidgetClick = (category) => {
    setCategoryForNewWidget(category);
    setIsAddingWidget(true);
  };

  const handleWidgetInputChange = (e) => {
    setNewWidget({
      ...newWidget,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddWidgetSubmit = () => {
    const newWidgetId = new Date().getTime(); // Unique ID based on timestamp
    const updatedCategoryWidgets = [
      ...widgets[categoryForNewWidget],
      { id: newWidgetId, name: newWidget.name, description: newWidget.description, type: 'custom', hasData: true },
    ];

    setWidgets({
      ...widgets,
      [categoryForNewWidget]: updatedCategoryWidgets,
    });

    setSelectedWidgets(prevSelectedWidgets => ({
      ...prevSelectedWidgets,
      [categoryForNewWidget]: [...prevSelectedWidgets[categoryForNewWidget], newWidgetId],
    }));

    setIsAddingWidget(false);
    setNewWidget({ name: '', description: '' });
  };

  const handleRemoveWidget = (category, widgetId) => {
    setWidgets({
      ...widgets,
      [category]: widgets[category].filter(widget => widget.id !== widgetId),
    });

    setSelectedWidgets(prevSelectedWidgets => ({
      ...prevSelectedWidgets,
      [category]: prevSelectedWidgets[category].filter(id => id !== widgetId),
    }));
  };

  const filteredWidgets = {};
  Object.keys(widgets).forEach(category => {
    filteredWidgets[category] = widgets[category].filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="dashboard">
      <div className='nav-head'>
        <h5>Home &gt; Dashboard</h5>
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        </div>
      <div className="dashboard-header">
        <h2 className="dashboard-title">CNAPP Dashboard</h2>
        <div className="dashboard-actions">
          <button className="action-btn" onClick={() => setIsSidePaneOpen(true)}>Add Widget +</button>
          <button className="refresh-btn">⟲</button>
          <button className="menu-btn">⋮</button>
          <button className="date-filter-btn">Last 2 days ▼</button>
        </div>
      </div>

      {/* CSPM Section */}
      <div className="dashboard-section">
        <h3 className="section-title">CSPM Executive Dashboard</h3>
        <div className="widgets-grid">
          {filteredWidgets.cspm.filter(widget => selectedWidgets.cspm.includes(widget.id)).map(widget => (
            <Widget key={widget.id} widget={widget} onRemove={() => handleRemoveWidget('cspm', widget.id)} />
          ))}
          <div className="widget-placeholder"><button onClick={() => handleAddWidgetClick('cspm')}>+ Add Widget</button></div>
        </div>
      </div>

      {/* CWPP Section */}
      <div className="dashboard-section">
        <h3 className="section-title">CWPP Dashboard</h3>
        <div className="widgets-grid">
          {filteredWidgets.cwpp.filter(widget => selectedWidgets.cwpp.includes(widget.id)).map(widget => (
            <Widget key={widget.id} widget={widget} onRemove={() => handleRemoveWidget('cwpp', widget.id)} />
          ))}
          <div className="widget-placeholder"><button onClick={() => handleAddWidgetClick('cwpp')}>+ Add Widget</button></div>
        </div>
      </div>

      {/* Registry Section */}
      <div className="dashboard-section">
        <h3 className="section-title">Registry Scan</h3>
        <div className="widgets-grid">
          {filteredWidgets.registry.filter(widget => selectedWidgets.registry.includes(widget.id)).map(widget => (
            <Widget key={widget.id} widget={widget} onRemove={() => handleRemoveWidget('registry', widget.id)} />
          ))}
          <div className="widget-placeholder"><button onClick={() => handleAddWidgetClick('registry')}>+ Add Widget</button></div>
        </div>
      </div>

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
                    onChange={() => toggleWidgetSelection(widget.id)} 
                  />
                  {widget.name}
                </label>
              ))}
            </div>
          </div>
          <div className="side-pane-footer">
          <button className="cancel-btn" onClick={() => setIsSidePaneOpen(false)}>Cancel</button>
            <button className="confirm-btn" onClick={handleConfirmSelection}>Confirm</button>
          </div>
        </div>
      )}

      {isAddingWidget && (
        <div className="add-widget-modal">
          <div className="modal-content">
            <h2 className="modal-title">Add New Widget</h2>
            <input 
              type="text" 
              placeholder="Widget Name" 
              name="name" 
              className="input-field"
              value={newWidget.name} 
              onChange={handleWidgetInputChange} 
            />
            <input 
              type="text" 
              placeholder="Widget Description" 
              name="description" 
              className="input-field"
              value={newWidget.description} 
              onChange={handleWidgetInputChange} 
            />
            <div className="modal-actions">
              <button className="add-btn" onClick={handleAddWidgetSubmit}>Add Widget</button>
              <button className="cancel-btn" onClick={() => setIsAddingWidget(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

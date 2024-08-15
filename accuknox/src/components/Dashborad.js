import React, { useState } from 'react';
import Widget from './Widget';
import AddWidgetModal from './AddWidgetModal';
import './Dashborad.css';

const initialWidgets = [
  { id: 1, name: 'Cloud Accounts', type: 'pie' },
  { id: 2, name: 'Cloud Account Risk Assessment', type: 'donut' },
  { id: 3, name: 'Top 5 Namespace Specific Alerts', type: 'graph' },
  { id: 4, name: 'Workload Alerts', type: 'graph' },
  { id: 5, name: 'Image Risk Assessment', type: 'bar' },
  { id: 6, name: 'Image Security Issues', type: 'bar' },
  { id: 7, name: '', type: 'empty' },  // Empty widget placeholder
  { id: 8, name: '', type: 'empty' },  // Empty widget placeholder
  { id: 9, name: '', type: 'empty' },  // Empty widget placeholder
];

function Dashboard() {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);

  const handleAddWidgetClick = (widgetId) => {
    setSelectedWidgetId(widgetId);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (widgetData) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === selectedWidgetId ? { ...widget, ...widgetData, type: 'custom' } : widget
    );
    setWidgets(updatedWidgets);
    setIsModalOpen(false);
  };

  const handleRemoveWidget = (widgetId) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId ? { ...widget, name: '', type: 'empty' } : widget
    );
    setWidgets(updatedWidgets);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>CNAPP Dashboard</h2>
      </div>
      <div className="widgets-grid">
        {widgets.map(widget => (
          <Widget 
            key={widget.id} 
            widget={widget} 
            onAdd={() => handleAddWidgetClick(widget.id)}
            onRemove={() => handleRemoveWidget(widget.id)}
          />
        ))}
      </div>
      {isModalOpen && (
        <AddWidgetModal
          widgets={widgets}
          selectedWidgetId={selectedWidgetId}
          onSubmit={handleModalSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;

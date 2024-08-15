// src/components/Dashboard.js
import React, { useState } from 'react';
import WidgetSelectorModal from './WidgetSelectorModal';
import Widget from './Widget';
import '../App.css';  // Assuming you have a CSS file for Dashboard styling

// The existing widgets, components, and layout can be retained here.
const initialWidgets = [
  // Example of existing widgets, you can replace these with your actual widget components or elements
  { id: 1, name: 'Cloud Accounts', component: <Widget type="CloudAccounts" /> },
  { id: 2, name: 'Cloud Account Risk Assessment', component: <Widget type="CloudAccountRiskAssessment" /> },
  // Add your existing widgets or any default widgets here
];

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [widgets, setWidgets] = useState(initialWidgets);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveWidgets = (selectedWidgets) => {
    // Map the selected widgets to match the structure used in your existing dashboard
    const updatedWidgets = selectedWidgets.map(widget => ({
      id: widget.id,
      name: widget.name,
      component: <Widget type={widget.name.replace(/ /g, '')} />
    }));
    setWidgets(updatedWidgets);
  };

  return (
    <div className="dashboard">
      {/* Existing design elements can go here */}
      <div className="header">
        <h2>Dashboard</h2>
        <button onClick={handleOpenModal} className="add-widget-btn">+ Add Widget</button>
      </div>

      {/* Layout for displaying widgets, adjust as per your existing design */}
      <div className="widgets-grid">
        {widgets.map(widget => (
          <div key={widget.id} className="widget-container">
            {widget.component}
          </div>
        ))}
      </div>

      {/* Widget selection modal */}
      <WidgetSelectorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveWidgets}
        selectedWidgets={widgets}
      />
    </div>
  );
}

export default Dashboard;

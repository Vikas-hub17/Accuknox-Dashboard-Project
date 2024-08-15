import React from 'react';
import Widget from './Widget';

function Category({ category, addWidget, removeWidget }) {
  const handleAddWidget = () => {
    const widgetName = prompt('Enter Widget Name:');
    const widgetText = prompt('Enter Widget Text:');
    if (widgetName && widgetText) {
      addWidget(category.name, { name: widgetName, text: widgetText });
    }
  };

  return (
    <div>
      <h2>{category.name}</h2>
      <button onClick={handleAddWidget}>+ Add Widget</button>
      {category.widgets.map(widget => (
        <Widget
          key={widget.name}
          widget={widget}
          removeWidget={() => removeWidget(category.name, widget.name)}
        />
      ))}
    </div>
  );
}

export default Category;

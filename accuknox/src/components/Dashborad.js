// src/components/Dashboard.js
import React, { useState } from 'react';
import Category from './Category';
import Search from './Search';

const initialData = {
  categories: [
    {
      name: 'CSPM Executive Dashboard',
      widgets: [
        { name: 'Widget 1', text: 'Random text for Widget 1' },
        { name: 'Widget 2', text: 'Random text for Widget 2' },
      ],
    },
    {
      name: 'Another Category',
      widgets: [
        { name: 'Widget 3', text: 'Random text for Widget 3' },
      ],
    },
  ],
};

function Dashboard() {
  const [categories, setCategories] = useState(initialData.categories);
  const [searchTerm, setSearchTerm] = useState('');

  const addWidget = (categoryName, widget) => {
    setCategories(categories.map(category => {
      if (category.name === categoryName) {
        return {
          ...category,
          widgets: [...category.widgets, widget],
        };
      }
      return category;
    }));
  };

  const removeWidget = (categoryName, widgetName) => {
    setCategories(categories.map(category => {
      if (category.name === categoryName) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => widget.name !== widgetName),
        };
      }
      return category;
    }));
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="dashboard">
      <Search onSearch={setSearchTerm} />
      {filteredCategories.map(category => (
        <Category
          key={category.name}
          category={category}
          addWidget={addWidget}
          removeWidget={removeWidget}
        />
      ))}
    </div>
  );
}

export default Dashboard;

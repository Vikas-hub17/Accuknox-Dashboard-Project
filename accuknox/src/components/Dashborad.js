import React, { useState } from 'react';
import Category from './Category';

const initialData = {
  categories: [
    {
      name: "CSPM Executive Dashboard",
      widgets: [
        { name: "Widget 1", text: "Random text for Widget 1" },
        { name: "Widget 2", text: "Random text for Widget 2" }
      ]
    },
    {
      name: "Another Category",
      widgets: [
        { name: "Widget 3", text: "Random text for Widget 3" }
      ]
    }
  ]
};

function Dashboard() {
  const [categories, setCategories] = useState(initialData.categories);

  const addWidget = (categoryName, widget) => {
    setCategories(categories.map(category => {
      if (category.name === categoryName) {
        return {
          ...category,
          widgets: [...category.widgets, widget]
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
          widgets: category.widgets.filter(widget => widget.name !== widgetName)
        };
      }
      return category;
    }));
  };

  return (
    <div>
      {categories.map(category => (
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

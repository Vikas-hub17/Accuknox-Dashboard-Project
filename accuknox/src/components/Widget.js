import React from 'react';

function Widget({ widget, removeWidget }) {
  return (
    <div>
      <h3>{widget.name}</h3>
      <p>{widget.text}</p>
      <button onClick={removeWidget}>Remove Widget</button>
    </div>
  );
}

export default Widget;

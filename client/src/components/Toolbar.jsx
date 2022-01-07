import React, { useState } from 'react';

function Toolbar({ tools, setComponents }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0 }}>
      {tools.map((tool, index) => (
        <div
          key={index}
          onClick={() => {
            setComponents(tool);
          }}
        >
          {tool.icon}
        </div>
      ))}
    </div>
  );
}

export default Toolbar;

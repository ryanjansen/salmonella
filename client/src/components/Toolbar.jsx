import React, { useState } from 'react';
import styles from '../styles/Toolbar.module.css';

function Toolbar({
  tools,
  addComponent,
  setDrawMode,
  drawMode,
  setlines,
  lines,
  width,
  setWidth,
  tool,
  setTool,
  color,
  setColor,
}) {
  return (
    <div className={styles.toolbar}>
      {tools.map((tool, index) => (
        <div
          key={index}
          onClick={() => {
            addComponent(tool);
          }}
        >
          <img
            alt="editor icon"
            src={tool.icon}
            className={styles.toolbar__icon}
          />
        </div>
      ))}
      <div className={styles.toolbar__divider}></div>
    </div>
  );
}

export default Toolbar;

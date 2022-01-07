import React, { useState } from "react";
import styles from "../styles/Toolbar.module.css";
import DrawIcon from "../icons/editor-draw.png";
import ClearIcon from "../icons/editor-clear.png";
import UndoIcon from "../icons/editor-undo.png";
import EraseIcon from "../icons/editor-erase.png";
import PenIcon from "../icons/editor-pen.png";
import ColorPicker from "./ColorPicker";

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
  const [showColorPicker, setShowColorPicker] = useState(false);
  const undoHandler = () => {
    if (lines.length > 0) {
      const newlines = [...lines];
      newlines.pop();
      setlines(newlines);
    } else return;
  };
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
      <div onClick={() => setDrawMode(!drawMode)}>
        <img
          className={`${styles.toolbar__icon} ${
            drawMode ? styles.toolbar__selected : ""
          }`}
          alt="draw icon"
          src={DrawIcon}
        />
      </div>
      <div
        onClick={() => {
          if (tool === "pen") {
            setTool("eraser");
            setWidth(30);
          } else {
            setTool("pen");
            setWidth(7);
          }
        }}
      >
        <img
          className={styles.toolbar__icon}
          alt="clear icon"
          src={tool === "pen" ? PenIcon : EraseIcon}
        />
      </div>

      <div style={{ position: "relative" }}>
        <div
          onClick={() => setShowColorPicker(!showColorPicker)}
          className={styles.colorInput}
          style={{ background: color }}
        ></div>
        <ColorPicker
          color={color}
          setColor={setColor}
          show={showColorPicker}
          onClickOutside={() => setShowColorPicker(!showColorPicker)}
        />
        <div onClick={() => setlines([])}>
          <img
            className={styles.toolbar__icon}
            alt="clear icon"
            src={ClearIcon}
          />
        </div>
      </div>
      <div onClick={undoHandler}>
        <img className={styles.toolbar__icon} alt="undo icon" src={UndoIcon} />
      </div>
    </div>
  );
}

export default Toolbar;

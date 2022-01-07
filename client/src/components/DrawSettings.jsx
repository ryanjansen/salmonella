import React from "react";

export const DrawSettings = ({ setDrawMode, drawMode, setlines, lines, width, setWidth, tool, setTool, color, setColor}) => {
    const undoHandler = () => {
        if (lines.length > 0) {
            const newlines = [...lines];
            newlines.pop();
            setlines(newlines);
        }
        else return;
    }
  return (
    <div>
      <button onClick={() => setDrawMode(!drawMode)}>
        {drawMode ? "Draw mode ON" : "Draw mode OFF"}
      </button>
      <button onClick={() => setlines([])}>DELETE DRAWING</button>
      <input
        type="range"
        min="2"
        max="15"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />
      <label htmlFor="penwidth">Pen Width</label>
      <select
        id="penwidth"
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={undoHandler}>Undo</button>
    </div>
  );
};

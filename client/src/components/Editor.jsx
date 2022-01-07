import React from "react";
import EquationEditor from "./Equation/EquationEditor";
import { TextEditor } from "./TextEditor";

export const Editor = ({ selected, getAttribute, setAttribute }) => {
  const renderEditor = (type) => {
    switch (type) {
      case "text":
        return (
          <TextEditor getAttribute={getAttribute} setAttribute={setAttribute} />
        );
      case "equation":
        return (
          <EquationEditor
            getAttribute={getAttribute}
            setAttribute={setAttribute}
          />
        );
      case "shape":
        return "PLACEHOLDER";
      default:
        return "WRONG";
    }
  };

  return (
    <div style={styles.editor}>
      Currently Selected Component:
      <div>
        ID: {selected}
        <br></br>
        TYPE: {getAttribute("type")}
        <br></br>
        POSITION-X: {getAttribute("x")}
        <br></br>
        POSITION-Y: {getAttribute("y")}
      </div>
      {renderEditor(getAttribute("type"))}
    </div>
  );
};

const styles = {
  editor: {
    position: "fixed",
    top: 0,
    right: 0,
  },
};

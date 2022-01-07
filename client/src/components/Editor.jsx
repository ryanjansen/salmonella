import React from "react";
import EquationEditor from "./Equation/EquationEditor";
import { TextEditor } from "./TextEditor";
import styles from "../styles/Editor.module.css";

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
    <div className={styles.editor}>
      {selected == 0 ? (
        <div>Select a component to edit</div>
      ) : (
        <>
          <b>Attributes:</b>
          <div>
            Id: {selected}
            <br></br>
            Type: {getAttribute("type")}
            <br></br>
            Position-X: {getAttribute("x").toFixed(2)}
            <br></br>
            Position-Y: {getAttribute("y").toFixed(2)}
          </div>
          <br />
          {renderEditor(getAttribute("type"))}
        </>
      )}
    </div>
  );
};

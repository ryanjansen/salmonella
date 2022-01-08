import React from "react";
import { addStyles, EditableMathField } from "react-mathquill";
import styles from "../../styles/EquationEditor.module.css";

addStyles();

function EquationEditor({ setAttribute, getAttribute }) {
  return (
    <div className={styles.equationeditor}>
      <b>Edit:</b>
      <EditableMathField
        latex={getAttribute("latex")}
        onChange={(mathField) => {
          setAttribute("latex", mathField.latex());
        }}
        id="equation-editor"
        style={{ fontSize: 32 }}
      />
    </div>
  );
}

export default EquationEditor;

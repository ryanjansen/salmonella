import React from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';

addStyles();

function EquationEditor({ setAttribute, getAttribute }) {
  return (
    <EditableMathField
      latex={getAttribute('latex')}
      onChange={(mathField) => {
        setAttribute('latex', mathField.latex());
      }}
      id="equation-editor"
    />
  );
}

export default EquationEditor;

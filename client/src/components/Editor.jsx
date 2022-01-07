import React from 'react';
import EquationEditor from './Equation/EquationEditor';
import { TextEditor } from './TextEditor';

export const Editor = ({ selected, getAttribute, setAttribute }) => {
  const renderEditor = (type) => {
    switch (type) {
      case 'text':
        return (
          <TextEditor getAttribute={getAttribute} setAttribute={setAttribute} />
        );
      case 'equation':
        return <EquationEditor />;
      case 'shape':
        return 'PLACEHOLDER';
      default:
        return 'WRONG';
    }
  };

  return (
    <div>
      Currently Selected Component:
      <div>
        ID: {selected}
        <br></br>
        TYPE: {getAttribute('type')}
        <br></br>
        POSITION-X: {getAttribute('x')}
        <br></br>
        POSITION-Y: {getAttribute('y')}
      </div>
      {renderEditor(getAttribute('type'))}
    </div>
  );
};

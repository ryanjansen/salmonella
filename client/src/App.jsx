import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import Toolbar from './components/Toolbar';
import { Editor } from './components/Editor';
import { defaultText, defaultEquation } from './DefaultComponents';

function App() {
  const [tools, setTools] = useState([
    { icon: 'Text', component: 'text' },
    { icon: 'Equation', component: 'equation' },
  ]);
  const [selected, setSelected] = useState(-1);
  const [components, setComponents] = useState({});

  const generateRandomId = () => {
    let id = Math.floor(Math.random() * 10000);
    while (id in components) {
      id = Math.floor(Math.random() * 10000);
    }
    return id;
  };

  const getAttribute = (attribute) => {
    return components[selected][attribute];
  };

  const setAttribute = (attribute, value) => {
    const newComponents = { ...components };
    newComponents[selected] = value;
    setComponents(newComponents);
  };

  const createComponent = (type) => {
    const id = generateRandomId();
    const newComponents = { ...components };
    switch (type) {
      case 'text':
        newComponents[id] = { ...defaultText };
        break;
      case 'equation':
        newComponents[id] = { ...defaultEquation };
        break;
    }
    setComponents(newComponents);
  };

  return (
    <>
      <Editor selected={selected} />
      <Canvas
        components={components}
        setComponents={setComponents}
        setSelected={setSelected}
      />
      <Toolbar
        tools={tools}
        setComponents={(tool) => {
          createComponent(tool.component);
        }}
      ></Toolbar>
    </>
  );
}

export default App;

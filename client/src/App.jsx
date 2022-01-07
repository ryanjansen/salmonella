import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import Draw from './components/Draw';
import Toolbar from './components/Toolbar';
import { Editor } from './components/Editor';

function App() {
  const [tools, setTools] = useState([
    { icon: 'Draw', component: <Draw /> },
    { icon: 1, component: <Draw /> },
    { icon: 2, component: <Draw /> },
  ]);
  const [selected, setSelected] = useState(-1);
  const [components, setComponents] = useState({
    1: {
      type: "Text",
      text: "First",
      x: 50,
      y: 100,
      fontFamily: "Calibri",
      fontSize: 28
    },
    2: {
      type: "Text",
      text: "testing",
      x: 150,
      y: 200,
      textDecoration: "underline"
    },
    3: {
      type: "Equation"
    }
  });

  console.log('hi');

  console.log('selected tools: ', components);

  return (
    <>
      <Editor selected={selected} />
      <Canvas components={components} setComponents={setComponents} setSelected={setSelected}/>
      <Toolbar
        tools={tools}
        setComponents={(tool) => {
          setComponents([...components, tool]);
        }}
      ></Toolbar>
    </>
  );
}

export default App;

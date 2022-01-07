import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import Draw from './components/Draw';
import Toolbar from './components/Toolbar';

function App() {
  const [tools, setTools] = useState([
    { icon: 'Draw', component: <Draw /> },
    { icon: 1, component: <Draw /> },
    { icon: 2, component: <Draw /> },
  ]);
  const [components, setComponents] = useState({
    1: {
      type: "Text",
      text: "First",
      x: 50,
      y: 100
    },
    2: {
      type: "Text",
      text: "testing",
      x: 150,
      y: 200
    }
  });

  console.log('hi');

  console.log('selected tools: ', components);

  return (
    <>
      <Canvas components={components} />
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

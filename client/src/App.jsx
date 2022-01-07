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
  const [selectedTools, setSelectedTools] = useState([]);

  console.log('selected tools: ', selectedTools);

  return (
    <>
      <Canvas selectedTools={selectedTools} />
      <Toolbar
        tools={tools}
        setSelectedTools={(tool) => {
          setSelectedTools([...selectedTools, tool]);
        }}
      ></Toolbar>
    </>
  );
}

export default App;

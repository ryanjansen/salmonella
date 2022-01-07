import React, { useState, useEffect } from "react";
import Canvas from "./Canvas";
import Toolbar from "./components/Toolbar";
import { Editor } from "./components/Editor";
import { defaultText, defaultEquation } from "./DefaultComponents";

function App() {
  const [tools, setTools] = useState([
    { icon: "Text", component: "text" },
    { icon: "Equation", component: "equation" },
  ]);
  const [selected, setSelected] = useState(1);
  const [components, setComponents] = useState({
    1: {
      type: "text",
      text: "First",
      x: 50,
      y: 100,
      fontFamily: "Calibri",
      fontSize: 28,
    },
    2: {
      type: "text",
      text: "testing",
      x: 150,
      y: 200,
      textDecoration: "underline",
    },
    3: {
      type: "equation",
      latex: "x = y",
      x: 300,
      y: 400,
    },
  });

  const generateRandomId = () => {
    let id = Math.floor(Math.random() * 10000);
    while (id in components) {
      id = Math.floor(Math.random() * 10000);
    }
    return id;
  };

  const getAttribute = (attribute) => {
    console.log(components[selected]["type"]);
    return components[selected][attribute];
  };

  const setAttribute = (attribute, value) => {
    const newComponents = { ...components };
    newComponents[selected][attribute] = value;
    setComponents(newComponents);
  };

  const createComponent = (type) => {
    const id = generateRandomId();
    const newComponents = { ...components };
    switch (type) {
      case "text":
        newComponents[id] = Object.assign({}, defaultText);
        break;
      case "equation":
        newComponents[id] = Object.assign({}, defaultEquation);
        break;
    }
    // Focus new component
    setSelected(id);
    setComponents(newComponents);
  };

  return (
    <>
      <Editor selected={selected} getAttribute={getAttribute} setAttribute={setAttribute}/>
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

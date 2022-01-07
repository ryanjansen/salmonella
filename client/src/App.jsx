import React, { useState, useEffect, useRef } from "react";
import Canvas from "./Canvas";
import Toolbar from "./components/Toolbar";
import { Editor } from "./components/Editor";
import { defaultText, defaultEquation } from "./DefaultComponents";
import EditorTextIcon from "./icons/editor-text.png";
import EditorEquationIcon from "./icons/editor-equation.png";

const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => {
      savedHandler.current(event);
    };
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

function App() {
  const [tools, setTools] = useState([
    { icon: EditorTextIcon, component: "text" },
    { icon: EditorEquationIcon, component: "equation" },
  ]);
  const [selected, setSelected] = useState(0);
  const [components, setComponents] = useState({
    0: {
      // unselected
    },
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
  });

  const deleteSelectedHandler = ({ key }) => {
    if (["46", "Delete"].includes(String(key))) {
      deleteSelectedComponent();
    }
  };

  useEventListener("keydown", deleteSelectedHandler);

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
    newComponents[selected][attribute] = value;
    setComponents(newComponents);
  };

  const createComponent = (type) => {
    const id = generateRandomId();
    const newComponents = { ...components };
    switch (type) {
      case "text":
        newComponents[id] = { ...defaultText };
        break;
      case "equation":
        newComponents[id] = { ...defaultEquation };
        break;
    }
    // Focus new component
    setSelected(id);
    setComponents(newComponents);
  };

  const deleteSelectedComponent = () => {
    if (selected == 0) return;

    const newComponents = { ...components };
    delete newComponents[`${selected}`];
    setSelected(0);
    setComponents(newComponents);
  };

  return (
    <>
      <Canvas
        components={components}
        setComponents={setComponents}
        setSelected={setSelected}
        unselectComponentHandler={() => setSelected(0)}
        tools={tools}
        addComponent={(tool) => {
          createComponent(tool.component);
        }}
      />
      <Editor
        selected={selected}
        getAttribute={getAttribute}
        setAttribute={setAttribute}
      />
    </>
  );
}

export default App;

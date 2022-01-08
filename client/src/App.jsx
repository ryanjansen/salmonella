import React, { useState, useEffect, useRef } from "react";
import Canvas from "./Canvas";
import Toolbar from "./components/Toolbar";
import { Editor } from "./components/Editor";
import {
  defaultText,
  defaultEquation,
  defaultAnimation,
} from "./DefaultComponents";
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
  useEffect(() => {
    async function sleep(time) {
      await new Promise((r) => setTimeout(r, time));
    }
    if (localStorage.getItem("components") === null) {
      localStorage.setItem(
        "components",
        JSON.stringify({
          0: {},
        })
      );
    }
    /*
    for (const [id, obj] of Object.entries(components)) {
      setSelected(id);
    }
    */
  }, []);

  useEffect(() => {
    setTimeout(
      () =>
        Object.entries(components).forEach(([key, component]) => {
          setSelected(key);
        }),
      700
    );
  }, []);
  const [components, setComponents] = useState(
    JSON.parse(localStorage.getItem("components")) ?? { 0: {} }
  );
  useEffect(() => {
    localStorage.setItem("components", JSON.stringify(components));
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
    setComponents(newComponents);
    setSelected(id);
  };

  const deleteSelectedComponent = () => {
    if (selected == 0) return;

    const newComponents = { ...components };
    delete newComponents[`${selected}`];
    setSelected(0);
    setComponents(newComponents);
  };

  // Keyboard Shortcuts

  // shift + f - focus mode
  const [focusMode, setFocusMode] = React.useState(false);

  const focusModeHandler = (e) => {
    //e.preventDefault();
    if ((e.shiftKey) && e.code == "KeyF") {
      setFocusMode(!focusMode);
    }
  }
  useEventListener('keydown', focusModeHandler);

  const quickCreateHandler = (e) => {
    if (e.shiftKey && e.ctrlKey && e.code == "KeyT") {
      createComponent("text");
    } else if (e.shiftKey && e.ctrlKey && e.code == "KeyE") {
      createComponent("equation");
    }
  }
  useEventListener('keydown', quickCreateHandler);



  return (
    <>
      <Canvas
        components={components}
        setComponents={setComponents}
        selected={selected}
        setSelected={setSelected}
        unselectComponentHandler={() => setSelected(0)}
        tools={tools}
        addComponent={(tool) => {
          createComponent(tool.component);
        }}
        focusMode={focusMode}
      />
      {!focusMode ?
      <Editor
        selected={selected}
        getAttribute={getAttribute}
        setAttribute={setAttribute}
      />
      : null
      }
    </>
  );
}

export default App;

import React, { useRef, useEffect } from "react";
import { Stage, Layer, Text, Line, Transformer } from "react-konva";
import {
  getDistance,
  getCenter,
  isTouchEnabled,
} from "./utils/StageZoomHandlers";
import EquationImage from "./components/Equation/EquationImage";
import TextComponent from "./components/TextComponent";
import { DrawSettings } from "./components/DrawSettings";
import { DivideAnim } from "./components/Animations/DivideAnim";
import { Video } from "./components/Animations/Video";
import Toolbar from "./components/Toolbar";
import styles from "./styles/Canvas.module.css";

const scaleBy = 1.04;

function Canvas({
  tools,
  addComponent,
  components,
  setComponents,
  selected,
  setSelected,
  unselectComponentHandler,
}) {
  const stageRef = useRef(null);
  let lastCenter = null;
  let lastDist = 0;

  function zoomStage(event, stageRef) {
    event.evt.preventDefault();
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale =
        event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
    }
  }

  function handleTouch(e) {
    e.evt.preventDefault();
    var touch1 = e.evt.touches[0];
    var touch2 = e.evt.touches[1];
    const stage = stageRef.current;
    if (stage !== null) {
      if (touch1 && touch2) {
        if (stage.isDragging()) {
          stage.stopDrag();
        }

        var p1 = {
          x: touch1.clientX,
          y: touch1.clientY,
        };
        var p2 = {
          x: touch2.clientX,
          y: touch2.clientY,
        };

        if (!lastCenter) {
          lastCenter = getCenter(p1, p2);
          return;
        }
        var newCenter = getCenter(p1, p2);

        var dist = getDistance(p1, p2);

        if (!lastDist) {
          lastDist = dist;
        }

        // local coordinates of center point
        var pointTo = {
          x: (newCenter.x - stage.x()) / stage.scaleX(),
          y: (newCenter.y - stage.y()) / stage.scaleX(),
        };

        var scale = stage.scaleX() * (dist / lastDist);

        stage.scaleX(scale);
        stage.scaleY(scale);

        // calculate new position of the stage
        var dx = newCenter.x - lastCenter.x;
        var dy = newCenter.y - lastCenter.y;

        var newPos = {
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy,
        };

        stage.position(newPos);
        stage.batchDraw();

        lastDist = dist;
        lastCenter = newCenter;
      }
    }
  }

  function handleTouchEnd() {
    lastCenter = null;
    lastDist = 0;
  }

  const handleDragStart = (e) => {
    const id = e.target.id();
    const newComponents = { ...components };
    newComponents[id].isDragging = true;
    setComponents(newComponents);
  };

  const handleDragEnd = (e) => {
    const id = e.target.id();
    const newComponents = { ...components };
    const currentComponent = newComponents[id];
    currentComponent.x = e.target.x();
    currentComponent.y = e.target.y();
    currentComponent.isDragging = false;
    setComponents(newComponents);
  };

  const handleTransformEnd = ({ id, x, y, width, height }) => {
    const newComponents = { ...components };
    const currentComponent = newComponents[id];
    currentComponent.x = x;
    currentComponent.y = y;
    currentComponent.width = width;
    currentComponent.height = height;
    setComponents(newComponents);
  };

  const handleDblClick = (e) => {
    if (e.evt.defaultPrevented) return;
    e.evt.preventDefault();
    setSelected(e.target.id());
  };

  // Drawing
  const [tool, setTool] = React.useState('pen');
  const [lines, setlines] = React.useState(JSON.parse(localStorage.getItem('lines')) ?? []);
  const [width, setWidth] = React.useState(7);
  const [color, setColor] = React.useState("#df4b26");
  const isDrawing = React.useRef(false);
  useEffect(()=> {
    localStorage.setItem('lines', JSON.stringify(lines));
  })

  function getRelativePointerPosition(node) {
    // the function will return pointer position relative to the passed node
    var transform = node.getAbsoluteTransform().copy();
    // to detect relative position we need to invert transform
    transform.invert();

    // get pointer (say mouse or touch) position
    var pos = node.getStage().getPointerPosition();

    // now we find a relative point
    return transform.point(pos);
  }
  const drawMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    //const point = stage.getPointerPosition();
    const point = getRelativePointerPosition(stage);
    let lastline = lines[lines.length - 1];
    lastline.points = lastline.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastline);
    setlines(lines.concat());
  };

  const drawMouseDown = (e) => {
    isDrawing.current = true;
    //const pos = e.target.getStage().getPointerPosition();
    const pos = getRelativePointerPosition(e.target.getStage());
    setlines([
      ...lines,
      { tool, width: width, color: color, points: [pos.x, pos.y] },
    ]);
  };

  const drawMouseUp = () => {
    isDrawing.current = false;
  };

  const [drawMode, setDrawMode] = React.useState(false);

  const handleMouseDown = (e) => {
    if (e.evt.defaultPrevented) return;
    e.evt.preventDefault();
  };

  const renderComponent = (id, component) => {
    const isSelected = id == selected && id != 0;

    switch (component.type) {
      case "text":
        return (
          <TextComponent
            isSelected={isSelected}
            id={id}
            key={id}
            draggable={true}
            isDragging={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDblClick={handleDblClick}
            onMouseDown={handleMouseDown}
            handleTransformEnd={handleTransformEnd}
            text={component.text ?? "text"}
            x={component.x}
            y={component.y}
            fontFamily={component.fontFamily ?? "Arial"}
            fontSize={component.fontSize ?? 12}
            fontStyle={component.fontStyle ?? "normal"}
            textDecoration={component.textDecoration ?? ""}
            fill={component.fill ?? "black"}
            width={component.width ?? null}
            height={component.height ?? null}
          />
        );

      case "equation":
        return (
          <EquationImage
            isSelected={isSelected}
            key={id}
            latex={component.latex}
            id={id}
            draggable
            x={component.x}
            y={component.y}
            isDragging={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDblClick={handleDblClick}
            onMouseDown={handleMouseDown}
            handleTransformEnd={handleTransformEnd}
            width={component.width ?? null}
            height={component.height ?? null}
          />
        );
    }
  };

  const deselectMouseDown = (e) => {
    if (e.evt.defaultPrevented) return;
    if (e.target === e.target.getStage()) {
      e.evt.preventDefault();
      unselectComponentHandler();
    }
  };

  return (
    <div>
      <Toolbar
        tools={tools}
        addComponent={addComponent}
        setDrawMode={setDrawMode}
        setlines={setlines}
        lines={lines}
        setWidth={setWidth}
        setTool={setTool}
        setColor={setColor}
        drawMode={drawMode}
        width={width}
        tool={tool}
        color={color}
      />
      <Stage
        className={`${
          drawMode
            ? tool === "pen"
              ? styles.penCursor
              : styles.eraseCursor
            : ""
        }`}
        width={window.innerWidth}
        height={window.innerHeight}
        draggable={!isTouchEnabled() && !drawMode}
        onWheel={(event) => zoomStage(event, stageRef)}
        onTouchMove={drawMode ? null : handleTouch}
        onTouchEnd={drawMode ? null : handleTouchEnd}
        ref={stageRef}
        onMouseDown={drawMode ? drawMouseDown : deselectMouseDown}
        onMouseMove={drawMode ? drawMouseMove : null}
        onMouseUp={drawMode ? drawMouseUp : null}
      >
        <Layer>
          {Object.entries(components).map(([id, component]) => {
            return renderComponent(id, component);
          })}
          <Text text="dwebug" onMouseDown={(e) => console.log(components)} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.width}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
/*
          <Video src="https://i.imgur.com/keWs2pk.mp4"/>
          
        </Layer>
        <DivideAnim />
*/

export default Canvas;

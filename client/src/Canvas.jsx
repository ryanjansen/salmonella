import React, { useRef } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import TextComponent from './components/Text/TextComponent';
import {
  getDistance,
  getCenter,
  isTouchEnabled,
} from './utils/StageZoomHandlers';

const scaleBy = 1.04;

function Canvas({ components, setComponents, setSelected }) {
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

  const onDblClick = (key) => {
    setSelected(key);
  };

  const renderComponent = (id, component) => {
    switch (component.type) {
      case 'text':
        return (
          <Text
            key={id}
            id={id}
            draggable={true}
            isDragging={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDblClick={() => onDblClick(id)}
            text={component.text ?? 'text'}
            x={component.x}
            y={component.y}
            fontFamily={component.fontFamily ?? 'Arial'}
            fontSize={component.fontSize ?? 12}
            fontStyle={component.fontStyle ?? 'normal'}
            textDecoration={component.textDecoration ?? ''}
            fill={component.fill ?? 'black'}
          />
        );
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={!isTouchEnabled()}
      onWheel={(event) => zoomStage(event, stageRef)}
      onTouchMove={handleTouch}
      onTouchEnd={handleTouchEnd}
      ref={stageRef}
    >
      <Layer>
        {Object.entries(components).map(([id, component]) => {
          console.log(id);
          console.log(component);
          return renderComponent(id, component);
        })}
      </Layer>
    </Stage>
  );
}

export default Canvas;

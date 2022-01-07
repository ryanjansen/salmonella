import React from "react";
import { Stage, Layer, Text } from "react-konva";

const scaleBy = 1.01;

function Canvas({ components }) {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight} draggable>
      <Layer>
        {Object.entries(components).map(([key, value]) => {
          switch (value.type) {
            case "Text":
              return (
                <Text key={key} text={value.text} x={value.x} y={value.y} />
              );
            default:
              return <Text text="Wrong" />;
          }
        })}
      </Layer>
    </Stage>
  );
}

export default Canvas;

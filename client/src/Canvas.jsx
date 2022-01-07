import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import Draw from './components/Draw';

function Canvas({ components }) {

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>{Object.entries(components).map(([key, value]) => {
        switch (value.type) {
          case "Text":
            return <Text
              key={key}
              text={value.text}
              x={value.x}
              y={value.y}
            />
          default:
            return <Text
            text="Wrong"
            />
        }

      })}</Layer>
    </Stage>
  );
}

export default Canvas;

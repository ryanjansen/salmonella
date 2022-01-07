import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

function Canvas() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={20}
          y={20}
          width={50}
          height={50}
          fill={Konva.Util.getRandomColor()}
        />
      </Layer>
    </Stage>
  );
}

export default Canvas;
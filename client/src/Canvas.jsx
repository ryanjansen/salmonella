import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import Draw from './components/Draw';

function Canvas({ selectedTools }) {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>{selectedTools.map((tool) => tool.component)}</Layer>
    </Stage>
  );
}

export default Canvas;

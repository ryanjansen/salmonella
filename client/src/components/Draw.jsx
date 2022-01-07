import React, { useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';

function Draw() {
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  return (
    <Text
      text="Draggable Text"
      x={x}
      y={y}
      draggable
      fill={isDragging ? 'green' : 'black'}
      onDragStart={() => {
        setIsDragging(true);
      }}
      onDragEnd={(e) => {
        setIsDragging(false);
        setX(e.target.x());
        setY(e.target.y());
      }}
    />
  );
}

export default Draw;

import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { Image } from 'react-konva';

function EquationImage({
  id,
  latex,
  isDragging,
  onDragStart,
  onDragEnd,
  onDblClick,
  onMouseDown,
  x,
  y,
}) {
  const [image, setImage] = useState(null);

  const generateEquation = () => {
    const equationNode = document.querySelector('.mq-root-block');
    console.log(equationNode);
    html2canvas(equationNode, {
      backgroundColor: 'rgba(0,0,0,0)',
    })
      .then((canvas) => {
        setImage(canvas);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    generateEquation()
  }, [])

  useEffect(() => {
    const timeoutID = setTimeout(() => generateEquation(), 500);
    return () => clearTimeout(timeoutID);
  }, [latex]);

  return (
    <Image
      key={id}
      id={id}
      isDragging={isDragging}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDblClick={onDblClick}
      onMouseDown={onMouseDown}
      x={x}
      y={y}
      image={image}
      draggable
    />
  );
}

export default EquationImage;

import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Image, Transformer } from "react-konva";

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
  isSelected,
  handleTransformEnd,
  width,
  height,
}) {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && id != 0) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const [image, setImage] = useState(null);

  const generateEquation = () => {
    const equationNode = document.querySelector(".mq-root-block");

    html2canvas(equationNode, {
      backgroundColor: "rgba(0,0,0,0)",
    })
      .then((canvas) => {
        setImage(canvas);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    generateEquation();
  }, []);

  useEffect(() => {
    const timeoutID = setTimeout(() => generateEquation(), 500);
    return () => clearTimeout(timeoutID);
  }, [latex]);

  return (
    <>
      <Image
        ref={shapeRef}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);

          handleTransformEnd({
            id,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
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
        width={width}
        height={height}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}

export default EquationImage;

import React, { useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

function TextComponent({
  isSelected,
  id,
  draggable,
  isDragging,
  onDragStart,
  onDragEnd,
  onDblClick,
  onMouseDown,
  text,
  x,
  y,
  fontFamily,
  fontSize,
  fontStyle,
  textDecoration,
  fill,
  width,
  height,
  handleTransformEnd,
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

  return (
    <>
      <Text
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
        id={id}
        draggable={draggable}
        isDragging={isDragging}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDblClick={onDblClick}
        onMouseDown={onMouseDown}
        text={text}
        x={x}
        y={y}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontStyle={fontStyle}
        textDecoration={textDecoration}
        fill={fill}
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

export default TextComponent;

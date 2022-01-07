import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import Draw from './components/Draw';

function Canvas({ components, setComponents, setSelected }) {

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>{Object.entries(components).map(([key, value]) => {
        switch (value.type) {
          case "Text":
            return <Text
              // Mandatory - Key, Draggable
              key={key}
              draggable={true}
              isDragging={false}
              onDragStart={()=>{
                const newcomps = Object.assign({}, components); 
                const newtext = Object.assign({}, newcomps.key);
                newtext.isDragging = true;
                newcomps.key = newtext;
                setComponents(newcomps);
              }}
              onDragEnd={(e)=>{
                const newcomps = Object.assign({}, components);
                const newtext = Object.assign({}, newcomps.key);
                newtext.isDragging = false;
                newtext.x = e.target.x();
                newtext.y = e.target.y();
                newcomps.key = newtext;
                setComponents(newcomps);
              }}
              onMouseDown={()=>setSelected(key)}
              // Optionals
              text={value.text != null ? value.text : ""}
              x={value.x != null ? value.x : 100}
              y={value.y != null ? value.y : 100}
              fontFamily={value.fontFamily != null ? value.fontFamily : "Arial"}
              fontSize={value.fontSize != null ? value.fontSize : 12}
              fontStyle={value.fontStyle != null ? value.fontStyle : "normal"}
              textDecoration={value.textDecoration != null ? value.textDecoration : ""}
              fill={value.fill != null ? value.fill : "black"}
            />
          case "Equation":
            return <Text
            text="Wrong"
            />
          case "Image":
            break
        }

      })}</Layer>
    </Stage>
  );
}

export default Canvas;

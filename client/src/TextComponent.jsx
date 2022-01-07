import React from "react";
import { Text } from "react-konva";

export const TextComponent = (props) => {

    const [att, setatt] = React.useState({
        text: props.text,
        isDragging: false,
        x: props.x,
        y: props.y,
        fontFamily: props.fontFamily != null ? props.fontFamily : "Arial",
        fontSize: props.fontSize != null ? props.fontSize : 12,
        fontStyle: props.fontStyle != null ? props.fontStyle : "normal",
        textDecoration: props.textDecoration != null ? props.textDecoration : "",
        fill: props.fill != null ? props.fill : "black"
    });

    return (
        <Text 
            text={att.text}
            x={att.x}
            y={att.y}
            draggable
            onDragStart={()=>{
                const newatt = Object.assign({}, att);
                newatt.isDragging = true;
                setatt(newatt);
            }}
            onDragEnd={(e)=>{
                const newatt = Object.assign({}, att);
                newatt.isDragging = false;
                newatt.x = e.target.x();
                newatt.y = e.target.y();
                console.log(newatt.x);
                setatt(newatt);
            }}
            onMouseDown={()=> {
                const newatt = Object.assign({}, att);
                newatt.fontStyle = newatt.fontStyle == "normal" ? "bold" : "normal";
                setatt(newatt);
            }}
            fontFamily={att.fontFamily}
            fontSize={att.fontSize}
            fontStyle={att.fontStyle}
            textDecoration={att.textDecoration}
            fill={att.fill}
        />
    );
}
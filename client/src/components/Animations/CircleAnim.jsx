import React from "react";
import { Circle, Stage, Layer } from "react-konva";

export const CircleAnim = ({ props }) => {
    const changeLoc = (circle, params) => {
        circle.to(params);
    }

        return (
            <Circle
                x={props.x}
                y={props.y}
                radius={props.radius}
                fill={props.fill}
             />
        )

}
import React from "react";
import { Text, Layer} from "react-konva";

// Display all texts
export const TextComp = (props) => {

    return (
        <Layer>
            {props.texts.map((item) => {
                return <Text
                    key={item.id}
                    text={item.text}
                    draggable={true}
                    fontFamily={item.fontFamily}
                    x={100}
                    y={20*(item.id + 1)}
                />
            })}
        </Layer>
    );

    
}
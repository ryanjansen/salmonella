import React from "react";
import { Text, Layer } from "react-konva";

export const TextInput = (props) => {

    const [input, setInput] = React.useState("");

    const updateState = (object) => {
        const oldTexts = props.texts.slice();
        object.id = oldTexts.length;
        oldTexts.push(object);
        console.log(oldTexts);
        props.setTexts(oldTexts);
    }

    return (
        <div>
            <input onChange={event => setInput(event.target.value)}>
            </input>
            <button onClick={() => {
                updateState(
                    {
                        text: input,
                    }
                )
            }}>
                Add Text
            </button>
        </div>
    )

};

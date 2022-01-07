import React from "react";
import { EquationEditor } from "./EquationEditor";
import { TextEditor } from "./TextEditor";

export const Editor = ({selected, getAttribute, setAttribute}) => {
    const renderEditor = (type) => {
        switch (type) {
            case "Text":
                return <TextEditor getAttribute={getAttribute} setAttribute={setAttribute}/>
            case "Equation":
                return <EquationEditor />
            case "Shape":
                return "PLACEHOLDER" 
            default:
                return "WRONG" 
        }
    }

    return (
        <div>
            Currently Selected Component:
            <div>
                ID: {selected}
                <br></br>
                TYPE: {getAttribute("type")}
                <br></br>
                POSITION-X: {getAttribute("x")}
                <br></br>
                POSITION-Y: {getAttribute("y")}
            </div>
            {renderEditor(getAttribute("type"))}
            
        </div>
    );
}
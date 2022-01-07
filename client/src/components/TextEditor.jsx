import React from "react";

export const TextEditor = ({ getAttribute, setAttribute }) => {
    const boldbut = () => {
        const current = getAttribute("fontStyle");
        switch (current) {
            case "normal":
                return "bold";
            case "bold":
                return "normal"
            case "italic":
                return "italic bold"
            case "italic bold":
                return "italic"
            default:
                return "bold"
        }
    }
    const italicbut = () => {
        const current = getAttribute("fontStyle");
        switch (current) {
            case "normal":
                return "italic";
            case "bold":
                return "italic bold";
            case "italic":
                return "normal"
            case "italic bold":
                return "bold"
            default:
                return "italic"
        }
    }

    return (
        <div>
            TEXT EDITOR
            <input value={getAttribute("text")} onChange={(e)=>setAttribute("text", e.target.value)}></input>
            <button onClick = {()=> setAttribute("fontStyle", boldbut())}>BOLD</button>
            <button onClick = {()=> setAttribute("fontStyle", italicbut())}>ITALIC</button>
            <label htmlFor="fontsize">FONT SIZE</label>
            <input id="fontsize" type="number" 
                value={getAttribute("fontSize") != null ? getAttribute("fontSize") : 12}
                onChange={(e)=>setAttribute("fontSize", e.target.value)}
            ></input>
            <label htmlFor="fontfamily">FONT FAMILY</label>
            <input id="fontfamily" type="text"
                value={getAttribute("fontFamily") != null ? getAttribute("fontFamily") : "Arial"}
                onChange={(e)=>setAttribute("fontFamily", e.target.value)}
            ></input>

        </div>
    )
}
import React from "react";
import BoldButton from "../icons/bold.svg";
import ItalicsButton from "../icons/italics.svg";
import StrikeThroughButton from "../icons/strikethrough.svg";
import UnderlineButton from "../icons/underline.svg";

export const TextEditor = ({ getAttribute, setAttribute }) => {
  const boldbut = () => {
    const current = getAttribute("fontStyle");
    switch (current) {
      case "normal":
        return "bold";
      case "bold":
        return "normal";
      case "italic":
        return "italic bold";
      case "italic bold":
        return "italic";
      default:
        return "bold";
    }
  };
  const italicbut = () => {
    const current = getAttribute("fontStyle");
    switch (current) {
      case "normal":
        return "italic";
      case "bold":
        return "italic bold";
      case "italic":
        return "normal";
      case "italic bold":
        return "bold";
      default:
        return "italic";
    }
  };
  const decbut = (type) => {
    const current = getAttribute("textDecoration");
    switch (current) {
      case "":
        return type;
      case "underline":
        return type.valueOf() === "underline" ? "" : "underline line-through";
      case "line-through":
        return type.valueOf() === "line-through"
          ? ""
          : "underline line-through";
      case "underline line-through":
        return type.valueOf() === "underline" ? "line-through" : "underline";
      default:
        return type;
    }
  };

  return (
    <div style={styles.textEditor}>
      TEXT EDITOR
      <input
        value={getAttribute("text")}
        onChange={(e) => setAttribute("text", e.target.value)}
      ></input>
      <div style={styles.quickButtons}>
        <button
          style={
            getAttribute("fontStyle").includes("bold")
              ? styles.quickButtonActive
              : styles.quickButton
          }
          onClick={() => setAttribute("fontStyle", boldbut())}
        >
          <img src={BoldButton} alt="Bold Button"></img>
        </button>
        <button
          style={
            getAttribute("fontStyle").includes("italic")
              ? styles.quickButtonActive
              : styles.quickButton
          }
          onClick={() => setAttribute("fontStyle", italicbut())}
        >
          <img src={ItalicsButton} alt="Italics Button"></img>
        </button>
        <button
          style={
            getAttribute("textDecoration").includes("underline")
              ? styles.quickButtonActive
              : styles.quickButton
          }
          onClick={() => setAttribute("textDecoration", decbut("underline"))}
        >
          <img src={UnderlineButton} alt="Underline Button"></img>
        </button>
        <button
          style={
            getAttribute("textDecoration").includes("line-through")
              ? styles.quickButtonActive
              : styles.quickButton
          }
          onClick={() => setAttribute("textDecoration", decbut("line-through"))}
        >
          <img src={StrikeThroughButton} alt="Strikethrough Button"></img>
        </button>
      </div>
      <label htmlFor="fontsize">FONT SIZE</label>
      <input
        id="fontsize"
        type="number"
        value={getAttribute("fontSize") != null ? getAttribute("fontSize") : 12}
        onChange={(e) => setAttribute("fontSize", e.target.value)}
      ></input>
      <label htmlFor="fontfamily">FONT FAMILY</label>
      <input
        id="fontfamily"
        type="text"
        value={
          getAttribute("fontFamily") != null
            ? getAttribute("fontFamily")
            : "Arial"
        }
        onChange={(e) => setAttribute("fontFamily", e.target.value)}
      ></input>
    </div>
  );
};

const styles = {
  textEditor: {
    display: "flex",
    flexDirection: "column",
  },
  quickButtons: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  quickButton: {
    backgroundColor: "white",
    borderRadius: "5px",
  },
  quickButtonActive: {
    backgroundColor: "AliceBlue",
  },
};

import React from "react";
import BoldButton from "../icons/bold.svg";
import ItalicsButton from "../icons/italics.svg";
import StrikeThroughButton from "../icons/strikethrough.svg";
import UnderlineButton from "../icons/underline.svg";
import styles from "../styles/TextEditor.module.css";

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
    <div className={styles.texteditor}>
      <b>Edit:</b>
      <div className={styles.inputGroup}>
        <label htmlFor="text">Text: </label>
        <input
          id="text"
          value={getAttribute("text")}
          onChange={(e) => setAttribute("text", e.target.value)}
        ></input>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="fontsize">Font-Size: </label>
        <input
          id="fontsize"
          type="number"
          value={
            getAttribute("fontSize") != null ? getAttribute("fontSize") : 12
          }
          onChange={(e) => setAttribute("fontSize", e.target.value)}
        ></input>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="fontfamily">Font-Family: </label>
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
      <div className={styles.texteditor__quickButtons}>
        <img
          className={
            getAttribute("fontStyle")?.includes("bold")
              ? styles.texteditor__quickButtonActive
              : styles.texteditor__quickButton
          }
          onClick={() => setAttribute("fontStyle", boldbut())}
          src={BoldButton}
          alt="Bold Button"
        />
        <img
          className={
            getAttribute("fontStyle")?.includes("italic")
              ? styles.texteditor__quickButtonActive
              : styles.texteditor__quickButton
          }
          onClick={() => setAttribute("fontStyle", italicbut())}
          src={ItalicsButton}
          alt="Italics Button"
        />
        <img
          className={
            getAttribute("textDecoration")?.includes("underline")
              ? styles.texteditor__quickButtonActive
              : styles.texteditor__quickButton
          }
          onClick={() => setAttribute("textDecoration", decbut("underline"))}
          src={UnderlineButton}
          alt="Underline Button"
        />
        <img
          className={
            getAttribute("textDecoration")?.includes("line-through")
              ? styles.texteditor__quickButtonActive
              : styles.texteditor__quickButton
          }
          onClick={() => setAttribute("textDecoration", decbut("line-through"))}
          src={StrikeThroughButton}
          alt="Strikethrough Button"
        ></img>
      </div>
    </div>
  );
};

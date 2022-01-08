import React, { useRef, useEffect } from "react";

const AnimationPicker = ({ show, onClickOutside }) => {
  let ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside && onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  if (!show) return null;

  return (
    <div>
      <b>Edit:</b>
      <div>
        <label htmlFor="animationSelect">Animation: </label>
        <select id="animationSelect">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
    </div>
  );
};

export default AnimationPicker;

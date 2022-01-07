import { useEffect, useRef } from 'react';
import styles from '../styles/Toolbar.module.css';
import { SketchPicker } from 'react-color';

export default function ColorPicker({ onClickOutside, show, color, setColor }) {
  let ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside && onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  if (!show) return null;

  return (
    <div ref={ref} className={styles.colorPicker}>
      <SketchPicker
        color={color}
        onChange={(color, event) => setColor(color.hex)}
      />
    </div>
  );
}

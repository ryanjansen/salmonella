import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import Image from 'react-konva';

function EquationImage({ latex }) {
  const [image, setImage] = useState(null);

  const generateEquation = () => {
    const equationNode = document.getElementById('equation-editor');
    html2canvas(equationNode)
      .then((canvas) => {
        setImage(canvas);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    generateEquation();
  }, latex);

  return <Image image={image} draggable />;
}

export default EquationImage;

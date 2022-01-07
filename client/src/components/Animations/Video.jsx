import React from "react";
import { Image } from "react-konva";
import Konva from "konva";

export const Video = ({ src }) => {
    const imageRef = React.useRef(null);
    const [size, setSize] = React.useState({ width: 50, height: 50 });
  
    // we need to use "useMemo" here, so we don't create new video elment on any render
    const videoElement = React.useMemo(() => {
      const element = document.createElement("video");
      element.src = src;
      element.muted = true;
      element.loop = true;
      return element;
    }, [src]);
  
    // when video is loaded, we should read it size
    React.useEffect(() => {
      const onload = function() {
        setSize({
          width: videoElement.videoWidth,
          height: videoElement.videoHeight
        });
      };
      videoElement.addEventListener("loadedmetadata", onload);
      return () => {
        videoElement.removeEventListener("loadedmetadata", onload);
      };
    }, [videoElement]);
  
    // use Konva.Animation to redraw a layer
    /*
    React.useEffect(() => {
      videoElement.play();
      const layer = imageRef.current.getLayer();
  
      const anim = new Konva.Animation(() => {}, layer);
      anim.start();
  
      return () => anim.stop();
    }, [videoElement]);
    */

    const startAnim = () => {
      videoElement.play();
      const layer = imageRef.current.getLayer();
      const anim = new Konva.Animation(() => {}, layer);
      setAnim(anim);
      anim.start();
      console.log(playing);
    }

    const [playing, setPlaying] = React.useState(false);
    const [anim, setAnim] = React.useState(null);
  
    return (
      <Image
        ref={imageRef}
        image={videoElement}
        x={20}
        y={20}
        stroke="black"
        width={size.width}
        height={size.height}
        draggable
        onMouseDown={(e)=> {
          setPlaying(!playing);
          if (playing) videoElement.pause();
          else startAnim();
        }}
      />
    );
  };
import React, { useEffect } from "react";
import { CircleAnim } from "./CircleAnim";
import { Text, Layer, Circle } from "react-konva";

export const DivideAnim = () => {
    const [circles, setCircles] = React.useState([]);
    const [circleRefs, setCircleRefs] = React.useState([]);
    useEffect(()=>generateCircles(), [])
    // Generate 10 circles
    const generateCircles = () => {
        const circles = [];
        const circlerefs = [];
        for (let i = 0; i < 10; i++) {
            const newRef = React.createRef();
            circles[i] = <Circle x={(i+1)*100} y={200} radius={50} fill="orange" ref={newRef}/>
            circlerefs.push(newRef);
        }
        setCircleRefs(circlerefs);
        setCircles(circles);
    };

    //boxes
        // x 250
        // x 400
        // x 550

    // Anim Function
    async function anim ()  {
        const X_VALUES = [250, 450, 650];
        for (let i = 0; i < circleRefs.length - 1; i++) {
            console.log(circleRefs[i].current);
            circleRefs[i].current.to({
                x:X_VALUES[i%3],
                y:400+(Math.floor(i/3))*100,
                duration:0.5
            })
            await new Promise(r => setTimeout(r, 500));
        }
        circleRefs[circleRefs.length - 1].current.to({
            x:450,
            duration:0.5
        })
    }


    return (
        <Layer>
            <Text text="Text" x={200} y={200} fontSize={20} fill="white" 
            onMouseDown={(e)=>{e.target.to({x:250,y:250,duration:0.5,fontSize:40,fill:"black"})}}/>
            {circles}
            <Text text="Start Anim" onMouseDown={()=> {anim();}} />
        </Layer>
    )
}
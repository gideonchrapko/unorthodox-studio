import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import goBack from "../../Assets/goBack.json";

export default function GoBackLottie() {
    const [hovered, setHovered] = useState();
    const ref = useRef();

    useEffect(() => {
        if(hovered){
            ref.current.play();
        }else{
            ref.current.stop();
        }
    },[hovered])
  
    return (
      <div 
        style={{ height: "100%", width: "100%" }} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
    >
        <Lottie 
            lottieRef={ref} 
            animationData={goBack}  
            loop={true}
            autoplay={false}
        />
      </div>
    );
  }
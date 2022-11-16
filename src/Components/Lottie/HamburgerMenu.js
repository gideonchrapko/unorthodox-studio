import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import Hamburger from "../../Assets/Hamburger.json";

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    function playLottie() {
        ref.current.setDirection(open ? -1 : 1)
        ref.current.play();
    }
  
    return (
      <div 
        style={{ 
            width: "30px",
            cursor: "pointer",
            float: "right",
            position: "relative",
            zIndex: "999"
        }} 
        onClick={e => {
            setOpen(!open)
            playLottie()
        }}
    >
        <Lottie
            lottieRef={ref} 
            animationData={Hamburger}
            loop={false}
            autoplay={false}
            onComplete={() => ref.current.pause()}
        />
      </div>
    );
  }
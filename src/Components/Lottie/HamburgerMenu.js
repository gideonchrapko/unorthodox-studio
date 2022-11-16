import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import Hamburger from "../../Assets/Hamburger.json";

export default function HamburgerMenu(props) {
    const { hamburger } = props
    const [open, setOpen] = useState(false);
    const ref = useRef();

    // console.log(hamburger)

    useEffect(() => {
        if(open){
            ref.current.play();
            // console.log("play video")
        }else{
            ref.current.setDirection(-1);
            // console.log("reverse play")
        }
    },[open])
  
    return (
      <div 
        style={{ 
            width: "30px",
            cursor: "pointer",
            float: "right",
        }} 
        onClick={() => setOpen(!open)}
    >
        <Lottie
            lottieRef={ref} 
            animationData={Hamburger}
            loop={false}
            autoplay={false}
        />
      </div>
    );
  }
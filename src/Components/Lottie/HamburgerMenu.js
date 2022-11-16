import React, { useState, useRef } from "react";
import Lottie from "lottie-react";
import Hamburger from "../../Assets/Hamburger.json";
import { useShopify } from "../../redux/ducks/shopify";

export default function HamburgerMenu() {
    // const [open, setOpen] = useState()
    const { HamburgerStatus } = useShopify();
    const ref = useRef();

    function playLottie() {
        ref.current.setDirection(HamburgerStatus ? -1 : 1)
        ref.current.play();
    }
  
    console.log(HamburgerStatus)
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
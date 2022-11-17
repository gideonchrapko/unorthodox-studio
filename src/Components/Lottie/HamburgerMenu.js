import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import Hamburger from "../../Assets/Hamburger.json";
import { useShopify } from "../../redux/ducks/shopify";

export default function HamburgerMenu() {
    const { hamburgerStatus, openHamburger, closeHamburger } = useShopify();
    const ref = useRef();

    // function playLottie() {
    //     if(hamburgerStatus){
    //         closeHamburger();
    //     }else{
    //         openHamburger();
    //     }
    //     ref.current.setDirection(hamburgerStatus ? -1 : 1)
    //     ref.current.play();
    // }

    useEffect(() => {
        if(hamburgerStatus){
            ref.current.setDirection(1);
            ref.current.play();
        }else{
            ref.current.setDirection(-1);
            ref.current.play();
        }
    },[hamburgerStatus])

    return (
      <div 
        style={{ 
            width: "30px",
            cursor: "pointer",
            float: "right",
            position: "relative",
            zIndex: "999"
        }} 
        onClick={() => hamburgerStatus ? closeHamburger() : openHamburger()}
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
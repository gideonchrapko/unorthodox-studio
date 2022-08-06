import React, { useState, useRef, useEffect } from 'react';
import { useSpring } from '@react-spring/core';
import { useFrame } from '@react-three/fiber';
import { a } from '@react-spring/three';

const Mesh = ({ ...props }) => {
    const ref = useRef();
    const geometry = props.geometry
    const position = props.position
    const scale = props.scale
    const rotation = props.rotation
    const hovPos = props.hovPos
    const [hover, setHover] = useState(false)
    const [height, setHeight] = useState()
    const [speed, setSpeed] = useState()

    useEffect(() => {
        // setHeight(Math.random() * (9.5 - 9 + 0.5) + 9.5)
        setHeight(9 + Math.random())
        setSpeed(Math.random() * (2 - 1 + 1) + 1)
    },[])

    const animatedProps = useSpring({
        hovered: hover ? scale + 0.2 : scale,
        position: hover ? [position[0], position[1], position[2] + 1] : [position[0], position[1], position[2]],
        config: { 
          mass: 20, 
          friction: 40, 
          tension: 300
        },
      })

      useFrame((state) => {
        const t = state.clock.getElapsedTime()
        ref.current.position.y = (hovPos + Math.sin(t / speed)) / height 
      })

      console.log(height)

    return (
        <a.mesh 
            ref={ref}
            geometry={geometry}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            position={animatedProps.position} 
            rotation={rotation} 
            scale={scale} 
        >
            <meshStandardMaterial attach="material" color="#0f0f0f" roughness={0} metalness={0.1}/>
        </a.mesh>
    )
}

export default Mesh
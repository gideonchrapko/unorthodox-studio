import React, { useState, useRef, useEffect } from 'react';
import { useSpring } from '@react-spring/core';
import { useFrame } from '@react-three/fiber';
import { a } from '@react-spring/three';

const Mesh = ({ ...props }) => {
    const ref = useRef();
    const { hovPos, rotation, scale, position, geometry, entered, index } = props
    const [hover, setHover] = useState(false)
    const [height, setHeight] = useState()
    const [speed, setSpeed] = useState()

    useEffect(() => {
        setHeight(9 + Math.random())
        setSpeed(0.5 + Math.random())
    },[])

    const animatedProps = useSpring({
        position: hover ? [position[0], position[1], position[2] + 1] : [position[0], position[1], position[2]],
        config: { 
          mass: 20, 
          friction: 40, 
          tension: 300
        },
      })

    // const [spring, set] = useSpring(() => ({
    //   position: [...position],
    // }))

    // useEffect(() => {
    //   set({ position: entered ? [0, 0, 25] : [0, 0, 0], delay: (index + 3) * 100 });
    // }, [entered, set]);

    useFrame((state) => {
      const t = state.clock.getElapsedTime()
      ref.current.position.y = (hovPos - Math.sin(t / speed)) / height
    })

    return (
        <a.group>
        {/* <a.group {...spring}> */}
          <a.mesh 
              ref={ref}
              geometry={geometry}
              onPointerOver={(e) => {
                e.stopPropagation()
                setHover(true)
              }}
              onPointerOut={(e) => {
                e.stopPropagation()
                setHover(false)
              }}

              position={animatedProps.position} 
              rotation={rotation} 
              scale={scale} 
          >
              <meshStandardMaterial attach="material" color="black" roughness={0} metalness={1}/>
          </a.mesh>
        </a.group>
    )
}

export default Mesh
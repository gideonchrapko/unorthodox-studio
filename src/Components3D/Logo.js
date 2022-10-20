import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import Mesh from './Mesh';
// import sanityClient from '../client';

export default function Model(props) {
  const { rotation, entered } = props
  const [load, setLoad] = useState(false);
  const group = useRef();
  const { nodes } = useGLTF('/Logo.glb');

  useEffect(() => {
    setLoad(true)
  },[])

  const [spring, set] = useSpring(() => ({
    rotation: [...rotation],
    // config: { mass: 10, friction: 200, tension: 400 },
  }))

  useEffect(() => {
    set({ rotation: [...rotation] });
  }, [rotation, set]);

  const animatedPropsonLoad = useSpring({
    scale: load ? 0.5 : 0,
    rotation: load ? [0, -0.5, 0] : [0, -5, 0],
    position: load ? [0, 0, -0.2] : [-0.8, 2, 0],
    config: { 
      mass: 3, 
      friction: 60, 
      tension: 300
    },
  })

  return (
    <a.group 
      ref={group} {...props} dispose={null} {...spring}
      position={animatedPropsonLoad.position} 
      scale={animatedPropsonLoad.scale}
    >
      <group position={[-2.5, -3.5, 0]}>
        <Mesh
          hovPos={53}
          geometry={nodes.BezierCurve.geometry} 
          position={[2.77, 5.27, 0.07]} 
          rotation={[Math.PI / 2, 0, 0]}
          entered={entered}
          index={1}
        />
        <Mesh
          hovPos={53}
          geometry={nodes.BezierCurve001.geometry}
          position={[4.92, 5.27, 0.07]} 
          rotation={[Math.PI / 2, 0, 0]} 
          scale={[-1, 1, 1]} 
          entered={entered}
          index={2}
        />
        <Mesh
          hovPos={24}        
          geometry={nodes.BezierCurve003.geometry}
          position={[1.31, 2.35, 0.07]} 
          rotation={[Math.PI / 2, 0, 0]}
          entered={entered}
          index={3}
        />
        <Mesh
          hovPos={19}        
          geometry={nodes.BezierCurve004.geometry}
          position={[3.64, 2.07, 0.07]} 
          rotation={[-Math.PI / 2, 0, -Math.PI]} 
          entered={entered}
          index={4}
        />
        <Mesh
          hovPos={30}         
          geometry={nodes.BezierCurve006.geometry}
          position={[3.16, 3.11, 0.07]} 
          rotation={[Math.PI / 2, 0, 0]} 
          entered={entered}
          index={5}
        />
        <Mesh
          hovPos={21}         
          geometry={nodes.Circle.geometry}
          position={[2.48, 2.17, 0.08]} 
          rotation={[Math.PI / 2, 0, 0]} 
          scale={0.43} 
          entered={entered}
          index={6}
        />
      </group>
    </a.group>
  )
}

useGLTF.preload('/Logo.glb')

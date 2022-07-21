import { Suspense } from 'react';
// import { Loader, Environment, Html } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
// import { useSpring } from '@react-spring/core'
// import { a } from '@react-spring/three'

import Controls from '../Components3D/Controls';
import Logo from '../Components3D/Logo';


const Landing = () => {
    return (
        <Canvas 
            style={{ height: "100vh", width: "100vw" }}
            shadows dpr={[1, 2]} camera={{ position: [0, 5, -1], fov: 50, near: 1, far: 20 }}
        >
            <Suspense fallback={null}>
                <ambientLight intensity={10} />
				<pointLight position={[10, 10, 10]} />
                <Controls />
                <Logo />
            </Suspense>
        </Canvas>
    )
}

export default Landing
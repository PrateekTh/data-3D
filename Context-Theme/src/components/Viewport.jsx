import React, { useRef, useState } from 'react';
import {Canvas, useFrame} from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"

const Model = (props) =>{

    const ref = useRef()
    const speed = 0.1;
    
    useFrame((state, delta) => {
        ref.current.rotation.y += delta * speed;
    })

    const { scene } = useGLTF('/Earth.glb')
    return <primitive ref = {ref} object={scene} {...props} />
}

const Cube = ({position, size, color}) => {
    const ref = useRef()
    useFrame((state, delta) => {
        ref.current.rotation.y += delta;
    })

    return(
        <mesh position={position} ref={ref}>
            <boxGeometry args={size}/>
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

const Sphere = ({position, size, color}) => {
    const ref = useRef()
    let speed = 0.3;
    
    useFrame((state, delta) => {
        if(isHovered){
            speed = 0.1;
        }else {
            speed = 0.3;
        }
        ref.current.rotation.y += delta * speed;
    })

    const[isHovered, setIsHovered] = useState(false);

    return(
        <mesh 
        position={position} ref={ref} 
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}>
            <sphereGeometry args={size}/>
            <meshStandardMaterial color={isHovered? 'slateblue': color} wireframe/>
        </mesh>
    )
}

function Viewport() {
    return ( 
        <div className='viewport-container'>
            <Canvas >
                <directionalLight intensity={2} position={[0,0,3]}/>
                <ambientLight intensity={2}/>
                <Model scale ={0.005} />
                <Sphere position={[0,1,3]} size ={[0.2,10,10]} color={'hotpink'}/>
                {/* <Cube position={[2,0,0]} size ={[1,3,2]} color={'steelblue'}/>*/}

                <OrbitControls/>
            </Canvas> 
        </div>
    );
}

export default Viewport;
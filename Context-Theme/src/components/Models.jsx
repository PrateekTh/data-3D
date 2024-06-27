import React, { useRef, useState } from 'react';
import { useFrame} from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"


export const Model = (props) =>{

    const ref = useRef()
    const speed = 0.1;

    // useFrame((state, delta) => {
    //     ref.current.rotation.y += delta * speed;
    // })

    const { scene } = useGLTF(props.link)
    return <primitive ref = {ref} object={scene} {...props} />
}

export const Cube = ({position, size, color}) => {
    const ref = useRef()
    useFrame((state, delta) => {
        ref.current.rotation.y += delta;
    })

    return(
        <mesh 
        position={position} 
        castShadow 
        receiveShadow 
        ref={ref}>
            <boxGeometry args={size}/>
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

export const Sphere = ({position, size, color}) => {
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
        castShadow
        receiveShadow
        position={position} ref={ref} 
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}>
            <sphereGeometry args={size}/>
            <meshStandardMaterial color={isHovered? 'slateblue': color}/>
        </mesh>
    )
}


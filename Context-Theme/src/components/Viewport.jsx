import React, { useRef, useState, useEffect } from 'react';
import {Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import {Model, Cube, Sphere} from "./Models"
import DatasetModel from './DatasetModel';
import useTheme from '../context/ThemeContext';



function Viewport() {

    const [fogColor, setFogColor] = useState('#18181B');
    const {themeMode} = useTheme();
    useEffect(() => {
        if(themeMode == 'dark') {
            setFogColor('#18181B');
        }else{
            setFogColor('white');
        }
    }, [themeMode]);
    
    return ( 
        <div className='viewport-container'>
            <Canvas shadows >
                <fog attach="fog" color={fogColor} near={6} far={20} />
                {/* <directionalLight 
                    intensity={2} 
                    position={[20, 20, 20]} 
                    castShadow 
                    shadow-mapSize-height={1024}
                    shadow-mapSize-width={1024}
                /> */}
                <spotLight args={["#5DFDCB"]} intensity={50} position={[20,8,20]} decay={1.2}/>
                <spotLight args={["#FF006E"]} intensity={50} position={[-20,8,-20]} decay={1.2}/>

                <Sphere position={[0,3,3]} size ={[0.2,10,10]} color={'hotpink'}/>

                <DatasetModel />
                {/* <Model link = '/Earth.glb' scale ={0.005} rotation = {[0.2, 1.8, 0]} /> */}
                <Cube position={[0,2,3]} size ={[2,1,2]} color={'steelblue'}/>

                <OrbitControls/>
            </Canvas> 
        </div>
    );
}

export default Viewport;
import React, { useRef, useState, useEffect, useContext } from 'react';
import {Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import useTheme from '../context/ThemeContext';
import UserContext from '../context/UserContext'
import DataPointsModel from './DataPointsModel';
import { basicMaterial } from '../modules/shaders';


function Viewport() {

    // console.log(basicMaterial);
    const [fogColor, setFogColor] = useState('#18181B')
    const {themeMode} = useTheme()

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
                <fog attach="fog" color={fogColor} near={150} far={600} />
                <axesHelper args={[200, 200, 200]} />
                <directionalLight color={"#FF8552"} intensity={2} position={[5,1,1]}/>
                <directionalLight color={"#FF8552"} intensity={2} position={[-5,1,1]}/>
                
                <DataPointsModel/>
                <OrbitControls
                    minPolarAngle={-Math.PI/2}
                    maxPolarAngle={Math.PI/2}
                />
            </Canvas> 
        </div>
    );
}

export default Viewport;
import React, { useRef, useState, useEffect, useContext } from 'react';
import {Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import {Model, Cube, Sphere} from "../modules/Models"
import PlaneModel from './PlaneModel';
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


                <spotLight args={["#5DFDCB"]} intensity={50} position={[30,8,20]} decay={1.2}/>
                <directionalLight color={"#FF8552"} intensity={2} position={[5,1,1]}/>
                <directionalLight color={"#FF8552"} intensity={2} position={[-5,1,1]}/>

                {/* <Sphere position={[0,3,3]} size ={[0.2,10,10]} color={'hotpink'}/> */}
                
                <DataPointsModel/>
                {/* <TestDocsInstanced /> */}
                {/* <PlaneModel data = {data}/> */}
                {/* <Model link = '/Earth.glb' scale ={0.005} rotation = {[0.2, 1.8, 0]} /> */}
                {/* <Cube position={[0,2,3]} size ={[2,1,2]} color={'steelblue'}/> */}

                <OrbitControls
                    minPolarAngle={-Math.PI/2}
                    maxPolarAngle={Math.PI/2}
                />
            </Canvas> 
        </div>
    );
}

export default Viewport;
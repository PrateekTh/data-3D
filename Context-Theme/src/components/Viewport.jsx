import React, {useState, useEffect, useRef} from 'react';
import {Canvas} from "@react-three/fiber"
import {Text} from "@react-three/drei"
import useTheme from '../context/ThemeContext';
import DataPointsModel from './visualisation/DataPointsModel';
import { basicMaterial } from '../modules/shaders';
import CameraManager from './visualisation/CameraManager';
import PointDetails from './PointDetails';
import CameraControls from './visualisation/CameraControls';


function Viewport({userPrefs}) {

    // console.log(basicMaterial);
    const [fogColor, setFogColor] = useState('#18181B');
    const {themeMode} = useTheme();

    const [cameraProperties, setCameraProperties] = useState();

    useEffect(() => {
        if(themeMode == 'dark') {
            setFogColor('#18181B');
        }else{
            setFogColor('white');
        }
    }, [themeMode]);

    return ( 
        <div className='viewport-container'>
            <div className='relative flex w-full justify-between'>
                <div>
                    <PointDetails/>
                </div>

                <div >
                    <CameraControls setCameraProperties = {setCameraProperties}/>
                </div>

            </div>
            <Canvas shadows camera={{position:[150,150,150]}} >
                <fog attach="fog" color={fogColor} near={150} far={500} />
                <axesHelper args={[250, 250, 250]} />
                <CameraManager cameraProperties= {cameraProperties} setCameraProperties ={setCameraProperties}/>

                <directionalLight color={"#FF8552"} intensity={2} position={[5,1,1]}/>
                <directionalLight color={"#FF8552"} intensity={2} position={[-5,1,1]}/>

                <DataPointsModel/>

                <Text fontSize={8} font={"/lucon-web.woff"} position={[100, 6, -1]} color={'red'}> 
                    X{userPrefs?.x? " - " + userPrefs.x : " Axis"}
                 </Text>

                <Text fontSize={8} font={"/lucon-web.woff"} position={[-6, 100, 1]} color={'green'} rotation={[0, Math.PI/4, Math.PI/2]}> 
                    Y{userPrefs?.y? " - " + userPrefs.y : " Axis"}
                </Text>

                <Text fontSize={8} font={"/lucon-web.woff"} position={[0, 6, 100]} color={'cyan'} rotation={[0, Math.PI/2, 0]}> 
                    Z{userPrefs?.z? " - " + userPrefs.z : " Axis"}
                </Text>

                {/*Labels*/}

            </Canvas> 
        </div>
    );
}

export default Viewport;
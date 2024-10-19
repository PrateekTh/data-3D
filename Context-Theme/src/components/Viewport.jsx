import React, {useState, useEffect, useRef} from 'react';
import {Canvas} from "@react-three/fiber"
import {Text} from "@react-three/drei"
import useTheme from '../context/ThemeContext';
import DataPointsModel from './DataPointsModel';
import { basicMaterial } from '../modules/shaders';
import CameraManager from './CameraManager';
import PointDetails from './PointDetails';


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

    function onUpdateCamera( position, target ){
        setCameraProperties({position:position, target:target});
    }

    return ( 
        <div className='viewport-container'>
            <div className='relative flex w-full justify-between'>
                <div>
                    <PointDetails/>
                </div>

                <div >
                    <div className='absolute -ml-20 flex flex-col gap-2 z-40'>
                        <span className='font-mono font-bold text-purple-500'> Snap View </span>
                        <button onClick={()=> onUpdateCamera([80, 80, 175],  [80, 80, 0])}> X-Y </button>
                        <button onClick={()=> onUpdateCamera([175, 80, 80],  [0, 80, 80])}> Y-Z </button>
                        <button onClick={()=> onUpdateCamera([80, 175, 80],  [80, 0, 80])}> Z-X </button>
                        <button onClick={()=> onUpdateCamera([125, 125, 125],  [20, 20, 20])}> Reset </button>
                    </div>
                </div>

            </div>
            <Canvas shadows camera={{position:[100,100,100]}} >
                <fog attach="fog" color={fogColor} near={150} far={500} />
                <axesHelper args={[200, 200, 200]} />
                <CameraManager cameraProperties= {cameraProperties} setCameraProperties ={setCameraProperties}/>

                <directionalLight color={"#FF8552"} intensity={2} position={[5,1,1]}/>
                <directionalLight color={"#FF8552"} intensity={2} position={[-5,1,1]}/>

                <DataPointsModel/>

                <Text fontSize={5} font={"/lucon-web.woff"} position={[60, 4, -1]} color={'red'}> 
                    X{userPrefs?.x? " - " + userPrefs.x : " Axis"}
                 </Text>

                <Text fontSize={5} font={"/lucon-web.woff"} position={[-5, 60, 1]} color={'green'} rotation={[0, 0, Math.PI/2]}> 
                    Y{userPrefs?.y? " - " + userPrefs.y : " Axis"}
                </Text>

                <Text fontSize={5} font={"/lucon-web.woff"} position={[0, 5, 60]} color={'cyan'} rotation={[0, Math.PI/2, 0]}> 
                    Z{userPrefs?.z? " - " + userPrefs.z : " Axis"}
                </Text>

                {/*Labels*/}

            </Canvas> 
        </div>
    );
}

export default Viewport;
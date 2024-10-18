import React, {useState, useEffect} from 'react';
import {Canvas} from "@react-three/fiber"
import { OrbitControls, Text, Text3D} from "@react-three/drei"
import useTheme from '../context/ThemeContext';
import UserContext from '../context/UserContext'
import DataPointsModel from './DataPointsModel';
import { basicMaterial } from '../modules/shaders';
import PointDetails from './PointDetails';
import useViewportData from '../context/ViewportContext';


function Viewport({userPrefs}) {

    // console.log(basicMaterial);
    const [fogColor, setFogColor] = useState('#18181B');
    const {themeMode} = useTheme();
    const {} = useViewportData();

    // console.log(userPrefs);
    useEffect(() => {
        if(themeMode == 'dark') {
            setFogColor('#18181B');
        }else{
            setFogColor('white');
        }
    }, [themeMode]);

    return ( 
        <div className='viewport-container'>
            <div className='relative font'>
                <PointDetails/>
            </div>
            <Canvas shadows camera={{position:[64,48,64]}} >
                <fog attach="fog" color={fogColor} near={150} far={500} />
                <axesHelper args={[200, 200, 200]} />

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
                <OrbitControls
                    minPolarAngle={-Math.PI/2}
                    maxPolarAngle={Math.PI/2}
                />
            </Canvas> 
        </div>
    );
}

export default Viewport;
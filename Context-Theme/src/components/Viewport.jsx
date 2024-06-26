import React, { useRef, useState } from 'react';
import {Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import {Model, Cube, Sphere} from "./Models"


function Viewport() {
    return ( 
        <div className='viewport-container'>
            <Canvas >
                <directionalLight intensity={2} position={[0,0,3]}/>
                <ambientLight intensity={2}/>
                <Model link = '/Earth.glb' scale ={0.005} rotation = {[0.2, 1.8, 0]} />
                <Sphere position={[0,1,3]} size ={[0.2,10,10]} color={'hotpink'}/>
                {/* <Cube position={[2,0,0]} size ={[1,3,2]} color={'steelblue'}/>*/}

                <OrbitControls/>
            </Canvas> 
        </div>
    );
}

export default Viewport;
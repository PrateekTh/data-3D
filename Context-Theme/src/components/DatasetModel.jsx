import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import useTheme from '../context/ThemeContext';

let geometry = new THREE.PlaneGeometry( 20, 20, 200, 200 );
geometry.rotateX( - Math.PI / 2 );

function DatasetModel() {
    const {themeMode} = useTheme();

    // let geometry = new THREE.PlaneGeometry( 20, 20, 200, 200 );
    // geometry.rotateX( - Math.PI / 2 );
    // let material = new THREE.MeshBasicMaterial( { color: 0x0044ff } );

    useEffect(() => {
        const position = geometry.attributes.position;
        position.usage = THREE.DynamicDrawUsage;
        const l = 0.6;
        let Yprev = 0.1;
        for ( let i = 0; i < position.count; i ++ ) {
            let y = (1 - l) * Math.sin( 2 * position.getX(i)) + l * Math.cos( 2 * position.getZ(i));
            y = Yprev * 0.4 + 0.3 * y + 0.3 * Math.random() * y;
            position.setY(i, y );
            Yprev = y;
        }
    }, []);

    return ( 
        <mesh
            visible
            userData={{ hello: 'world' }}
            position={[0,0,0]}
            rotation={[0, 0, 0]}
            geometry={geometry}
            receiveShadow
        > 

        <meshStandardMaterial color={'white'}/>

        </mesh>
    
    );
}

export default DatasetModel;
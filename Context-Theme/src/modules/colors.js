import * as THREE from 'three'
import React from 'react';


const SELECTED_COLOR = '#818';
const DEFAULT_COLOR = '#818';

const scratchColor = new THREE.Color();

const usePointColors = ({data, selectedPoint}) => {
    const numPoints = data.length;
    const color = new THREE.Color('red')
    React.useEffect(()=>{

        
    }, [data, selectedPoint])


    return color;
}

export default usePointColors;
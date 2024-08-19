import * as React from 'react';
import * as THREE from 'three';
import { useLayout } from '../modules/layouts';
import useViewportData from '../context/ViewportContext';


const SELECTED_COLOR = new THREE.Color('red');
const COLOR_LOW = new THREE.Color('#A63D40');
const COLOR_HIGH = new THREE.Color('#1AC8ED');
const scaleAdjust = 25;
const scratchObject3D = new THREE.Object3D();

// function updateInstancedMeshColors({mesh, selectedPoint}){
// 	const color = new THREE.Color('blue');

// 	mesh.getColorAt(selectedPoint, color)
// 	console.log(color);

// 	mesh.setColorAt(selectedPoint, SELECTED_COLOR);
// 	mesh.instanceColor.needsUpdate = true;
// }

function updateInstancedMeshMatrices({ mesh, layoutData, selectedPoint, plotType }) {
  	if (!mesh) return;

	// set the transform matrix for each instance
	let color = new THREE.Color();
	const scaleMatrix = [1, 1, 1];
	let scaleOffset = 0;

	if(plotType == "discrete") {
		scaleMatrix[0] = scaleMatrix[2] = 0;
		scaleMatrix[1] = 40;
		scaleOffset = 1;
	}

	// console.log(selectedPoint);
	console.log(layoutData);
	mesh.count = layoutData.index.length;
	for (let i = 0; i < mesh.count; i++) {
		const colorID = layoutData.at(i, "color");
		const scale = layoutData.at(i, "scale")/scaleAdjust;
		const x = layoutData.at(i, "x");
		const y = layoutData.at(i, "y") + scaleOffset * (scale * scaleMatrix[1] + 1)/4;
		const z = layoutData.at(i, "z");

		//lerpHSL or setHSL
		color = COLOR_LOW.clone();
		color.lerpHSL(COLOR_HIGH, colorID);

		// console.log(color , COLOR_LOW, COLOR_HIGH);

		if(selectedPoint && i == selectedPoint.id ) {
			mesh.setColorAt( i, SELECTED_COLOR); 
		} else mesh.setColorAt( i, color );		
		
		scratchObject3D.scale.set(scaleMatrix[0] * scale + 1, scaleMatrix[1] * scale + 1, scaleMatrix[2]*scale + 1);
		scratchObject3D.position.set(x, y, z);
		scratchObject3D.rotation.set(Math.PI, 0, 0); // cylinders face y direction

		scratchObject3D.updateMatrix();
		mesh.setMatrixAt(i, scratchObject3D.matrix);
	}

	//needs update vs Dynamic Draw Usage
	mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
}

function PointGeometry({plotType}){
	console.log(plotType);
	if(plotType == "discrete") {
		console.log("Box Geometry");
		return <cylinderGeometry attach="geometry" args={[0.5,0.5,0.5, 8]} />
	}
	return <sphereGeometry attach="geometry" args={[0.5, 8, 6]} />
}

//-----------------------------------------------------------//
const InstancedPoints = () => {
    const meshRef = React.useRef();
	const {data, plotType} = useViewportData();
	const numPoints = data.index.length;

	console.log(plotType);
    const {selectedPoint, onSelectPoint} = useViewportData();

	const layoutData = useLayout({data});

    // update instance matrices when needed
    React.useEffect(() => {
		// console.log("Updating Now");
		// console.log(layoutData);
		if (layoutData) updateInstancedMeshMatrices({ mesh: meshRef.current, layoutData, selectedPoint, plotType });
    }, [layoutData, selectedPoint]);
	
	
	function handleInstanceClick(e){
		e.stopPropagation();
		const { instanceId } = e;
		const point  = data[instanceId];

		if(point === selectedPoint){
			onSelectPoint(null); //deselect
		}else{
			onSelectPoint(point);
		}
		console.log(instanceId + " was Clicked");
	}

	return (
		<>
			<instancedMesh
				ref={meshRef}
				args={[null, null, numPoints]}
				frustumCulled={false}
				onClick={handleInstanceClick}
			>
				<PointGeometry plotType={plotType}/>
				<meshStandardMaterial attach="material"/>
			</instancedMesh>
			{/* <mesh position={[12.5, 0, 12.5]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[25,25]}/>
				<meshStandardMaterial attach="material" color={0xF15BB5}/>
			</mesh> */}
		</>
	);
};

export default InstancedPoints;
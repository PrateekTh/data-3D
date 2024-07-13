import * as React from 'react';
import * as THREE from 'three';
import { useLayout } from '../modules/layouts';
import useViewportData from '../context/ViewportContext';


const SELECTED_COLOR = new THREE.Color('red');
const DEFAULT_COLOR = new THREE.Color('red');

const scratchObject3D = new THREE.Object3D();

// function updateInstancedMeshColors({mesh, selectedPoint}){
// 	const color = new THREE.Color('blue');

// 	mesh.getColorAt(selectedPoint, color)
// 	console.log(color);

// 	mesh.setColorAt(selectedPoint, SELECTED_COLOR);
// 	mesh.instanceMatrix.needsUpdate = true;
// }

function updateInstancedMeshMatrices({ mesh, data, selectedPoint }) {
  	if (!mesh) return;
  // set the transform matrix for each instance

	const color = new THREE.Color();
	//f7fff6-bcebcb-87d68d-93b48b-8491a3
	const blossomPalette = [ 0xf7fff6, 0xbcebcb, 0x87d68d, 0x93b48b ];
	// console.log(selectedPoint);

	for (let i = 0; i < data.index.length; ++i) {
		color.setHex( blossomPalette[ Math.floor( Math.abs(Math.sin(i)) * blossomPalette.length ) ] );
		if(selectedPoint && i == selectedPoint.id ) {
			mesh.setColorAt( i, SELECTED_COLOR); 
		} else mesh.setColorAt( i, color );		
		// const { x, y, z } = data[i];
		const scale = (1000/(i+10));
		scratchObject3D.position.set(i%100, scale/10 - 10, i%40);

		// scratchObject3D.scale.setY(scale);
		// scratchObject3D.position.set(x, scale/10 - 10, z);
		// scratchObject3D.rotation.set(Math.PI, 0, 0); // cylinders face y direction

		scratchObject3D.updateMatrix();
		mesh.setMatrixAt(i, scratchObject3D.matrix);
	}

	//needs update vs Dynamic Draw Usage
	// mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
}
//-----------------------------------------------------------//
const InstancedPoints = () => {
    const meshRef = React.useRef();
	const {data} = useViewportData();
	const numPoints = data.index.length;

	// console.log(data.index.length);
    const {selectedPoint, onSelectPoint} = useViewportData();

	useLayout({data, layout: "grid"});

    // update instance matrices when needed
    React.useEffect(() => {
		console.log(data);
		updateInstancedMeshMatrices({ mesh: meshRef.current, data, selectedPoint });
    }, [data, selectedPoint]);
	
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
				<cylinderGeometry attach="geometry" args={[0.5, 0.5, 0.15, 8]} />
				<meshStandardMaterial attach="material"/>
			</instancedMesh>
		</>
	);
};

export default InstancedPoints;
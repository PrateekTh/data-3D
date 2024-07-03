import * as React from 'react';
import * as THREE from 'three';
import { useLayout } from '../modules/layouts';
import useViewportData from '../context/ViewportContext';

// re-use for instance computations
const scratchObject3D = new THREE.Object3D();

function updateInstancedMeshMatrices({ mesh, data }) {
  	if (!mesh) return;

  // set the transform matrix for each instance
	for (let i = 0; i < data.length; ++i) {
		const { x, y, z } = data[i];
		const scale = (1000/(i+10));
		//console.log(scale);
		scratchObject3D.scale.setY(scale);
		scratchObject3D.position.set(x, y, z);
		// scratchObject3D.translateY();
		scratchObject3D.rotation.set(Math.PI, 0, 0); // cylinders face y direction
		scratchObject3D.updateMatrix();
		mesh.setMatrixAt(i, scratchObject3D.matrix);
	}

    mesh.instanceMatrix.needsUpdate = true;
}



const InstancedPoints = ({ data }) => {
    const meshRef = React.useRef();
    const numPoints = data.length;

    const {selectedPoint, onSelectPoint} = useViewportData();

	useLayout({data, layout: "spiral"});

    // update instance matrices when needed
    React.useEffect(() => {
		updateInstancedMeshMatrices({ mesh: meshRef.current, data });
    }, [data]);

	
	function handleInstanceClick(e){
		e.stopPropagation();
		const { instanceId } = e
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
				<cylinderGeometry attach="geometry" args={[0.5, 0.5, 0.15, 8]}/>
				<meshStandardMaterial attach="material" color = "#fff"/>
			</instancedMesh>
		</>
	);
};

export default InstancedPoints;
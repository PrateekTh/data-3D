import * as React from 'react';
import * as THREE from 'three';


// re-use for instance computations
const scratchObject3D = new THREE.Object3D();

function updateInstancedMeshMatrices({ mesh, data, numRows }) {
  if (!mesh) return;
  // set the transform matrix for each instance
  for (let i = 0; i < data[0].length; ++i) {
    //const { x, y, z } = data[i];
    const z = (i%numRows) * 1.05 - (numRows/2) * 1.05;
    const x = Math.floor(i/numRows) * 1.05 -  Math.floor(data[0].length/numRows) * 1.05/2;
    const y = Math.abs(Math.sin(i/300)) ;

    scratchObject3D.position.set(x, y, z);
	scratchObject3D.scale.setY(y * 15);
    scratchObject3D.rotation.set(Math.PI, 0, 0); // cylinders face z direction
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);
  }

    mesh.instanceMatrix.needsUpdate = true;
}

const InstancedPoints = ({ data }) => {
    const meshRef = React.useRef();
    const numPoints = data[0].length;
    const numRows = 80;
    
    // update instance matrices when needed
    React.useEffect(() => {
		updateInstancedMeshMatrices({ mesh: meshRef.current, data, numRows });
    }, [data, numRows]);


	return (
		<>
			<instancedMesh
				ref={meshRef}
				args={[null, null, numPoints]}
				frustumCulled={false}
			>
				<cylinderGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]}/>
				<meshStandardMaterial attach="material" color = "#fff"/>
			</instancedMesh>
		</>
	);
};

export default InstancedPoints;
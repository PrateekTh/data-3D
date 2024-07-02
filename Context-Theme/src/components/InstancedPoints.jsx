import * as React from 'react';
import * as THREE from 'three';


// re-use for instance computations
const scratchObject3D = new THREE.Object3D();

function updateInstancedMeshMatrices({ mesh, data }) {
  if (!mesh) return;

  // set the transform matrix for each instance
  for (let i = 0; i < data[0].length; ++i) {
    //const { x, y, z } = data[i];
    const x = (i%30) * 1.05;
    const y = Math.floor(i/30) * 1.05;
    const z = 0;

    scratchObject3D.position.set(x, y, z);
    scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0); // cylinders face z direction
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);

    console.log("Updated for " + i);
    // console.log(data[0].length);
  }

  mesh.instanceMatrix.needsUpdate = true;
}

const InstancedPoints = ({ data }) => {
  const meshRef = React.useRef();
  const numPoints = data.length;

  // update instance matrices only when needed
  React.useEffect(() => {
    updateInstancedMeshMatrices({ mesh: meshRef.current, data });
  }, [data]);


  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[null, null, numPoints]}
        frustumCulled={false}

      >
        <cylinderGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]}>
          {/* <instancedBufferAttribute
            // ref={colorAttrib}
            // attachObject={['attributes', 'color']}
            // args={[colorArray, 3]}
          /> */}
        </cylinderGeometry>
        <meshStandardMaterial
            attach="material"
            color = "#fff"
        />
      </instancedMesh>
    </>
  );
};

export default InstancedPoints;
import { useThree } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei"
import { useEffect, useRef } from 'react';

const CameraManager = ({cameraProperties, setCameraProperties}) => {

    const camera = useThree((state)=>state.camera);
    const orbitControlsRef = useRef();
    
    useEffect(() => {
        if(cameraProperties){
            camera.position.set(...cameraProperties.position);
            orbitControlsRef.current.target.set(...cameraProperties.target)
            orbitControlsRef.current.update();
            setCameraProperties(null);
        }
    }, [cameraProperties]);

    return (
        <>
            <OrbitControls
                ref={orbitControlsRef}
                minPolarAngle={-Math.PI/2}
                maxPolarAngle={Math.PI/2}
            />
        </>
    );
};

export default CameraManager;
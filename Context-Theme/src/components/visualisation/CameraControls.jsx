function CameraControls({setCameraProperties}) {

    function onUpdateCamera( position, target ){
        setCameraProperties({position:position, target:target});
    }

    return ( 
        <div className='absolute -ml-20 flex flex-col gap-2 z-40'>
            <span className='font-mono font-bold text-purple-500'> Snap View </span>
            <button className="bg-white dark:bg-black" onClick={()=> onUpdateCamera([80, 80, 175],  [80, 80, 0])}> X-Y </button>
            <button className="bg-white dark:bg-black" onClick={()=> onUpdateCamera([175, 80, 80],  [0, 80, 80])}> Y-Z </button>
            <button className="bg-white dark:bg-black" onClick={()=> onUpdateCamera([80, 175, 80],  [80, 0, 80])}> Z-X </button>
            <button className="bg-white dark:bg-black" onClick={()=> onUpdateCamera([150, 150, 150],  [0, 75, 0])}> Reset </button>
        </div> 
    );
}

export default CameraControls;
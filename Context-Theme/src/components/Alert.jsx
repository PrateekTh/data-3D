import React from 'react';


function Alert( {alert} ) {

    console.log("Got alert:" , alert)
    if(alert) {
        return ( <div className='absolute p-4 m-2 bg-black text-purple-500 text-md font-mono border-2 border-white'>
        <p>{alert}</p>
    </div> )
    } else return null;
}

export default Alert;
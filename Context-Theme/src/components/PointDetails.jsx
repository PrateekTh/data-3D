import React, { useEffect, useState, useContext } from 'react';
import UserContext from "../context/UserContext";
import useViewportData from '../context/ViewportContext';
import * as dfd from "danfojs/dist/danfojs-browser/src";

function PointDetails() {
    const { dataset } = useContext(UserContext);
    const { selectedPoint, onSelectPoint } = useViewportData();

    const [pointData, setPointData] = useState(null);

    useEffect(() => {
        if(selectedPoint != null){
            let record = dataset.loc({rows:[selectedPoint]})
            setPointData(record);
        }else{
            setPointData(null);
        }

    }, [selectedPoint]);

    function onCopyRecord(){

        navigator.clipboard.writeText(JSON.stringify(dfd.toJSON(pointData)));
        
    }

    return ( <>
        {pointData && 
        <div className='absolute block p-3 z-40 select-none max-h-96 font-mono border-l border-purple-500 text-xl text-left w-2/5 lg:w-1/5  overflow-scroll no-scrollbar'>
            <div className='' > 
                <span className='font-bold text-purple-500' > Selection </span> 
                <span className='text-xs cursor-pointer' onClick={onCopyRecord}> copy ⧉</span>
                <span className='text-sm cursor-pointer text-red-500' onClick={()=> onSelectPoint(null)}> x </span>
            </div>
            <div className='text-xs'>
            {dataset.columns.map((d, i) => (
                <div className="dark:text-zinc-500 text-zinc-400 font-mono" value={i} key={i}> {d} : 
                <span className='text-zinc-700 font-semibold dark:text-zinc-300'> {pointData.values[0][i]} </span></div>
            ))}
            </div>
        </div>}
    </> );
}

export default PointDetails;
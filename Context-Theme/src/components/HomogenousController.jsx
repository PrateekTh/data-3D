import React, { useState } from 'react';


function HomogenousController({dataset, setViewportData}) {

    function handleSubmit(e){
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson);

        //Perform Sanity Checks
        if(formJson.xCol.length && formJson.yCol.length && formJson.zCol.length)
            setViewportData(formJson);
        else{
            alert("Please Choose Columns!");
        }

    }
    if(dataset.index) return ( <>
    {/* Using a form here (instead of states for each thing), since I do not wish to update the entire 3D viewport every time there's a change.
        For the situations that I might need to do that, the viewport data context is directly updated*/}
        
        <div className="text-lg p-4 text-center font-semibold"> 
            Coming Soon! 
        </div>
        
    </>
    )

    return <>
        Loading Data
    </>
}

export default HomogenousController;
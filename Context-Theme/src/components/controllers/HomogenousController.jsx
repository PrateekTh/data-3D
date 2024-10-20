import React, { useState } from 'react';


function HomogenousController({dataset, setViewportData}) {

    function handleSubmit(e){
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson);

        //Perform Sanity Checks

    }
    if(dataset.index) return ( <>        
        <div className="flex-col space-y-2 text-md p-4 text-left font-mono"> 
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-2"> Homogenous Plot</div>
            <div className="text-md font-bold text-zinc-700 dark:text-zinc-400"> This plot type will be added soon!</div>
            <div className=' text-zinc-800 dark:text-white'>
                Homogenous Plots are meant for datasets whose entries contain values for a particular variable, with all fields being descriptors of several different states of the same variable. <br/> <br/>
                
                <b>An Example: </b>
                <ul>
                    <li><b className='text-purple-600 dark:text-purple-400'>dataset</b>: "Global Oil Prices"</li>
                    <li><b className='text-purple-600 dark:text-purple-400'>possible fields</b>: Different years, Regions,..</li>
                    <li><b className='text-purple-600 dark:text-purple-400'>value in all fields</b>: Price</li>
                </ul> 
            </div>
        </div>
        
    </>
    )

    return <>
        Loading Data
    </>
}

export default HomogenousController;
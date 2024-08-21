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
        <div className="text-lg p-4 text-left font-mono"> 
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2"> Homogenous Plots will be added soon!</div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem suscipit dolores totam, fugit recusandae sint deserunt distinctio quidem explicabo, deleniti magni, praesentium culpa impedit labore inventore mollitia animi iusto dolorem!
        </div>
        
    </>
    )

    return <>
        Loading Data
    </>
}

export default HomogenousController;
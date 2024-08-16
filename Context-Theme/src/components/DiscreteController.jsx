import React, { useState } from 'react';


function DiscreteController({dataset, setViewportData}) {

    function handleSubmit(e){
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson);

        formJson.yCol = "";
        formJson.yType = "";
        formJson.colorCol = "";
        formJson.scaleCol = "";
        // formJson.scale = "count";
        // formJson.colorType = "";
        //Perform Sanity Checks
        if(formJson.xCol.length)
            setViewportData(formJson);
        else{
            alert("Please Choose Columns!");
        }

    }
    if(dataset.index) return ( <>
    {/* Using a form here (instead of states for each thing), since I do not wish to update the entire 3D viewport every time there's a change.
        For the situations that I might need to do that, the viewport data context is directly updated*/}
        <form onSubmit={handleSubmit}>
            <div className="axis border-y-2 border-zinc-200 bg-zinc-300 bg-opacity-5 flex p-6 dark:border-zinc-700">
                <div className="inputLabel align-middle text-xl font-bold p-2">X</div>
                <div>
                    <select name="xCol" className="text-zinc-800 rounded-md mx-2 bg-inherit dark:text-white font-mono"> 
                        <option className="text-zinc-800" value=""> Please Select</option>
                        {
                            dataset.columns.map((d, i) => (<option className="text-zinc-800" value={i} key={i}> {d}</option>))
                        }
                    </select> 
                    <div className="dataType flex h-6 p-2 my-2 font-mono align-middle">
                        <div>
                            <input id="xCont" type="radio" value="continuous" name="xType" 
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer"/>
                            <label className="p-2 my-8 ring-1 rounded-sm ring-white peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="xCont">Continuous</label> 
                        </div>
                        <div>
                            <input id="xCat" type="radio" value="categorical" name="xType" 
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer"/>
                            <label className="p-2 m-2 ring-1 rounded-sm ring-white peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="xCat">Categorical</label> 
                        </div>
                        <div>
                            <input id="xInd" type="radio" value="index" name="xType" defaultChecked
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer" />
                            <label className="p-2 ring-1 rounded-sm ring-white peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="xInd">Index </label> 
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div className="axis border-y-2 border-zinc-200 bg-zinc-300 bg-opacity-5 flex p-6 dark:border-zinc-700">
                <div className="inputLabel text-xl font-bold p-2">Z </div>
                <div>
                    <select name="zCol" className="text-zinc-800 rounded-md mx-2 bg-inherit dark:text-white font-mono"> 
                        <option value="" className="text-zinc-800"> Please Select</option>
                        {
                            dataset.columns.map((d, i) => (<option className="text-zinc-800" value={i} key={i}> {d}</option>))
                        }  
                    </select> 
                    <div className="dataType flex h-6 p-2 my-2 font-mono align-middle">
                        <div>
                            <input id="zCont" type="radio" value="continuous" name="zType" 
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer"/>
                            <label className="p-2 my-8 ring-1 rounded-sm ring-white peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="zCont">Continuous</label> 
                        </div>
                        <div>
                            <input id="zCat" type="radio" value="categorical" name="zType" 
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer"/>
                            <label className="p-2 m-2 ring-1 rounded-sm ring-white peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="zCat">Categorical</label> 
                        </div>
                        <div>
                            <input id="zInd" type="radio" value="index" name="zType" defaultChecked
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer" />
                            <label className="p-2 ring-1 rounded-sm ring-white peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="zInd">Index </label> 
                        </div>
                    </div>
                </div>
            </div> 
            
            <div className='md:flex align-middle p-2'>
                {/* <div className="axis flex p-6">
                    <div className="inputLabel text-xl font-bold"> Scale </div>
                    <select name="scaleCol" className="text-zinc-800 rounded-md mx-2 bg-inherit dark:text-white font-mono"> 
                    <option className="text-zinc-800" value=""> Uniform </option>
                        {dataset.columns.map((d, i) => (<option className="text-zinc-800" value={i} key={i}> {d}</option>))}
                    </select>
                </div> */}
            </div>
            <button className="border-zinc-500 border-2 mx-4 w-1/3 text-white" type="submit"> Build Visualisation </button>
        </form>               
    </>
    );

    return <>
        Loading Data
    </>
}

export default DiscreteController;
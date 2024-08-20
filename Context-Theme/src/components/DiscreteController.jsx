import React, { useState, useEffect } from 'react';
import Alert from './Alert';

function DiscreteController({dataset, setViewportData}) {

    const [alert, setAlert] = useState(null);
    
    useEffect(() => {
        if(alert){
            //render?
            setTimeout(()=> setAlert(null), 5000)
        }
    }, [alert]);

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
        
        //Perform Sanity Checks      
        let alertMessage = ""

        //Perform Sanity Checks
        if(formJson.zCol.length && formJson.zType == "continuous"){
            if(typeof(dataset.at(0, dataset.columns[formJson.zCol])) != typeof(0)){
                alertMessage += "Z Axis (" + dataset.columns[formJson.zCol] + " column) does not have a numerical datatype.\n";
            }
        }

        if(formJson.xCol.length){
            if(formJson.xType == "continuous"){
                if(typeof(dataset.at(0, dataset.columns[formJson.xCol])) != typeof(0)){
                    alertMessage+= "X Axis (" + dataset.columns[formJson.xCol] + " column) does not have a numerical datatype.\n";
                }
            }

        }else{
            alertMessage+= "Please Choose X Column!\n";
        }

        if(alertMessage.length){
            setAlert(alertMessage);
        }else {
            // console.log("setting viewport data")
            setViewportData(formJson)
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

        <Alert alert={alert} />               
    </>
    );

    return <>
        Loading Data
    </>
}

export default DiscreteController;
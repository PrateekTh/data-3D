import React, { useState, useEffect } from 'react';
import Alert from '../Alert';


function ScatterController({dataset, setViewportData}) {
    const [alert, setAlert] = useState(null);
    
    useEffect(() => {
        if(alert){
            setTimeout(()=> setAlert(null), 5000)
        }
    }, [alert]);

    function handleSubmit(e){
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        let alertMessage = "";

        //Perform Sanity Checks
        if(!(formJson.baseScale && formJson.baseScale > 0 && formJson.baseScale <= 10)){
            alertMessage += "Base Scale value must be set in (0, 10].\n";
        }

        if(formJson.yCol.length && formJson.yType == "continuous"){
            if(typeof(dataset.at(0, dataset.columns[formJson.yCol])) != typeof(0)){
                alertMessage += "Y Axis (" + dataset.columns[formJson.yCol] + " column) does not have a numerical datatype.\n";
            }
        }

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
            <div className="axis border-y-2 border-zinc-200 bg-zinc-300 bg-opacity-5 text-sm flex p-3 dark:border-zinc-700">
                <div className="inputLabel align-middle text-lg font-bold p-2">X</div>
                <div>
                    <select name="xCol" className="text-red-500 text-sm rounded-md mx-2 bg-inherit dark:text-red-400 font-bold"> 
                        <option className="text-zinc-800 font-mono" value=""> Please Select</option>
                        {
                            dataset.columns.map((d, i) => (<option className="text-zinc-800 font-mono" value={i} key={i}> {d}</option>))
                        }
                    </select> 
                    <div className="dataType flex h-6 p-2 my-2 font-mono align-middle">
                        <div>
                            <input id="xCont" type="radio" value="continuous" name="xType" 
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer"/>
                            <label className="p-2 my-8 ring-1 rounded-sm ring-white peer-checked:ring-black peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="xCont">Continuous</label> 
                        </div>
                        <div>
                            <input id="xCat" type="radio" value="categorical" name="xType" 
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer"/>
                            <label className="p-2 m-2 ring-1 rounded-sm ring-white peer-checked:ring-black peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="xCat">Categorical</label> 
                        </div>
                        <div>
                            <input id="xInd" type="radio" value="index" name="xType" defaultChecked
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer" />
                            <label className="p-2 ring-1 rounded-sm ring-white peer-checked:ring-black peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="xInd">Index </label> 
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="axis align-middle text-sm flex p-3">
                <div className="inputLabel text-lg font-bold p-2">Y</div>
                <div>
                    <select name="yCol" className="text-green-600 text-sm rounded-md mx-2 bg-inherit dark:text-green-500 font-bold"> 
                        <option className="text-zinc-800 font-mono" value=""> None </option>
                        {
                            dataset.columns.map((d, i) => (<option className="text-zinc-800 font-mono" value={i} key={i}> {d}</option>))
                        }
                    </select> 
                    <div className="dataType flex h-6 p-2 my-2 font-mono align-middle">
                        <div>
                            <input id="yCont" type="radio" value="continuous" name="yType" 
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer"/>
                            <label className="p-2 my-8 ring-1 rounded-sm ring-white peer-checked:ring-black peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="yCont">Continuous</label> 
                        </div>
                        <div>
                            <input id="yCat" type="radio" value="categorical" name="yType" 
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer"/>
                            <label className="p-2 m-2 ring-1 rounded-sm ring-white peer-checked:ring-black peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="yCat">Categorical</label> 
                        </div>
                        <div>
                            <input id="yInd" type="radio" value="index" name="yType" defaultChecked
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer" />
                            <label className="p-2 ring-1 rounded-sm ring-white peer-checked:ring-black peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="yInd">Index </label> 
                        </div>
                    </div>
                </div>
            </div>

            <div className="axis border-y-2 border-zinc-200 bg-zinc-300 bg-opacity-5 flex p-3 text-sm dark:border-zinc-700">
                <div className="inputLabel text-lg font-bold p-2">Z </div>
                <div>
                    <select name="zCol" className="text-blue-600 text-sm rounded-md mx-2 bg-inherit font-bold dark:text-blue-400"> 
                        <option value="" className="text-zinc-800 font-mono"> None </option>
                        {
                            dataset.columns.map((d, i) => (<option className="text-zinc-800 font-mono" value={i} key={i}> {d}</option>))
                        }  
                    </select> 
                    <div className="dataType flex h-6 p-2 my-2 font-mono align-middle">
                        <div>
                            <input id="zCont" type="radio" value="continuous" name="zType" 
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer"/>
                            <label className="p-2 my-8 ring-1 rounded-sm ring-white peer-checked:ring-black peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="zCont">Continuous</label> 
                        </div>
                        <div>
                            <input id="zCat" type="radio" value="categorical" name="zType" 
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer"/>
                            <label className="p-2 m-2 ring-1 rounded-sm ring-white peer-checked:ring-black peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="zCat">Categorical</label> 
                        </div>
                        <div>
                            <input id="zInd" type="radio" value="index" name="zType" defaultChecked
                            className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white hidden peer" />
                            <label className="p-2 ring-1 rounded-sm ring-white peer-checked:ring-black peer-checked:bg-white peer-checked:font-bold peer-checked:text-black" htmlFor="zInd">Index </label> 
                        </div>
                    </div>
                </div>
            </div> 
            
            <div className='md:flex align-middle p-2'>
                <div className="axis md:w-2/5 flex p-2 items-center">
                    <div className="inputLabel text-sm font-bold">Color </div>
                    <select name="colorCol" className="text-zinc-800 text-sm rounded-md mx-2 bg-inherit dark:text-white font-mono w-2/3 truncate"> 
                    <option className="text-zinc-800" value=""> Uniform </option>
                        {
                            dataset.columns.map((d, i) => (<option className="text-zinc-800" value={i} key={i}> {d}</option>))
                        }
                    </select>        
                </div> 
                <div className="axis md:w-3/5 flex p-2 items-center">
                    <div className="inputLabel text-sm font-bold"> Scale </div>
                    <select name="scaleCol" className="text-zinc-800 text-sm rounded-md mx-2 bg-inherit dark:text-white font-mono w-2/3 truncate"> 
                    <option className="text-zinc-800" value=""> Uniform </option>
                        {dataset.columns.map((d, i) => (<option className="text-zinc-800" value={i} key={i}> {d}</option>))}
                    </select>x 
                    <input name='baseScale' type='number' step='0.001' defaultValue={1} className="font-mono text-sm bg-inherit text-inherit py-1 px-2 ml-2 min-w-10 max-w-12 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "/>
                </div>
            </div>
            <div className='px-4'>
                <button className="border-zinc-500 border-2 w-1/2 bg-inherit dark:text-white" type="submit"> Build Visualisation </button>

                <Alert alert={alert} /> 
            </div>
        </form>           
    </>
    );

    return <>
        Loading Data
    </>
}

export default ScatterController;
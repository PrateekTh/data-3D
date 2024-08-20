import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import Viewport from "./Viewport";
import * as dfd from "danfojs/dist/danfojs-browser/src";
import { ViewportDataProvider } from "../context/ViewportContext";
import ScatterController from "./ScatterController";
import DiscreteController from "./DiscreteController";
import HomogenousController from "./HomogenousController";

function Controller({dataset, setViewportData, plotType}){
    console.log(plotType + " plot");
    switch (plotType) {
        case 'scatter':
            return <ScatterController dataset={dataset} setViewportData={setViewportData} />        
        case 'discrete':
            return <DiscreteController dataset={dataset} setViewportData={setViewportData} />
        case 'homogenous':
            return <HomogenousController dataset={dataset} setViewportData={setViewportData} />
        default:
            return (
                <div className="text-red-600 text-lg p-4 text-center font-semibold">
                    Please Choose a plot type!
                </div>
            )
    }
}

//To Add: More User Customizability and Control
export default function Card({file}) {

    const {user, dataset, setDataset} = useContext(UserContext);
    const [data, setData] = useState();
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [dataTypes, setDataTypes] = useState(["","","", "", ""]);
    const [plotType, setPlotType] = useState("");
	const layout = "grid";
	const onSelectPoint = (point) => {setSelectedPoint(point)};

    useEffect(() => {
        dfd.readCSV(file).then((dataset) => setDataset(dataset));        
    }, []);

    // setting columns for data (to be done via components)
    useEffect(()=>{
        let sub_df = new dfd.DataFrame();
        if(dataset.index){
            // console.log(dataset);
        }
        setData(sub_df)
    }, [dataset])

    function setViewportData(userPrefs){
        console.log(userPrefs);
        // console.log(dataTypes);
        let sub_df = dataset.loc({columns: [dataset.columns[userPrefs.xCol]]});
        let yType, zType, cType, sType;
        if(userPrefs.yCol.length) {
            sub_df.addColumn("Y", dataset.column(dataset.columns[userPrefs.yCol]), { inplace: true });
            yType = userPrefs.yType;
        }
        if(userPrefs.zCol.length) {
            sub_df.addColumn("Z", dataset.column(dataset.columns[userPrefs.zCol]), { inplace: true });
            zType = userPrefs.zType;
        }

        if(userPrefs.colorCol.length) {
            sub_df.addColumn( "Color", dataset.column(dataset.columns[userPrefs.colorCol]), { inplace: true })
            cType = "continuous";
        };

        if(userPrefs.scaleCol.length) {
            sub_df.addColumn( "Scale", dataset.column(dataset.columns[userPrefs.scaleCol]), { inplace: true });
            sType = "continuous";
        }
        setDataTypes([userPrefs.xType, yType, zType, cType, sType]);

        // console.log(sub_df);
        setData(sub_df);
    }

    return (
        <div className="duration-300 m-6 bg-white border-2 bg-opacity-90 border-zinc-400 rounded-sm shadow xl:flex dark:bg-black dark:bg-opacity-90 dark:border-zinc-300">
            <div className="xl:w-2/6 items-center xl:border-r-2 border-zinc-200 dark:border-zinc-600">
                <div className="flex gap-4 p-5">
                    <div className="grow text-xl font-semibold text-zinc-900 dark:text-white">
                        <span className="text-4xl font-bold text-zinc-900 dark:text-white">                        
                            {user.projectName}
                        </span>
                    </div>
                    <span className="basis-1/6 align-middle inputLabel text-xl font-bold">Plot Type </span> 
                    <select name="val" className="text-zinc-800 rounded-md mb-2 bg-inherit dark:text-white font-mono" onChange={(e)=>setPlotType(e.target.value)}> 
                        <option value="" className="text-black"> Please Select</option>
                        <option value="scatter" className="text-black"> Scatter</option>
                        <option value="discrete" className="text-black"> Distribution</option>
                        <option value="homogenous" className="text-black"> Homogenous</option>    
                    </select>
                </div>
                <div className="userInputBox text-left">
                    <Controller dataset = {dataset} setViewportData = {setViewportData} plotType={plotType}/>
                </div>
                {/* <button href="#" className=" m-4 text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none 
                focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800">
                    See Details
                </button> */}
            </div>
            <div className="p-4 border-zinc-200 h-full xl:w-3/5 rounded-xl overflow-hidden" >
                <ViewportDataProvider value={{data, dataTypes, layout, selectedPoint, plotType, onSelectPoint}}>
                    <Viewport/>
                </ViewportDataProvider>
            </div>            
        </div>
    );
}

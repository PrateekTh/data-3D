import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import Viewport from "./Viewport";
import * as dfd from "danfojs/dist/danfojs-browser/src";
import { ViewportDataProvider } from "../context/ViewportContext";
import ScatterController from "./ScatterController";
import DiscreteController from "./DiscreteController";
import HomogenousController from "./HomogenousController";

function Controller({dataset, setViewportData, plotType, setUser}){
    switch (plotType) {
        case 'scatter':
            return <ScatterController dataset={dataset} setViewportData={setViewportData} />        
        case 'discrete':
            return <DiscreteController dataset={dataset} setViewportData={setViewportData} />
        case 'homogenous':
            return <HomogenousController dataset={dataset} setViewportData={setViewportData} />
        default:
            return (
                <div className=" flex-col space-y-4 text-zinc-800 text-md font-mono p-6 text-left dark:text-white">
                    <div className="text-xl font-bold text-zinc-700 dark:text-zinc-400"> Select a plot type to continue.</div>

                    <div>
                        <div className="text-xl font-bold text-purple-600 dark:text-purple-400"> Scatter Plots</div>
                        <div>
                            Each entry in data serves as a separate sphere datapoint in space, with dimensions being linked to its position and properties.
                        </div>
                    </div>
                    <div>
                        <div className="text-xl font-bold text-purple-600 dark:text-purple-400"> Distribution Plots</div>
                        <div>
                            A count based distribution plot, which displays the number of entries in a sub-range as the height of a datapoints. Each datapoint is cylindrical, and support upto two dimensions.
                        </div>
                    </div>

                    <button className="border-zinc-500 font-bold border-2 my w-1/2 bg-inherit dark:text-white" onClick={()=>setUser(null)}> Reset Data </button>

                </div>
            )
    }
}

//To Add: More User Customizability and Control
export default function Card({file}) {

    const {user, setUser, dataset, setDataset} = useContext(UserContext);
    const [data, setData] = useState();
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [dataTypes, setDataTypes] = useState(["","","", "", ""]);
    const [plotType, setPlotType] = useState("");
    const [baseScale, setBaseScale] = useState(1);
	const onSelectPoint = (point) => {setSelectedPoint(point)};

    useEffect(() => {
        dfd.readCSV(file).then((dataset) => setDataset(dataset));        
    }, []);

    //Set Data to initialize the Viewport
    useEffect(()=>{
        let sub_df = new dfd.DataFrame();
        setData(sub_df)
    }, [dataset])

    function setViewportData(userPrefs){
        // console.log(userPrefs);
        let sub_df = dataset.loc({columns: [dataset.columns[userPrefs.xCol]]});
        let yType, zType, cType, sType;

        // Replace ifs with ternaries
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
            cType = "color";
        };

        if(userPrefs.scaleCol.length) {
            sub_df.addColumn( "Scale", dataset.column(dataset.columns[userPrefs.scaleCol]), { inplace: true });
            sType = "continuous";
        }
        setDataTypes([userPrefs.xType, yType, zType, cType, sType]);
        setBaseScale(userPrefs.baseScale);
        // console.log(sub_df);
        setData(sub_df);
    }

    return (
        <div className="duration-300 m-4 h-full bg-white border-2 bg-opacity-90 border-zinc-400 rounded-sm shadow xl:flex dark:bg-black dark:bg-opacity-90 dark:border-zinc-300">
            <div className="xl:w-2/6 items-center xl:border-r-2 border-zinc-200 dark:border-zinc-600">
                <div className="flex items-center gap-4 p-4">
                    <div className="grow font-semibold text-zinc-900 dark:text-white">
                        <span className="text-xl font-bold text-zinc-900 dark:text-white">                        
                            {user.projectName}
                        </span>
                    </div>
                    <span className="basis-1/6 text-right inputLabel text-md font-bold">Type</span> 
                    <select name="val" className="w-1/3 text-zinc-800 text-xs rounded-md bg-inherit dark:text-white font-mono" onChange={(e)=>setPlotType(e.target.value)}> 
                        <option value="" className="text-black"> Please Select</option>
                        <option value="scatter" className="text-black"> Scatter</option>
                        <option value="discrete" className="text-black"> Distribution</option>
                        <option value="homogenous" className="text-black"> Homogenous</option>    
                    </select>
                </div>
                <div className="userInputBox text-left">
                    <Controller dataset = {dataset} setViewportData = {setViewportData} plotType={plotType} setUser={setUser}/>
                </div>

            </div>
            
            <div className="p-4 border-zinc-200 h-full xl:w-4/5 rounded-xl overflow-hidden" >
                <ViewportDataProvider value={{data, dataTypes, selectedPoint, baseScale, plotType, onSelectPoint}}>
                    <Viewport/>
                </ViewportDataProvider>
            </div>            
        </div>
    );
}

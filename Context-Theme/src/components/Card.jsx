import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import Viewport from "./Viewport";
import * as dfd from "danfojs/dist/danfojs-browser/src";
import { ViewportDataProvider } from "../context/ViewportContext";
import ScatterController from "./ScatterController";

//To Add: More User Customizability and Control
export default function Card() {

    const filename = "h_weather.csv";
    const {user, dataset, setDataset} = useContext(UserContext);
    const [data, setData] = useState();
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [dataTypes, setDataTypes] = useState(['index','continuous','continuous']);
	const layout = "grid";
	const onSelectPoint = (point) => {setSelectedPoint(point)};

    useEffect(() => {
        dfd.readCSV("/" + filename).then((dataset) => setDataset(dataset));        
    }, []);

    // setting columns for data (to be done via components)
    useEffect(()=>{
        let sub_df = [0];
        if(dataset.index){
            // console.log(dataset);
            sub_df = dataset.loc({columns: [dataset.columns[0], dataset.columns[2], dataset.columns[3]]})
        }
        setData(sub_df)
    }, [dataset])

    function setViewportData(userPrefs){
        console.log(userPrefs);
        setDataTypes([userPrefs.xType, userPrefs.yType, userPrefs.zType, "categorical", "continuous"]);
        // console.log(dataTypes);
        let sub_df = dataset.loc({columns: [dataset.columns[userPrefs.xCol]]});
        console.log(dataset.column(dataset.columns[userPrefs.yCol]));
        sub_df.addColumn(dataset.columns[userPrefs.yCol], dataset.column(dataset.columns[userPrefs.yCol]), { inplace: true });
        sub_df.addColumn(dataset.columns[userPrefs.zCol], dataset.column(dataset.columns[userPrefs.zCol]), { inplace: true });
        sub_df.addColumn( "Color", dataset.column(dataset.columns[userPrefs.colorCol]), { inplace: true });
        sub_df.addColumn( "Scale", dataset.column(dataset.columns[userPrefs.scaleCol]), { inplace: true });

        console.log(sub_df);
        setData(sub_df);
    }

    return (
        <div className="py-4 duration-300 m-6 bg-white border bg-opacity-50 border-zinc-200 rounded-lg shadow lg:flex dark:bg-zinc-900 dark:bg-opacity-50 dark:border-zinc-700">
            <div className="lg:w-2/6 content-center lg:border-r-2 border-zinc-200 dark:border-zinc-600">
                <h5 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    <span className="text-4xl font-bold text-zinc-900 dark:text-white">                        
                        {user.username} Project
                    </span>
                </h5>
                <span className="inputLabel text-xl font-bold">Plot Type </span> 
                <select name="xCol" className="text-zinc-800 rounded-md mb-2 bg-inherit dark:text-white font-mono"> 
                    <option value="" className="text-black"> Please Select</option>
                    <option value="1" className="text-black"> Scatter</option>
                    <option value="2" className="text-black"> Discrete</option>
                    <option value="3" className="text-black"> Homogenous</option>    
                </select>
                
                <div className="userInputBox text-left">
                    <ScatterController dataset = {dataset} setViewportData = {setViewportData} />
                </div>
                {/* <button href="#" className=" m-4 text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none 
                focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800">
                    See Details
                </button> */}
            </div>
            <div className="p-4 border-zinc-200 h-full lg:w-3/5 rounded-lg overflow-hidden" >
                <ViewportDataProvider value={{data, dataTypes, layout, selectedPoint, onSelectPoint}}>
                    <Viewport/>
                </ViewportDataProvider>
            </div>            
        </div>
    );
}

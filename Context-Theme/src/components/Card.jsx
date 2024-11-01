import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import Viewport from "./Viewport";
import * as dfd from "danfojs/dist/danfojs-browser/src";
import { ViewportDataProvider } from "../context/ViewportContext";
import Controller from "./Controller"

//To Add: More User Customizability and Control
export default function Card({file}) {

    const {user, setUser, dataset, setDataset} = useContext(UserContext);
    const [userPrefs, setUserPrefs] = useState(null);
    const [data, setData] = useState();
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [dataTypes, setDataTypes] = useState(["","","", "", ""]);
    const [plotType, setPlotType] = useState("");
    const [baseScale, setBaseScale] = useState(1);
	const onSelectPoint = (point) => {
        // console.log(point);
        setSelectedPoint(point);
    };

    useEffect(() => {
        // console.log(file);
        if(file.type === 'text/csv') dfd.readCSV(file).then((dataset) => setDataset(dataset));
        else if(file.type === 'application/json') dfd.readJSON(file).then((dataset) => setDataset(dataset));
        else if(file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') dfd.readExcel(file).then((dataset) => setDataset(dataset));
    }, []);

    //Set Data to initialize the Viewport
    useEffect(()=>{
        let sub_df = new dfd.DataFrame();
        setData(sub_df)
        // console.log(dataset)
    }, [dataset])

    function setViewportData(userPrefs){
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
        setUserPrefs({ 
            x: dataset.columns[userPrefs.xCol], 
            y: dataset.columns[userPrefs.yCol],
            z: dataset.columns[userPrefs.zCol],
            color: dataset.columns[userPrefs.colorCol],
            scaleCol: dataset.columns[userPrefs.scaleCol]
        });
        // console.log(sub_df);
        setData(sub_df);
    }

    return (
        <div className="duration-300 lg:m-4 h-full bg-white border-2 bg-opacity-90 border-purple-400 rounded-sm shadow xl:flex dark:bg-black dark:bg-opacity-90 dark:border-zinc-400">
            <div className="xl:w-2/6 items-center xl:border-r-2 border-purple-400 dark:border-zinc-400">
                <div className="flex items-center gap-4 p-4">
                    <div className="grow font-semibold text-zinc-900 dark:text-white">
                        <span className="text-xl font-bold text-zinc-900 dark:text-white">                        
                            {user.projectName}
                        </span>
                    </div>
                    <span className="basis-1/6 text-right inputLabel text-md font-bold">Type</span> 
                    <select name="val" className="w-1/3 text-zinc-800 text-xs rounded-md bg-inherit dark:text-white font-base" value={plotType} onChange={(e)=>setPlotType(e.target.value)}> 
                        <option value="" className="text-black"> None </option>
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
                    <Viewport userPrefs = {userPrefs}/>
                </ViewportDataProvider>
            </div>            
        </div>
    );
}

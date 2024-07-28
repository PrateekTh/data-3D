import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import Viewport from "./Viewport";
import * as dfd from "danfojs/dist/danfojs-browser/src";
import { ViewportDataProvider } from "../context/ViewportContext";

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
        dfd.readCSV("/" + filename).then((dataset) => setDataset(dataset)).then(console.log(dataset));        
    }, []);

    useEffect(()=>{
        let sub_df = [0];
        if(dataset.index){
            console.log(dataset);
            sub_df = dataset.loc({columns: [dataset.columns[0], dataset.columns[2], dataset.columns[3]]})
        }
        setData(sub_df)
    }, [dataset])

    return (
        <div className="duration-300 m-6 flex bg-white border border-zinc-200 rounded-lg shadow dark:bg-zinc-900 dark:border-zinc-700">
            
            <div className="p-5 w-2/6 content-center">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    <span className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">                        
                        {user.username}'s Dashboard
                    </span>
                        {}
                    </h5>
                </a>
                <div className="items-center mt-2.5 mb-5">
                    <span className="bg-zinc-100 text-zinc-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-200 dark:text-zinc-800 ml-3">
                        Dataset Analysis
                    </span>

                </div>

                <p align ='justify' className="font-mono">
                
                </p>
                <button href="#" className=" m-4 text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none 
                focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800">
                    See Details
                </button>
            </div>
            
            <div className="p-4 h-full w-3/5 rounded-lg overflow-hidden" >
                <ViewportDataProvider value={{data, dataTypes, layout, selectedPoint, onSelectPoint}}>
                    <Viewport/>
                </ViewportDataProvider>
            </div>

            
        </div>
    );
}

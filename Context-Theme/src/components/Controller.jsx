import ScatterController from "./controllers/ScatterController";
import DiscreteController from "./controllers/DiscreteController";
import HomogenousController from "./controllers/HomogenousController";

export default function Controller({dataset, setViewportData, plotType, setUser}){
    switch (plotType) {
        case 'scatter':
            return <ScatterController dataset={dataset} setViewportData={setViewportData} />        
        case 'discrete':
            return <DiscreteController dataset={dataset} setViewportData={setViewportData} />
        case 'homogenous':
            return <HomogenousController dataset={dataset} setViewportData={setViewportData} />
        default:
            return (
                <div className=" flex-col space-y-4 text-zinc-800 text-md font-base p-6 text-left dark:text-white">
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
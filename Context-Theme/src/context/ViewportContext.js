import { createContext, useContext } from 'react';

export const ViewportContext = createContext({
    data:[],
    dataTypes:[],
    plotType:"scatter",
    // layout:"grid",
    baseScale:1,
    selectedPoint: null,
    onSelectPoint:() => {console.log("Selected")}
})

export const ViewportDataProvider = ViewportContext.Provider;

export default function useViewportData(){
    return useContext(ViewportContext);
}
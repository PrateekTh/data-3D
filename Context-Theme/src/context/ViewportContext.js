import { createContext, useContext } from 'react';

export const ViewportContext = createContext({
    data:[],
    layout:"",
    selectedPoint: 0,
    onSelectPoint:() => {}
})

export const ViewportContextProvider = ViewportContext.Provider;

export default function useViewport(){
    return useContext(ViewportContext);
}
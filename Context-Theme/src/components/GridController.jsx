function GridController() {
    return ( <>
        <div className="axis mb-6">
            <div className="inputLabel text-xl font-bold">X Axis </div>
            <select name="xCol" className="text-zinc-800 rounded-md mx-2"> 
                <option value=""> Please Select</option>
                <option value="1"> Option 1</option>
                <option value="2"> Option 2</option>
                <option value="3"> Option 3</option>    
            </select> 
            Normalize <input type="checkbox" name="normalize" className="rounded-lg text-zinc-600 focus:ring-0 focus:ring-white"/>
            <div className="dataType">
                <input id="continuous" type="radio" name="type-x" className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white"/>
                <label for="continuous">Continuous</label> 
                <input id="categorical" type="radio" name="type-x" className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white"/>
                <label for="categorical">Categorical</label> 
                <input id="index" type="radio" name="type-x" className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white"/>
                <label for="index">Index</label> 
            </div>
        </div>

        <div className="axis mb-6">
            <div className="inputLabel text-xl font-bold">Y Axis </div>
            <select name="yCol" className="text-zinc-800 rounded-md mx-2"> 
                <option value=""> Please Select</option>
                <option value="1"> Option 1</option>
                <option value="2"> Option 2</option>
                <option value="3"> Option 3</option>    
            </select> 
            Normalize <input type="checkbox" name="normalize" className="rounded-lg text-zinc-600 focus:ring-0 focus:ring-white"/>
            <div className="dataType">
                <input id="continuous" type="radio" name="type-y" className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white"/>
                <label for="continuous">Continuous</label> 
                <input id="categorical" type="radio" name="type-y" className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white"/>
                <label for="categorical">Categorical</label> 
                <input id="index" type="radio" name="type-y" className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white"/>
                <label for="index">Index</label> 
            </div>
        </div>

        <div className="axis mb-6">
            <div className="inputLabel text-xl font-bold">Z Axis </div>
            <select name="zCol" className="text-zinc-800 rounded-md mx-2"> 
                <option value=""> Please Select</option>
                <option value="1"> Option 1</option>
                <option value="2"> Option 2</option>
                <option value="3"> Option 3</option>    
            </select> 
            Normalize <input type="checkbox" name="normalize" className="rounded-lg text-zinc-600 focus:ring-0 focus:ring-white"/>
            <div className="dataType">
                <input id="continuous" type="radio" name="type-z" className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white"/>
                <label for="continuous">Continuous</label> 
                <input id="categorical" type="radio" name="type-z" className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white"/>
                <label for="categorical">Categorical</label> 
                <input id="index" type="radio" name="type-z" className="mx-2 text-zinc-600 focus:ring-0 focus:ring-white"/>
                <label for="index">Index</label> 
            </div>
        </div>    
    
    
    
    
    </> );
}

export default GridController;
// add all functions - async - to process data here

function normalizeField(df, col, nRange){
	return new Promise(function(resolve, reject){
		let s;
		// Categorising Check for color
		if(iRef[col] == 'Color') {
			nRange = 1;
			if(typeof(df.iat(0, col)) != typeof(0)){
				s = categorizeField(df, col, 1).data;
			}else s = df.column(iRef[col]);
		}else{
			s = df.column(iRef[col]);
		}

		//Set datatype & account for NAs
		s = s.asType("float32");
		s = s.fillNa(0);
	
		//Find Max and Min
		const sMax = s.max();
		const sMin = s.min();
		
		// create a function scoped worker
		const worker = new Worker(new URL('./normaliseWorker.js', import.meta.url))
		const val = s.values;
		worker.postMessage({val, sMax, sMin, nRange});
		// console.log(s)
		//Normalize all values based on Max and Min
		worker.onmessage = (message) =>{
			// console.log(message.data);
			resolve (message.data);
			worker.terminate;
		}

		worker.onerror = reject;
		// console.log(s)
	})
}

function indicizeField(numPoints){
	return new dfd.Series(Array.from(Array(numPoints).keys()))
}

// Divide a field into steps
function discretizeField(df, col, nRange, dSteps){
	const s = normalizeField(df, col, nRange); // [-50, 50]
	const discreteDiv = nRange/dSteps;
	for(let i = 0; i<s.count(); i++){
		s.values[i] = Math.floor(s.values[i]/discreteDiv);
		// df.values[i][col] = i;
	}
	// console.log(s);
	return s;
}

function categorizeField(df, col, catGap){	
	let s = df.column(iRef[col]);
	//iterate over the series to categorize each field into a map (str, array[2]) i.e. ["category name"] -> [catID(int), totalCount(int)]
	const categoryList = new Map();
	let catCount = 0;

	for(let i = 0; i<s.count(); i++){
		if(categoryList.get(s.values[i])){
			const cInfo = categoryList.get(s.values[i]);
			s.values[i] = (cInfo[0]) * catGap;
			categoryList.set(s.values[i], [cInfo[0], cInfo[1] + 1])
		}else{
			categoryList.set(s.values[i], [catCount, 1]);
			s.values[i] = catCount;
			catCount++;
		}
	}

	s = s.asType("float32");

	console.log(s);
	return {
		data: s,
		map: categoryList
	};
}

function uniformizeField(numPoints, col){
	let val = 0;
	if(iRef[col] == 'Scale') val = 10;
	let arr = Array(numPoints).fill(val);
	let s = new dfd.Series(arr)
	return s;
}

export { normalizeField, indicizeField, discretizeField, categorizeField, uniformizeField}
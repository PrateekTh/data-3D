// add all functions - async - to process data here
import * as dfd from 'danfojs/dist/danfojs-browser/src';
import {iRef} from '../modules/layouts.js' // need updated references from layouts

function normalizeField(df, col, nRange, scale = 1){
	return new Promise(async function(resolve, reject){
		let s = df;
		if(df.column){
			s = df.column(iRef[col])
		}

		

		//Set datatype & account for NAs
		s = s.asType("float32");
		s = s.fillNa(0);

		//Find Max and Min
		let sMax = s.max();
		let sMin = s.min();

		// if this is the Scale column, we need to multiply each element with the scale as well.
		// instead of doing that, we'll divide the max and min by the scale, which will have the same effect, without the extra step.
		if(iRef[col] == 'Scale') {
			// console.log(scale)
			sMax = sMax/scale;
			sMin = sMin/scale;
		}		
		
		// create a function scoped worker
		const worker = new Worker(new URL('./normalizeWorker.js', import.meta.url), {
			// type: 'module'
		})
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
	return new Promise(function(resolve, reject){
		let s = df.column(iRef[col]);
		//iterate over the series to categorize each field into a map (str, array[2]) 
		// i.e. ["category name"] -> [catID(int), totalCount(int)]
		const worker = new Worker(new URL('./categorizeWorker.js', import.meta.url))
		const val = s.values;
		worker.postMessage({val, catGap});
		worker.onmessage = (message) =>{
			// console.log(message.data);
			if (iRef[col] == "Color"){
				let temp = new dfd.Series(message.data);
				resolve(normalizeField(temp, 3, 1));
			}else resolve(message.data);
			worker.terminate;
		}
		worker.onerror = reject;
		// console.log(s);
	})
	
}

function uniformizeField(numPoints, col){
	let val = 0;
	if(iRef[col] == 'Scale') val = 10;
	let arr = Array(numPoints).fill(val);
	let s = new dfd.Series(arr)
	return s;
}

export { normalizeField, indicizeField, discretizeField, categorizeField, uniformizeField}
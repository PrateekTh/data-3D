import {useEffect, useState } from 'react';
import useViewportData from '../context/ViewportContext';
import * as dfd from 'danfojs/dist/danfojs-browser/src';

// config variables
const categoryGap = 10;
const discreteSteps = 30;
const normalizeRange = 100;
const iRef = ['X', 'Y', 'Z', 'Color', 'Scale'];
const iTemp = ['x', 'y', 'z', 'color', 'scale'];

// optimisation required for 40k+ datapoints - done
// opitmisation required for minor UX lag

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
		const worker = new Worker(new URL('../workers/normaliseWorker.js', import.meta.url), {
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

async function scatterLayout(data, dataTypes, setLayoutData) {
	let numPoints = data.index.length;
	if(numPoints == 0) numPoints = 1;
	// const [normalizeWorker] = useWorker(normalizeField);

	// console.log(dataTypes);
	
	iRef[0] = data.columns[0];
	
	let temp = {
		size: Array(numPoints).fill(0)
	};

	let layoutData = new dfd.DataFrame(temp);

	//processing each column - with web workers
	for(let i = 0; i < dataTypes.length; i++){
		switch (dataTypes[i]){
			case 'categorical':
				// console.log("Categorizing: " + i + " for " + iTemp[i] + " - " + iRef[i]);
				layoutData.addColumn(iTemp[i], await categorizeField(data, i, categoryGap).data, { inplace: true });
				break;
			case 'continuous':
				// console.log("Normalizing: " + i + " for " + iTemp[i] + " - " + iRef[i]);
				layoutData.addColumn(iTemp[i], await normalizeField(data, i, normalizeRange), { inplace: true });
				break;
			case 'index':
				// console.log("Indicizing: " + i + " for " + iTemp[i] + " - " + iRef[i]);
				layoutData.addColumn(iTemp[i], await indicizeField(numPoints), { inplace: true });
				break;
			default: 
				// console.log("Uniformizing: " + i + " for " + iRef[i]);
				layoutData.addColumn(iTemp[i], await uniformizeField(numPoints, i), { inplace: true });
		}
	}
	// console.log(layoutData);
	// return layoutData;
	setLayoutData(layoutData);
}

async function discreteLayout(data, dataTypes, setLayoutData) {
	let numPoints = data.index.length;
	iRef[0] = data.columns[0];
	
	let temp;
	if(data.index.length < 1){
		//Create an empty dataframe
		temp = new dfd.DataFrame([[0,0,0,0,0]], {index:[0], columns:iTemp, dtypes:["int32","int32","int32","int32","int32"] })
		numPoints = 1;
	}else{
		for(let i = 0; i < dataTypes.length; i++){
			switch (dataTypes[i]){
				case 'categorical':
					// console.log("Categorizing: " + i + " - " + iRef[i]);
					data.addColumn(iTemp[i], categorizeField(data, i, 1).data, { inplace: true });
					break;
				case 'continuous':
					// console.log("Discretizing: " + i + " - " + iRef[i]);
					data.addColumn(iTemp[i], discretizeField(data, i, normalizeRange, discreteSteps), { inplace: true });
					break;
				case 'index':
					// console.log("Indicizing: " + i + " - " + iRef[i]);
					data.addColumn(iTemp[i], indicizeField(numPoints), { inplace: true });
					break;
				case 'count':
					// console.log("To Count: "+ i + " - " + iRef[i]);
					break;
				default: 
					// console.log("Uniformizing: " + i + " for " + iRef[i]);
					data.addColumn(iTemp[i], uniformizeField(numPoints), { inplace: true });
			}
		}
	
		temp = data.loc("x", "z");
	}
	
	// add an empty column to store counts
	temp.addColumn("weights", Array(numPoints).fill(1), {inplace: true});

	// calculate frequencies
	const layoutData = temp.groupby(["x", "z"]).count();
	layoutData.rename({"weights_count":"scale"}, {inplace: true});

	let arr = Array(layoutData.index.length).fill(0);
	layoutData.addColumn("y", arr, {inplace: true});
	layoutData.addColumn("color", arr, {inplace: true});

	setLayoutData(layoutData);
}

export const useLayout = ({ data }) => {
	const {dataTypes, plotType} = useViewportData();
	const [layoutData, setLayoutData] = useState(null);
	data.dropNa({ axis: 1, inplace:true });
	let temp = null;
	useEffect( () => {
	
		switch (plotType) {
		case 'discrete':
			discreteLayout(data, dataTypes, setLayoutData);
			break;
		case 'scatter':
			scatterLayout(data, dataTypes, setLayoutData);
			break;
		default: {
			// scatterLayout(data, dataTypes, setLayoutData);
		}
		}
	}, [data, plotType]);

	// console.log(layoutData)
	return layoutData;
};
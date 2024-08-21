import React, {useEffect, useState } from 'react';
import useViewportData from '../context/ViewportContext';
import * as dfd from 'danfojs/dist/danfojs-browser/src'

// config variables
const categoryGap = 10;
const discreteSteps = 30;
const normalizeRange = 100;
const iRef = ['X', 'Y', 'Z', 'Color', 'Scale'];
const iTemp = ['x', 'y', 'z', 'color', 'scale'];

// optimisation required for 40k+ datapoints
function normalizeField(df, col, nRange){
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

	//Normalize all values based on Max and Min
	for(let i = 0; i<s.count(); i++){
		s.values[i] = nRange * (s.values[i] - sMin)/(sMax - sMin);
	}
	// console.log(s)
	return s;
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
	// console.log(s);
	return s;
}

function scatterLayout(data, dataTypes) {
	let numPoints = data.index.length;
	if(numPoints == 0) numPoints = 1;
	// console.log(dataTypes);
	
	iRef[0] = data.columns[0];
	
	let temp = {
		size: Array(numPoints).fill(0)
	};

	let layoutData = new dfd.DataFrame(temp);

	//processing each column
	for(let i = 0; i < dataTypes.length; i++){
		switch (dataTypes[i]){
			case 'categorical':
				// console.log("Categorizing: " + i + " for " + iTemp[i] + " - " + iRef[i]);
				layoutData.addColumn(iTemp[i], categorizeField(data, i, categoryGap).data, { inplace: true });
				break;
			case 'continuous':
				// console.log("Normalizing: " + i + " for " + iTemp[i] + " - " + iRef[i]);
				layoutData.addColumn(iTemp[i], normalizeField(data, i, normalizeRange), { inplace: true });
				break;
			case 'index':
				// console.log("Indicizing: " + i + " for " + iTemp[i] + " - " + iRef[i]);
				layoutData.addColumn(iTemp[i], indicizeField(numPoints), { inplace: true });
				break;
			default: 
				console.log("Uniformizing: " + i + " for " + iRef[i]);
				layoutData.addColumn(iTemp[i], uniformizeField(numPoints, i), { inplace: true });
		}
	}
	// console.log(layoutData);
	return layoutData;
}

function discreteLayout(data, dataTypes) {
	let numPoints = data.index.length;
	iRef[0] = data.columns[0];

	// console.log(dataTypes.length);

	for(let i = 0; i < dataTypes.length; i++){
		//Only x and z are needed, so i should ditch the for loop?
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
				console.log("To Count: "+ i + " - " + iRef[i]);
				break;
			default: 
				console.log("Uniformizing: " + i + " for " + iRef[i]);
				data.addColumn(iTemp[i], uniformizeField(numPoints), { inplace: true });
		}
	}

	// console.log(data);
	let temp;
	if(data.index.length < 1){
		//Create an empty dataframe
		temp = new dfd.DataFrame([[0,0,0,0,0]], {index:[0], columns:iTemp, dtypes:["int32","int32","int32","int32","int32"] })
		numPoints = 1;
	}else{
		temp = data.loc("x", "z");
	}

	let arr =  Array(numPoints).fill(1);

	temp.addColumn("weight", arr, {inplace: true});

	const layoutData = temp.groupby(["x", "z"]).count();
	layoutData.rename({"weight_count":"scale"}, {inplace: true});

	arr = Array(layoutData.index.length).fill(0);
	layoutData.addColumn("y", arr, {inplace: true});
	layoutData.addColumn("color", arr, {inplace: true});

	return layoutData;
}

export const useLayout = ({ data }) => {
	const {dataTypes, plotType} = useViewportData();
	const [layoutData, setLayoutData] = useState(null);
	data.dropNa({ axis: 1, inplace:true });

	useEffect(() => {
		switch (plotType) {
		case 'discrete':
			setLayoutData(discreteLayout(data, dataTypes));
			break;
		case 'scatter':
			setLayoutData(scatterLayout(data, dataTypes));
			break;
		default: {
			setLayoutData(scatterLayout(data, dataTypes));
		}
		}
	}, [data, plotType]);

	// console.log(layoutData)
	return layoutData;
};
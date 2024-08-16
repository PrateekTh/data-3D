import React, {useEffect, useState } from 'react';
import useViewportData from '../context/ViewportContext';
import * as dfd from 'danfojs/dist/danfojs-browser/src'

// config variables
const categoryGap = 10;
const discreteSteps = 20;
const normalizeRange = 150;
const iRef = ['X', 'Y', 'Z', 'Color', 'Scale'];


function normalizeField(df, col, nRange){
	const s = df.column(iRef[col]);

	const sMax = s.max();
	const sMin = s.min();

	for(let i = 0; i<s.count(); i++){
		s.values[i] = nRange * (s.values[i] - sMin)/(sMax - sMin);
	}
	// console.log(s)
	return s;
}

function indicizeField(numPoints){
	let arr = Array(numPoints).fill(0);
	let s = new dfd.Series(arr)

	for(let i = 0; i<s.count(); i++){
		s.values[i] = i;
	}
	// console.log(s);
	return s;
}

//to divide a given continuous field to sections
function discretizeField(df, col, nRange, dSteps){
	const s = normalizeField(df, col, nRange); // [-50, 50]
	const discreteDiv = nRange/dSteps;
	for(let i = 0; i<s.count(); i++){
		s.values[i] = Math.floor(s.values[i]/discreteDiv);
		// df.values[i][col] = i;
	}
	console.log(s);
	return s;
}

function categorizeField(df, col, catGap){	
	const s = df.column(iRef[col]);
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

	// console.log(s);
	return {
		data: s,
		map: categoryList
	};
}

function uniformizeField(numPoints){
	let arr = Array(numPoints).fill(0);
	let s = new dfd.Series(arr)
	// console.log(s);
	return s;
}

function scatterLayout(data, dataTypes) {
	const numPoints = data.index.length;
	// console.log(dataTypes);
	/*
		Option 1: fix the name of x when setting data (Card/setViewportData) - necessary
		Option 2: Uniformize when setting the data (Card/setViewportData).
		Option 3: Modify dataframe itself, instead of adding 5 new processed coordinate fields here.
		Option 4 [NEW] : Create a new dataframe and return it here
	*/

	iRef[0] = data.columns[0];
	const iTemp = ['x', 'y', 'z', 'color', 'scale'];
	
	let temp = {
		size: Array(numPoints).fill(0)
	};

	let layoutData = new dfd.DataFrame(temp);

	//processing each column
	for(let i = 0; i < dataTypes.length; i++){
		switch (dataTypes[i]){
			case 'categorical':
				console.log("Categorizing: " + i + " for " + iTemp[i] + " - " + iRef[i]);
				layoutData.addColumn(iTemp[i], categorizeField(data, i, categoryGap).data, { inplace: true });
				break;
			case 'continuous':
				console.log("Normalizing: " + i + " for " + iTemp[i] + " - " + iRef[i]);
				layoutData.addColumn(iTemp[i], normalizeField(data, i, normalizeRange), { inplace: true });
				break;
			case 'index':
				console.log("Indicizing: " + i + " for " + iTemp[i] + " - " + iRef[i]);
				layoutData.addColumn(iTemp[i], indicizeField(numPoints), { inplace: true });
				break;
			default: 
				console.log("Uniformizing: " + i + " for " + iRef[i]);
				layoutData.addColumn(iTemp[i], uniformizeField(numPoints), { inplace: true });
		}
	}
	// console.log(layoutData);
	return layoutData;
}

function discreteLayout(data, dataTypes) {
	const numPoints = data.index.length;
	const iTemp = ['x', 'y', 'z', 'color', 'scale'];
	iRef[0] = data.columns[0];

	/* 
		Y must be zero (or 1/2 of scale), and scale must be added to the new dataset. color is kinda irrelevant?
	*/

	// console.log(dataTypes.length);

	for(let i = 0; i < dataTypes.length; i++){
		console.log(i);
		// console.log(data);
		
		//Only x and z are needed, so i should ditch the for loop?
		switch (dataTypes[i]){
			case 'categorical':
				console.log("Categorizing: " + i + " - " + iRef[i]);
				data.addColumn(iTemp[i], categorizeField(data, i, 1).data, { inplace: true });
				break;
			case 'continuous':
				console.log("Normalizing: " + i + " - " + iRef[i]);
				data.addColumn(iTemp[i], discretizeField(data, i, normalizeRange, discreteSteps), { inplace: true });
				break;
			case 'index':
				console.log("Indicizing: " + i + " - " + iRef[i]);
				data.addColumn(iTemp[i], indicizeField(numPoints), { inplace: true });
				break;
			case 'count':
				console.log("To Count: "+ i + " - " + iRef[i]);
				break;
			default: 
				data.addColumn(iTemp[i], uniformizeField(numPoints), { inplace: true });
		}
	}

	console.log(data);
	const temp = data.loc("x", "z");

	let arr =  Array(numPoints).fill(1);

	temp.addColumn("weight", arr, {inplace: true});

	const layoutData = temp.groupby(["x", "z"]).count();
	layoutData.rename({"weight_count":"scale"}, {inplace: true});

	arr = Array(layoutData.index.length).fill(0);
	layoutData.addColumn("y", arr, {inplace: true});
	layoutData.addColumn("color", arr, {inplace: true});

	console.log(layoutData);

	// const newData = new dfd.DataFrame();
	// data = newData;
	return layoutData;
	
}

export const useLayout = ({ data }) => {
	const {dataTypes, plotType} = useViewportData();
	const [layoutData, setLayoutData] = useState(null);
	useEffect(() => {
		switch (plotType) {
		case 'discrete':
			setLayoutData(discreteLayout(data, dataTypes));
			break;
		case 'scatter':
			// console.log("Scatter Plot")
			setLayoutData(scatterLayout(data, dataTypes));
			break;
		default: {
			setLayoutData(scatterLayout(data, dataTypes));
		}
		}
	}, [data, plotType]);

	console.log(layoutData)
	return layoutData;
};
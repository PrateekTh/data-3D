import {useEffect, useState } from 'react';
import useViewportData from '../context/ViewportContext';
import * as dfd from 'danfojs/dist/danfojs-browser/src';
import { normalizeField, categorizeField } from '../workers/computeLayout';

// config variables
const categoryGap = 20;
const discreteSteps = 30;
const normalizeRange = 200;
let scale = 1;
const iTemp = ['x', 'y', 'z', 'color', 'scale'];
export const iRef = ['X', 'Y', 'Z', 'Color', 'Scale'];

// opitmisation required for minor UX lag


function indicizeField(numPoints){
	return new dfd.Series(Array.from(Array(numPoints).keys()))
}

// Divide a field into steps
async function discretizeField(df, col, nRange, dSteps){
	const s = new dfd.Series( await normalizeField(df, col, nRange)); // [-50, 50]
	const discreteDiv = nRange/dSteps;
	for(let i = 0; i<s.count(); i++){
		s.values[i] = Math.floor(s.values[i]/discreteDiv);
		// df.values[i][col] = i;
	}
	// console.log(s);
	return s;
}

function uniformizeField(numPoints, col){
	let val = 0;
	if(iRef[col] == 'Scale') val = scale * 10;
	let arr = Array(numPoints).fill(val);
	let s = new dfd.Series(arr)
	return s;
}

async function scatterLayout(data, dataTypes, setLayoutData) {
	let numPoints = data.index.length;
	if(numPoints == 0) numPoints = 1;
	
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
				layoutData.addColumn(iTemp[i], await categorizeField(data, i, categoryGap), { inplace: true });
				break;
			case 'continuous':
				// console.log("Normalizing: " + i + " for " + iTemp[i] + " - " + iRef[i]);
				if(iRef[i] == "Scale") {layoutData.addColumn(iTemp[i], await normalizeField(data, i, normalizeRange, scale), { inplace: true });}
				else layoutData.addColumn(iTemp[i], await normalizeField(data, i, normalizeRange), { inplace: true });
				break;
			case 'index':
				// console.log("Indicizing: " + i + " for " + iTemp[i] + " - " + iRef[i]);
				layoutData.addColumn(iTemp[i], await indicizeField(numPoints), { inplace: true });
				break;
			case 'color':
				if(typeof(data.at(0, "Color")) != typeof(0)){ 
					// console.log("categorising")
					layoutData.addColumn(iTemp[i], await categorizeField(data, i, categoryGap), { inplace: true });
				}else {
					// console.log("normalising")
					layoutData.addColumn(iTemp[i], await normalizeField(data, i, 1), { inplace: true });
				}
				break;
			default: 
				console.log("Uniformizing: " + i + " for " + iRef[i]);
				layoutData.addColumn(iTemp[i], await uniformizeField(numPoints, i), { inplace: true });
		}
	}
	// console.log(layoutData);
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
					data.addColumn(iTemp[i], await categorizeField(data, i, 1), { inplace: true });
					break;
				case 'continuous':
					// console.log("Discretizing: " + i + " - " + iRef[i]);
					data.addColumn(iTemp[i], await discretizeField(data, i, normalizeRange, discreteSteps), { inplace: true });
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
	const {dataTypes, plotType, baseScale} = useViewportData();
	const [layoutData, setLayoutData] = useState(null);
	scale = baseScale;
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
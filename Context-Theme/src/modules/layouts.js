import * as React from 'react';
import useViewportData from '../context/ViewportContext';
import * as dfd from 'danfojs/dist/danfojs-browser/src'

// To Add: Additional Backend Layouts

function normalizeField(df, col){
	const s = df.column(df.columns[col]);

	const sMax = s.max();
	const sMin = s.min();

	for(let i = 0; i<s.count(); i++){
		s.values[i] = 100 * (s.values[i] - sMin)/(sMax - sMin);
	}

	console.log(s);
	return s;
}

function indicizeField(df, col){
	const s = df.column(df.columns[col]);
	//iterate over the series with a normalizing function
	for(let i = 0; i<s.count(); i++){
		s.values[i] = i%100;
		// df.values[i][col] = i;
	}
	console.log(s);
	return s;
}

function categorizeField(df, col){	
	const s = df.column(df.columns[col]);
	//iterate over the series to categorize each field into a map (str, array[2])
	const categoryList = new Map();
	let catCount = 0;

	/////////////////////fix
	for(let i = 0; i<s.count(); i++){
		if(categoryList.get(s.values[i])){
			const cInfo = categoryList.get(s.values[i]);
			s.values[i] = cInfo[0];
			// df.values[i][col] = cInfo[0];
			categoryList.set(s.values[i], [cInfo[0], cInfo[1] + 1])
		}else{
			categoryList.set(s.values[i], [catCount, 1]);
			s.values[i] = catCount;
			// df.values[i][col] = catCount;
			catCount++;
		}
	}

	console.log(s);
	return s;
}

function gridLayout(data, dataTypes) {
	const numPoints = data.index.length;
  	const numCols = Math.ceil(Math.sqrt(numPoints));
  	const numRows = numCols;	
	console.log(dataTypes);

	const itemp = ['x', 'y', 'z'];
		
	for(let i = 0; i < dataTypes.length; i++){
		switch (dataTypes[i]){
			case 'categorical':
				console.log("Categorizing: " + i + " - " + data.columns[i]);
				data.addColumn(itemp[i], categorizeField(data, i));
				break;
			case 'continuous':
				console.log("Normalizing: " + i + " - " + data.columns[i]);
				data.addColumn(itemp[i], normalizeField(data, i), { inplace: true });
				break;
			case 'index':
				console.log("Indicizing: " + i + " - " + data.columns[i]);
				data.addColumn(itemp[i], indicizeField(data, i), { inplace: true });
				break;
			default: 
				data.addColumn(itemp[i], indicizeField(data, i), { inplace: true });
		}
	}

	//Normalize/categorize instead of this loop
	// for (let i = 0; i < numPoints; i++) {
	// 	const col = (i % numCols) - numCols / 2;
	// 	const row = Math.floor(i / numCols) - numRows / 2;
	// 	// console.log(i + " - " + x.length);
	// 	x.push(col * 1.05);
	// 	z.push(row * 1.05);
	// 	y.push(0);
	// }
	// data = dfd.concat({dfList: [data, data], axis: 1});
	console.log(data);
}

function spiralLayout(data) {
	let theta = 0;
	for (let i = 0; i < data.length; ++i) {
		const datum = data[i];
		const radius = Math.max(1, Math.sqrt(i + 1) * 0.8);
		theta += Math.asin(1 / radius) * 1;

		datum.x = radius * Math.cos(theta);
		datum.z = radius * Math.sin(theta);
		datum.y = 0;
	}
}

export const useLayout = ({ data, layout = 'grid' }) => {
	const {dataTypes} = useViewportData();

	React.useEffect(() => {
		switch (layout) {
		case 'spiral':
			spiralLayout(data);
			break;
		case 'grid':
		default: {
			gridLayout(data, dataTypes);
		}
		}
	}, [data, layout]);
};
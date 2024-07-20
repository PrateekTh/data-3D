import * as React from 'react';
import useViewportData from '../context/ViewportContext';
// To Add: Additional Backend Layouts
function gridLayout(data, dataTypes) {
	const numPoints = data.index.length;
  	const numCols = Math.ceil(Math.sqrt(numPoints));
  	const numRows = numCols;
	const x = [];
	const y = [];
	const z = [];
	
	console.log(dataTypes);

	for (let i = 0; i < numPoints; i++) {
		const col = (i % numCols) - numCols / 2;
		const row = Math.floor(i / numCols) - numRows / 2;
		// console.log(i + " - " + x.length);
		x.push(col * 1.05);
		z.push(row * 1.05);
		y.push(0);
	}
	
	data.addColumn("x", x, {inplace: true});
	data.addColumn("y", y, {inplace: true});
	data.addColumn("z", z, {inplace: true});

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
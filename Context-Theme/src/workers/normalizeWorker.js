// specific workers for specific tasks
// normalizeWorker.js

onmessage = function(message){

	// console.log(message);
	data = message.data;
	// console.log(data.nRange, data)
	let col = message.data.val
	for(let i = 0; i<col.length; i++){
		col[i] = data.nRange * (col[i] - data.sMin)/(data.sMax - data.sMin);
	}
    // normalizeField(message.data)
	postMessage(col);
}
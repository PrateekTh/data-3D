// specific workers for specific tasks
// normalizeWorker.js

onmessage = function(message){

	// console.log(message);

	const data = message.data;
	let col = message.data.val

	if(data.sMax != data.sMin){
		for(let i = 0; i<col.length; i++){
			col[i] = data.nRange * (col[i] - data.sMin)/(data.sMax - data.sMin);
		}
	}else{
		col = Array(col.length).fill(data.nRange/2);
	}
	
	// console.log(col)
	postMessage(col);
}
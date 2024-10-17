// specific workers for specific tasks
// categorizeWorker.js

onmessage = function(message){

	// console.log(message);
	let col = message.data.val;
    let catGap = message.data.catGap;

    const categoryList = new Map();
	let catCount = 0;

	for(let i = 0; i<col.length; i++){
		if(categoryList.get(col[i])){
			const cInfo = categoryList.get(col[i]);
			col[i] = (cInfo[0]) * catGap;
			categoryList.set(col[i], [cInfo[0], cInfo[1] + 1])
		}else{
			categoryList.set(col[i], [catCount, 1]);
			col[i] = catCount * catGap;
			catCount++;
		}
	}

    postMessage(col);
}
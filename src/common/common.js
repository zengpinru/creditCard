/**
 * 
 * @param {String} oldVal
 * @param {String} val
 */
function replaceStr(oldVal, val) {
	let str = oldVal.split('');
	str.splice(0, val.length, val)
	return str.join('')
}
/**
 * 
 * @param {String} creditCard Number
 */
function isLegal(value){
	value=value.replace(/[\s]/g,'');
	let num=value.slice(0,value.length-1).split('');
	console.log(num[num.length-1]);
	let lastNum=value.slice(-1);
	console.log(lastNum);
	let len=num.length;
	let sum=0;
	for(let i=len-1;i>=0;i-=2){
		num[i]=num[i]*2;
		if(num[i]>9){
			num[i]=num[i]%10+parseInt(num[i]/10);
		}
	}
	for(let i=0;i<len;i++){
		sum+=parseInt(num[i]);
	}
	let n=(sum*9).toString().slice(-1);
	if(lastNum==n){
		return true;
	}else{
		return false;
	}
}

export {
	replaceStr,
	isLegal
}

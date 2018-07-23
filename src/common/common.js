export function replaceStr(oldVal, val) {
	var str = oldVal.split('');
	str.splice(0, val.length, val)
	return str.join('')
}
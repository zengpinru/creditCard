/**
 *
 * @param {String} oldVal
 * @param {String} val
 */
function replaceStr(oldVal, val) {
  oldVal = typeof oldVal === 'string' ? oldVal : '';
  val = typeof val === 'string' ? val : '';
  let str = oldVal.split('');
  str.splice(0, val.length, val);
  return str.join('');
}

/**
 * Judge the legality of credit card number
 * @param {String} creditCard Number
 */
function isLegal(value) {
  value = typeof value === 'string' ? value : '';
  value = value.replace(/[\s]/g, '');
  let num = value.slice(0, value.length - 1).split('');
  let lastNum = value.slice(-1);
  let len = num.length;
  let sum = 0;
  for (let i = len - 1; i >= 0; i -= 2) {
    num[i] = num[i] * 2;
    if (num[i] > 9) {
      num[i] = num[i] % 10 + parseInt(num[i] / 10);
    }
  }
  for (let i = 0; i < len; i++) {
    sum += parseInt(num[i]);
  }
  let n = (sum * 9).toString().slice(-1);
  if (lastNum === n && isOwnPublisher(value)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Judge whether the credit card number is issued by our issuer.
 * @param number
 * @returns {boolean}
 */
function isOwnPublisher(number) {
  let value = number.substring(0, 2);
  if (value === '49' || value === '51' || value === '36' || value === '37') {
    return true;
  } else {
    return false;
  }
}

export {
  replaceStr,
  isLegal
}

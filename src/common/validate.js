/**
 *
 * @type {{isNonEmpty: strategies.isNonEmpty, isEqualLength: strategies.isEqualLength}}
 */
let strategies = {
  isNonEmpty: function (value, errorMsg, field) {
    if (value.length < 1) {
      let res = {};
      res.field = field;
      res.errorMsg = errorMsg;
      return res;
    }
  },
  isEqualLength: function (value, length, errorMsg, field) {
    if (value.length != length) {
      let res = {};
      res.field = field;
      res.errorMsg = errorMsg;
      return res;
    }
  }
};
/**
 * validate class
 * @constructor
 */
let Validator = function () {
  this.cache = [];//Save the check rules
};
/**
 * Add check information
 * @param value
 * @param rules [Array]
 * @param field [String]
 */
Validator.prototype.add = function (value, rules, field) {
  let self = this;
  for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    (function (rule) {
      let strategyAry = rule.strategy.split(":");
      let errorMsg = rule.errorMsg;
      self.cache.push(function () {

        let strategy = strategyAry.shift();//strategy（validate rule）

        strategyAry.unshift(value);
        strategyAry.push(errorMsg);
        strategyAry.push(field);

        return strategies[strategy].apply(null, strategyAry);
      })
    })(rule);
  }
};
/**
 * Start check
 * @returns {*}
 */
Validator.prototype.start = function () {
  for (let i = 0; i < this.cache.length; i++) {
    let res = this.cache[i]();
    if (res) {
      return res;
    }
  }
};

export {
  Validator
}

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
	var len = len - (s + '').length;
	for (var i = 0; i < len; i++) {
		s = '0' + s;
	}
	return s;
};

export default {
	searchPredicate: {
		int: {
			value: 'int'
		},
		string: {
			value: 'string'
		},
		date: {
			value: 'date'
		},
		boolean: {
			value: 'boolean'
		},
		select: {
			value: 'select'
		}
	},
	getQueryStringByName: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		var context = "";
		if (r != null)
			context = r[2];
		reg = null;
		r = null;
		return context == null || context == "" || context == "undefined" ? "" : context;
	},
	formatDate: {
		format: function(date, pattern) {
			pattern = pattern || DEFAULT_PATTERN;
			return pattern.replace(SIGN_REGEXP, function($0) {
				switch ($0.charAt(0)) {
					case 'y':
						return padding(date.getFullYear(), $0.length);
					case 'M':
						return padding(date.getMonth() + 1, $0.length);
					case 'd':
						return padding(date.getDate(), $0.length);
					case 'w':
						return date.getDay() + 1;
					case 'h':
						return padding(date.getHours(), $0.length);
					case 'm':
						return padding(date.getMinutes(), $0.length);
					case 's':
						return padding(date.getSeconds(), $0.length);
				}
			});
		},
		parse: function(dateString, pattern) {
			var matchs1 = pattern.match(SIGN_REGEXP);
			var matchs2 = dateString.match(/(\d)+/g);
			if (matchs1.length == matchs2.length) {
				var _date = new Date(1970, 0, 1);
				for (var i = 0; i < matchs1.length; i++) {
					var _int = parseInt(matchs2[i]);
					var sign = matchs1[i];
					switch (sign.charAt(0)) {
						case 'y':
							_date.setFullYear(_int);
							break;
						case 'M':
							_date.setMonth(_int - 1);
							break;
						case 'd':
							_date.setDate(_int);
							break;
						case 'h':
							_date.setHours(_int);
							break;
						case 'm':
							_date.setMinutes(_int);
							break;
						case 's':
							_date.setSeconds(_int);
							break;
					}
				}
				return _date;
			}
			return null;
		}
	},
	validate: {
		isNumber(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		},
		validateAsync(rule, value, callback) {
			let pkid = '';
			if (this.pageInfo.pkid !== null) {
				pkid = this.pageInfo.pkid;
			}
			this.$http.get(this.$CONFIG('SCC_API') + rule.url + "?guid=" + this.pageInfo.guid + "&pkid=" + pkid + "&col_name=" + rule.fullField + "&val=" + value).then(function(response) {
				let data = response.body;
				if (data.success) {
					if (data.pass) {
						callback();
					} else {
						callback(new Error(data.message || rule.message || "验证失败,请检查!"))
					}
				} else {
					callback(new Error(data.error || rule.message || "验证失败,请检查!"))
				}

			}, function(error) {
				callback(new Error(error))
			});
		},
	},
	deepClone: function(target, source) {
		/* deep clone source object to target object,
		 giving the last one precedence */

		if (typeof target !== 'object') {
			target = {};
		}
		if (Array.isArray(source)) {
			return source.slice();
		}
		for (const property in source) {
			if (source.hasOwnProperty(property)) {
				const sourceProperty = source[property];
				if (typeof sourceProperty === 'object') {
					target[property] = this.deepClone(target[property], sourceProperty);
					continue;
				}
				target[property] = sourceProperty;
			}
		}
		return target;
	}
};

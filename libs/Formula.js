/**
 * 公式の取り扱いをサポートするクラス
 * 
 * @class Formula
 * @author Genbu Hase
 */
class Formula {
	static get Symbols () {
		return {
			"√": "Math.sqrt",
			"\\|([^|]+)\\|": "Math.abs($1)"
		}
	}



	/**
	 * 公式を生成します
	 * @param {String} equation
	 */
	constructor (equation) {
		if (!equation) throw new TypeError("equation must be String");

		this.equation = equation;
		this.args = equation.replace(/\s/g, "").match(/[a-zA-Z]/ig).filter((arg, index, collection) => collection.indexOf(arg) === index);
	}

	/**
	 * 値を代入した方程式を返します
	 * 
	 * @param {Object<string, Number>} [args={}]
	 * @return {String}
	 */
	substitute (args = {}) {
		for (const arg of this.args) args[arg] = args[arg] || 0;

		let result = this.equation;

		for (const arg in args) {
			const value = args[arg];

			result = result
				.replace(new RegExp(`(?<=\\w)${arg}(?=\\w)`, "g"), `*${value}*`)
				.replace(new RegExp(`${arg}(?=\\w)`, "g"), `${value}*`)
				.replace(new RegExp(`(?<=\\w)${arg}`, "g"), `*${value}`)
				.replace(new RegExp(arg, "g"), value);
		}

		const reversePrefixes = (result.match(/(\+ ?\-|\- ?\-)/g) || []);
		for (const prefix of reversePrefixes) {
			result = result.replace(prefix, prefix.replace(/\s/g, "") == "+-" ? "- " : "+ ");
		}

		return result;
	}

	/**
	 * 代入して得られた値を返します
	 * 
	 * @param {Object<string, Number>} args
	 * @return {Number}
	 */
	value (args) {
		return new Function('"use strict"; return ' + this.toSource(args))();
	}

	/**
	 * JavaScriptのソースに変換したものを返します
	 * 
	 * @param {Object<string, Number>} args
	 * @return {String}
	 */
	toSource (args) {
		let formatted = this.substitute(args);
		for (const symbol in Formula.Symbols) formatted = formatted.replace(new RegExp(symbol, "g"), Formula.Symbols[symbol]);
		
		return formatted;
	}
}
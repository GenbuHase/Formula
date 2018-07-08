/**
 * 公式の取り扱いをサポートします。
 * @class Formula
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
		this.args = equation.replace(/\s/g, "").match(/[A-Z]/ig).filter((arg, index, collection) => collection.indexOf(arg) === index);
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
	 * JavaScriptのソース形式に変換したものを返します
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

class Point {
	/**
	 * 指定された点に関して対称な点を返します
	 * 
	 * @param {Point} origin
	 * @param {Point} point
	 * 
	 * @return {Point}
	 */
	static getSymmetricByPoint (origin, point) {
		const { x, y } = point;
		const [ Ox, Oy ] = [ origin.x, origin.y ];

		return new Point(Ox + (Ox - x), Oy + (Oy - y));
	}



	/**
	 * 点を生成します
	 * 
	 * @param {Number} x
	 * @param {Number} y
	 */
	constructor (x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	/** 描画関数 */
	draw () {
		point(this.x, this.y);
		text(`(${this.x}, ${this.y})`, this.x + 5, this.y - 5);
	}
}

class Line {
	/**
	 * 指定された線と点間の距離を返します
	 * 
	 * @param {Line} origin
	 * @param {Point} point
	 * 
	 * @return {Number}
	 */
	static getDistanceFromPoint (origin, point) {
		/**
		 * |ax + by + c|
		 * -------------
		 *  √(a² + b²)
		 */

		const { a, b, c } = origin;
		const { x, y } = point;

		return new Formula("|ax + by + c| / √((a)**2 + (b)**2)").value({ a, x, b, y, c });
	}



	/**
	 * 直線を生成します
	 * 
	 * @param {Point} point1
	 * @param {Point} point2
	 */
	constructor (point1, point2) {
		this.x1 = point1.x, this.y1 = point1.y;
		this.x2 = point2.x, this.y2 = point2.y;

		this.a = this.slope;
		this.b = -1;
		this.c = (this.slope * -this.x1) + this.y1;
	}

	/** 描画関数 */
	draw () {
		line(this.x1, this.y1, this.x2, this.y2);
	}


	
	/**
	 * 2点間の距離を返します
	 * @return {Number}
	 */
	get distance () { return Math.sqrt((this.x2 - this.x1)**2 + (this.y2 - this.y1)**2) }

	/**
	 * 直線の傾きを返します
	 * @return {Number}
	 */
	get slope () { return (this.y2 - this.y1) / (this.x2 - this.x1) }

	/**
	 * 直線の方程式を返します
	 * @return {Formula}
	 */
	get formula () {
		/**
		 *           y2 - y1               y2 - y1                   y2 - y1
		 * y - y1 = --------- (x - x1) => --------- (x) - y + (y1 - --------- (x1))
		 *           x2 - x1               x2 - x1                   x2 - x1
		 */
		return new Formula(`${this.a}x + ${this.b}y + ${this.c}`);
	}
}
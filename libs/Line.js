/**
 * 線分を取り扱うクラス
 * 
 * @class Line
 * @author Genbu Hase
 */
class Line {
	/**
	 * 指定された線分と点の距離を返します
	 * 
	 * @param {Line} origin
	 * @param {Point} point
	 * 
	 * @return {Number}
	 */
	static getDistanceFromPoint (origin, point) {
		const { a, b, c } = origin;
		const { x, y } = point;

		const [ mx, Mx ] = [ Math.min(origin.x1, origin.x2), Math.max(origin.x1, origin.x2) ];

		// 2点間の距離の公式
		if (x < Math.min(origin.x1, origin.x2)) return new Line(point, new Point(mx, origin.getY(mx))).distance;
		if (Math.max(origin.x1, origin.x2) < x) return new Line(point, new Point(Mx, origin.getY(Mx))).distance;

		/**
		 * |ax + by + c|
		 * -------------
		 *  √(a² + b²)
		 */
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
		this.c = this.y1 + (this.slope * -this.x1);
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
		 *           y2 - y1                   y2 - y1                   y2 - y1
		 * y - y1 = --------- (x - x1)   =>   --------- (x) - y + (y1 - --------- (x1))
		 *           x2 - x1                   x2 - x1                   x2 - x1
		 * 
		 * 
		 * =>   mx - y + (y1 - mx1)   =>   ax + by + c
		 * 
		 */
		return new Formula(`${this.a}x + ${this.b}y + ${this.c}`);
	}

	

	/**
	 * 指定されたyの値に対応するxの値を返します
	 * 
	 * @param {Number} y
	 * @return {Number}
	 */
	getX (y = 0) {
		/**
		 *                             -by - c
		 * ax + by + c = 0   =>   x = ----------
		 *                                 a
		 */
		return new Formula(`(${-this.b}y - ${this.c}) / ${this.a}`).value({ y });
	}

	/**
	 * 指定されたxの値に対応するyの値を返します
	 * 
	 * @param {Number} x
	 * @return {Number}
	 */
	getY (x = 0) {
		/**
		 *                             -ax - c
		 * ax + by + c = 0   =>   y = ----------
		 *                                 b
		 */
		return new Formula(`(${-this.a}x - ${this.c}) / ${this.b}`).value({ x });
	}
}
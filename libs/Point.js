/**
 * 点を取り扱うクラス
 * 
 * @class Point
 * @author Genbu Hase
 */
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
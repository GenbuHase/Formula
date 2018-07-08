const points = [
	new Point(100, 50),
	new Point(800, 600)
];

const lines = [
	new Line(points[0], points[1])
];



function setup () {
	createCanvas(windowWidth, windowHeight);
}

function draw () {
	clear();

	for (const point of points) point.draw();
	for (const line of lines) line.draw();

	let p = new Point(mouseX, mouseY)
	p.draw();
	
	text(Line.getDistanceFromPoint(lines[0], p), p.x + 5, p.y + 10);
}
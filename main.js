const points = [
	new Point(50, 50),
	new Point(80, 90),
	new Point(80, 120),
	new Point(150, 30)
];

const lines = [
	new Line(points[0], points[1]),
	new Line(points[1], points[2]),
	new Line(points[2], points[3])
];



function setup () {
	createCanvas(windowWidth, windowHeight);
}

function draw () {
	clear();

	for (const point of points) point.draw();
	for (const line of lines) line.draw();
}
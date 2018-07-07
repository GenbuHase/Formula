const points = [
	new Point(50, 50),
	new Point(80, 90)
];

const lines = [
	new Line(points[0], points[1])
];



function setup () {
	createCanvas(windowWidth, windowHeight);

	textFont("Meiryo UI");
}

function draw () {
	clear();

	for (const point of points) point.draw();
	for (const line of lines) line.draw();
}
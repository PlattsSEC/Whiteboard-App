// Make the paper scope global, by injecting it into window:

paper.install(window);
window.onload = function() {
// Setup directly from canvas id:
var canvas = document.getElementById('myCanvas')
paper.setup(canvas);

var path = new paper.Path();


var textItem = new PointText({
	content: 'Click and drag to draw a line.',
	point: new Point(20, 30),
	fillColor: 'black',
});

var tool = new Tool();
tool.onMouseDown= function(event) {
	// If we produced a path before, deselect it:
	if (path) {
		path.selected = false;
	}

	// Create a new path and set its stroke color to black:
	path = new paper.Path({
		segments: [event.point],
		strokeColor: 'red',
		strokeWidth: 5,
		// Select the path, so we can see its segment points:
		//fullySelected: true
	});
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
tool.onMouseDrag= function(event) {
	path.add(event.point);

	// Update the content of the text item to show how many
	// segments it has:
	//textItem.content = 'Segment count: ' + path.segments.length;
}

// When the mouse is released, we simplify the path:
tool.onMouseUp=function(event) {
	//var segmentCount = path.segments.length;

	// When the mouse is released, simplify it:
	path.simplify(10);
	//copy = path.clone();
	//copy.fullySelected = true;
    //copy.position.x += 200;

	// Select the path, so we can see its segments:
	//path.fullySelected = true;

	//var newSegmentCount = path.segments.length;
	//var difference = segmentCount - newSegmentCount;
	//var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
	//textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
}

}

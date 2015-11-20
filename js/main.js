// Make the paper scope global, by injecting it into window:

// global variable for color 
var current_color = 'black';
//Firebase reference
var dataRef = new Firebase('https://bok8q9j6znu.firebaseio-demo.com/');

paper.install(window);
window.onload = function() {
// Setup directly from canvas id:
var canvas = document.getElementById('myCanvas')
var context = canvas.getContext('2d');
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
		//strokeColor: 'red',
        
		strokeWidth: width,
		// Select the path, so we can see its segment points:
		//fullySelected: true
	});
    
    path.strokeColor = current_color;
    
    //sending data to Firebase
    
    ref.set({
    	json_str : path.exportJSON(path.segments)	
    });
   
    console.log(path.segments);
    
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
    var pathSegments = path.segments;

}

//color palette stuff goes here
var palettes = document.getElementsByClassName('palette');
    
// adding event listeners to the palettes    
for (var i=0; i<palettes.length;i++)
{
	palettes[i].addEventListener('click',setPalette);
	
}

   
 function setPalette(e) 
{  //identify palette
	var palette = e.target;

    var active = document.getElementsByClassName('current')[0]; //only one element in the array because there should be only one active element at a time 
    if (active){
		active.className = 'palette';
	     }
   
   //give active class
	palette.className += ' current';
	
    current_color = palette.style.backgroundColor;
	
}

// the default width
width = 5;
textItem.content = 'Current Radius : ' + width;

//for increasing width
var incrad = document.getElementById('incrad');
incrad.addEventListener('click',inc_rad);  

function inc_rad(){

width = width + 1;
textItem.content = 'Current Radius : ' + width;

}  

//for decreasing width

var decrad = document.getElementById('decrad');
decrad.addEventListener('click',dec_rad);

function dec_rad(){

width = width - 1;
textItem.content = 'Current Radius : ' + width;

}

//listening for data

ref.on("value",function(snapshot){

console.log(json_path_data);
//console.log(path.importJSON(json_path_data));
var new_path = new Path();
//new_path.add(new_path.importJSON(json_path_data));
new_path.add(new_path.importJSON(json_path_data));


});
   
}

// Enabling strict mode
"use strict";

// global variable for color 
var current_color = 'black';

//Firebase reference
var ref = new Firebase('https://bok8q9j6znu.firebaseio-demo.com/');

// Make the paper scope global, by injecting it into window:
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
    
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
tool.onMouseDrag= function(event) {
	path.add(event.point);
}

// When the mouse is released, we simplify the path:
tool.onMouseUp=function(event) {
	//var segmentCount = path.segments.length;

	// When the mouse is released, simplify it:
	path.simplify(10);

    
// Feeding data to our custom made classes
    
    var mypoint; 
    var mypoint2;
    var mypoint3;
    var mysegment;
    var myarray = []; //array to store my_segment instances

    
    for(i=0;i < path.segments.length; i++){
        
    
    //incoming handle of segment #i
    mypoint = new my_point(path.segments[i]._handleIn._x,path.segments[i]._handleIn._y); 
    //console.log(mypoint);
    
    //outgoing handle of segment #i
    mypoint2 = new my_point(path.segments[i]._handleOut._x,path.segments[i]._handleOut._y);
    //console.log(mypoint2);    
    //anchor point of segment #i
    mypoint3 = new my_point(path.segments[i]._point._x,path.segments[i]._point._y);
    //console.log(mypoint3);
        
    //initialising my_segment instance with these points
    
    mysegment = new my_segment(mypoint,mypoint2,mypoint3);
    myarray.push(mysegment);
    
    
    }
    
    console.log("here's what I sent to Firebase");
    console.log(myarray);
    console.log("here's the original segment array");
    console.log(path.segments);
    
    
//here goes our sending function
    
    ref.set({
        myarray,current_color
    });
    
    
 /*
 
    TODO: Write a function to fetch the segments from get_array 
    TODO: Turn those segments into instances of Paper.js Segment class
    TODO: Pass those instances to the Path method add() to draw the path in the HTML5 Canvas
 
 
 */
    
    
    
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
var width = 5;
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

/*


TODO: DONE create a class for point 
TODO: DONE create a class for segments which would have three instance variables(three points of a segment)
TODO: DONE figure out how to fetch the three points from the an instance of the Paper.js Segment class
TODO: DONE store those segments in an array to send it to Firebase
TODO: DONE create a variable to store the strokewidth and send it to Firebase
TODO: DONE create a variable to store the strokeColor and send it to Firebase



*/
   
class my_point{
    
    constructor(x,y){
    
        this.x = x;
        this.y = y;
    
    
    }

}
    
    
class my_segment{

    constructor(x1,x2,x3){
    
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
    
    
    }
}
    
    
// here goes our listening function
    
    
    //var get_array;
    ref.on("value",function(snapshot){
        
        var get_array = snapshot.val().myarray;
	var draw_color = snapshot.val().current_color;
        
        console.log("Here's what Firebase sent me");
        console.log(get_array);
        //console.log(get_array[3].x1.x);
        //console.log(get_array.length);
        
       // get_array = _array;
        
        var newpoint; //incoming handle
        var newpoint2; // outgoing handle
        var newpoint3; // anchor point
        var newpath = new paper.Path();
        newpath.strokeColor = draw_color;
	newpath.strokeWidth = width;
    
    
        for(var j=0;j < get_array.length; j++){
    
        newpoint = new Point(get_array[j].x1.x,get_array[j].x1.y);
        //console.log(newpoint);
        newpoint2 = new Point(get_array[j].x2.x,get_array[j].x2.y);
        //console.log(newpoint);
        newpoint3 = new Point(get_array[j].x3.x,get_array[j].x3.y);
        //console.log(newpoint);
        newpath.add(new Segment(newpoint3,newpoint2,newpoint)); //this is where shit gets drawn
        //console.log(new Segment(newpoint,newpoint2,newpoint3));
    
        }
    
    
    
    
});
    
    

  
   
}

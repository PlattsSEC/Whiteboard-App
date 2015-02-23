var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var radius = 5;
var drag = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.lineWidth = radius*2;

var putPoint = function(e){
	if(drag){
		context.lineTo(e.clientX, e.clientY);
		context.stroke();
		context.beginPath();
		context.arc(e.clientX,e.clientY,radius,0,Math.PI*2);
		context.fill();
		context.beginPath();
		context.moveTo(e.clientX, e.clientY);
	}
}

var engage = function(e){
	drag = true;
	putPoint(e);
}

var disengage = function(){
	drag = false;
	context.beginPath();
}
canvas.addEventListener('mousemove',putPoint);
canvas.addEventListener('mousedown',engage);
canvas.addEventListener('mouseup',disengage);

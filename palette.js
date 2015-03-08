
var palettes = document.getElementsByClassName('palette');
for (var i=0; i<palettes.length;i++)
{
	palettes[i].addEventListener('click',setPalette);
	
}


function setColor(color){
	context.fillStyle = color;
	context.strokeStyle = color;
	var active = document.getElementsByClassName('current')[0]; //only one element in the array because there should be only one active element at a time 
    if (active){
		active.className = 'palette';
	     }
}

function setPalette(e) 
{  //identify palette
	var palette = e.target;
   //set color
   setColor(palette.style.backgroundColor);
   
   //give active class
	palette.className += ' current';
	
	
	
	
}

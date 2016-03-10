//color palette
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


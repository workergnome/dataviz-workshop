//-----------------------------------------------------------------------------
// Declare some global variables
var data;

//-----------------------------------------------------------------------------
// Setup function.  

function setup() {
  // Initialize your data
  data = [4, 8, 15, 16, 23, 42];  

  // create a drawing area 
  createCanvas(1400, 700);
}

//-----------------------------------------------------------------------------
// Draw function. 
function draw() {
  // initialize variables
  var x,y,w,h;

  // set up colors
  noStroke();
  fill(80,80,200);

  // iterate through the data
  for(var i = 0; i < data.length; i++) {    

    // calculate position variables
    x = 0;
    y = (height*(i/data.length));
    w = width/max(data)*data[i];
    h = (height/data.length)-5;
   
    push();                    // <- push a drawing context
    translate(x,y);            // <- move to position
    rect(0,0,w,h);             // <- draw a rectangle
    fill(255);                 // <- change colors
    text(data[i],10,h/2);      // <- draw the label 
    pop();                     // <- reset the drawing context
  }
}


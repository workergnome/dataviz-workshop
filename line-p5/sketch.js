//-----------------------------------------------------------------------------
// Declare some global variables
var data;

//-----------------------------------------------------------------------------
// Setup function.  

function setup() {
  noLoop();

  // Initialize your data
  data = loadTable("/data/100_0102.txt","csv",handleDataLoad);  

  // create a drawing area 
  createCanvas(1400, 700);
}

//-----------------------------------------------------------------------------
// Draw function. 
function draw() {
  // initialize variables
  var x1,x2,y1,y2;

  // set up bounds
  var maxX = data.getRowCount();
  var maxY = 150000000;

  textSize(10);

  // iterate through the data
  for(var i = 0; i < maxX; i++) {    
    stroke(50);
    noFill();

    // set up your variables
    x1 = map(i                       ,0 ,maxX, 0        ,width);
    x2 = map(i+1                     ,0, maxX, 0        ,width);
    y1 = map(data.getRow(i).get(0)   ,0, maxY, height-30, 0   );
    y2 = map(data.getRow(i+1).get(0) ,0, maxY, height-30, 0   );

    // draw the line
    line(x1,y1,x2,y2)

    // draw the legend
    noStroke()
    fill(0)
    text(i,x1,height)
  }
}

//-----------------------------------------------------------------------------
// HELPER FUNCTIONS
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// This is the callback for loaded data.
function handleDataLoad(d) {
  data = d;
  redraw();
}


//-----------------------------------------------------------------------------
// Declare some global variables
var data;
var palette;

//-----------------------------------------------------------------------------
// Setup function.  

function setup() {
  // Build a cached palette
  buildPalette();

  // load a csv, and register a callback for completion
  data = loadTable("/data/dims.csv","csv","header",handleDataLoad);  

  // create a drawing area and tell the system not to draw on every frame
  createCanvas(1400, 700);
  noLoop();
}

//-----------------------------------------------------------------------------
// Draw function.  Usually, this would be called on every frame, but it's not
// because we used noLoop() within setup.  Instead, we're using the redraw()
// function once the data is loaded.  see handleDataLoad() below.

function draw() {

  // setup our margins
  var marginX = 100;
  var marginY = 40;

  // set the extents of our data.  These are hardcoded, but could be calculated.
  var minX = 1890;
  var maxX = 2015;
  var minY = 0;
  var maxY = 109794.0;

  // set up some variables outside the loop.
  var currentRow, x, y, logOfArea;

  // draw the dots
  noStroke();

  for(var i = 0; i < data.getRowCount(); i++) {

    currentRow = data.getRow(i);
    // we're using log() for a log scale here.
    logOfArea = log(parseFloat(currentRow.get('area'))); 

    // ignore values that are less than zero
    if (logOfArea <= 0) {
      continue;
    }

    // calculate our pixel locations
    x = map(
      parseFloat(
        currentRow.get('acquisition')), // value
        minX, maxX,                     // range of possible values
        marginX, width-marginX*2         // x pixel range
      );

    y = map(
      logOfArea,                        // value
      minY, log(maxY),                  // range of possible values
      (height-marginY*2), marginY       // y pixel range. (note that it's reversed)
    );


    // set our color
    fill(getPalette(parseFloat(currentRow.get('group'))));

    // draw a circle
    ellipse(x,y,6,6);    
  }

  // draw x & y axis lines
  stroke(100);
  strokeWeight(1);
  line(marginX,height-marginY,width-marginX,height-marginY);
  line(marginX,marginY,marginX,height-marginY);

  // Draw x axis labels
  var steps = 10;
  var val, xpos, str;
  angleMode(DEGREES);
  for(var i = 0; i <= steps; i++) {
    val = minX + round((maxX - minX)*(i/steps));
    xPos = map(val,minX,maxX,marginX,width-marginX*2);
    push();
      translate(xPos,height-marginY);
      stroke(200);
      line(0,0,0,10);
      rotate(90);
      noStroke();
      fill(100);
      text(val,3,-4);
    pop();
  }

  // draw y axis labels
  for(var i = 1; i <= maxY; i = i*10) {
    yPos = (height-marginY)-map(log(i),log(1),log(maxY),marginY,height-marginY*2);
    push();
      translate(marginX,yPos);
      stroke(200);
      line(0,0,-10,0);
      noStroke();
      fill(100);
      str = i + " in^2"
      text(str,-textWidth(str)-4,-4);
    pop();
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


//-----------------------------------------------------------------------------
// This gets a color for a specific number.
function getPalette(num) {
  var newNum = num ? (num%palette.length) : 0;
  return palette[newNum];
}

//-----------------------------------------------------------------------------
// This builds an array of colors.

function buildPalette() {
  palette =     [color( 99, 99,201,50),
                 color(190,174,212,50),
                 color(253,192,134,50),
                 color(127,201,127,50),
                 color(190,174,212,50),
                 color(253,192,134,50),
                 color(255,255,153,50),
                 color(127,201,127,50),
                 color(190,174,212,50),
                 color(253,192,134,50),
                 color(255,255,153,50),
                 color(56, 108,176,50),
                 color(127,201,127,50),
                 color(190,174,212,50),
                 color(253,192,134,50),
                 color(255,255,153,50),
                 color(56, 108,176,50),
                 color(240,  2,127,50),
                 color(127,201,127,50),
                 color(190,174,212,50),
                 color(253,192,134,50),
                 color(255,255,153,50),
                 color(56, 108,176,50),
                 color(240,2  ,127,50),
                 color(191, 91,23 ,50),
                 color(127,201,127,50),
                 color(190,174,212,50),
                 color(253,192,134,50),
                 color(255,255,153,50),
                 color( 56,108,176,50),
                 color(240,  2,127,50),
                 color(191, 91, 23,50),
                 color(102,102,102,50)];
}

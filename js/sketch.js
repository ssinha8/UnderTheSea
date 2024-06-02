// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Globals
let seed = 239;

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  $("#clicker").click(generate);
}

function generate() {
  seed += 1;
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);
  background(100);
  noStroke();
  fill("#065363");
  rect(0, 0, width, height);
}

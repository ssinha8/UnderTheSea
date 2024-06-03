// sketch.js - purpose and description here
// Author: Your Name
// Date:

// sketch.js



function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  $("#clicker").click(generate);

  initializeFish();
}

function generate() {
    seed += 1;
    initializeFish();
}
  
// draw() function is called repeatedly, it's the main animation loop
function draw() {
    noiseSeed(seed);
    randomSeed(seed);
    background(100);
    noStroke();
    fill("#065363");
    rect(0, 0, width, height);
    drawBackground();

    seaLife.forEach((entity, index) => {
        if (entity.type === 'kelp') {
            fill(0, 128, 0); // Green color
            rect(entity.x, entity.y, 5, 50);
        } else if (entity.type === 'coral') {
            fill(255, 0, 0); // Red color
        }
    });
    for (let fish of fishBucket) {
        fish.update();
    }
}

function mousePressed() {
  // Check if the mouse click is within the sand layer
  if (mouseY > height - sandHeight) {
      // Randomly decide to place kelp or coral
      if (random() > 0.5) {
          seaLife.push({ type: 'kelp', x: mouseX, y: mouseY - 50 });
      } else {
          seaLife.push({ type: 'coral', x: mouseX, y: mouseY - 10 });
      }
      console.log("Placed new sea life:", seaLife[seaLife.length - 1]);
  }
}

const button = document.getElementById("clicker");

button.addEventListener("click", () => {
  const newSeed = generateSeed();
  const newSeedValue = window.seedGetter(newSeed);
  window.initializeSeaLife(newSeedValue);
  console.log(`Environment reimagined with new seed: ${newSeed}`);
});

function generateSeed(){
  // Generate a random string as a new seed (you can use any method you prefer)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

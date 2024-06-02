// sketch.js - purpose and description here
// Author: Your Name
// Date:

// sketch.js

const seed = "underwater_seed";
const seedValue = window.seedGetter(seed);

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container');
    window.initializeSeaLife(seedValue);
}

function draw() {
<<<<<<< HEAD
    background(173, 216, 230); // Light blue background

    // Draw sand layer
    drawSandLayer();

    // Draw sea life
    seaLife.forEach((entity, index) => {
        if (entity.type === 'kelp') {
            fill(0, 128, 0); // Green color
            rect(entity.x, entity.y, 5, 50);
        } else if (entity.type === 'coral') {
            fill(255, 0, 0); // Red color
            rect(entity.x, entity.y, 10, 10);
        } else if (entity.type === 'fish') {
            fill(255, 165, 0); // Orange color
            ellipse(entity.x, entity.y, 10, 5);

            // Smooth fish movement using Perlin noise
            entity.x = noise(noiseOffsetX[index]) * width;
            entity.y = noise(noiseOffsetY[index]) * (height - sandHeight);
            noiseOffsetX[index] += 0.01;
            noiseOffsetY[index] += 0.01;
        }
    });
}

function drawSandLayer() {
  noStroke(); // No stroke for smooth edges
  fill(194, 178, 128); // Sand color

  beginShape();
  vertex(0, height); // Start at the bottom-left corner of the canvas
  for (let x = 0; x < width; x += 5) {
      const yOff = map(x, 0, width, 0, 2);
      const yOffset = noise(yOff) * 50;
      vertex(x, height - sandHeight + yOffset); // Add vertex at sand layer height with Perlin noise offset
  }
  vertex(width, height); // End at the bottom-right corner of the canvas
  vertex(0, height); // Return to the bottom-left corner of the canvas to close the shape
  endShape(CLOSE);
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
=======
  randomSeed(seed);
  background(100);
  noStroke();
  fill("#065363");
  rect(0, 0, width, height);
  drawBackground();
>>>>>>> ad563f1 (Initial Sunlight Work (#3))
}

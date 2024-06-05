/**
 * Exported functiuons for use in engine or skethc.js
 */

function drawBackground() {
    bgGradient();
    lightRays();
    drawSand();
  }
  
  function lightRays() {
    let shapeWidth = 50;
  
    for (let i = 0; i < 50; i++) {
      let movement = sin(millis());
  
      let x1 = random(-shapeWidth, width - shapeWidth) + movement;
      let x2 = x1 + shapeWidth + movement;
      let alpha = random(0.8, 0.95) + sin(second()) / 10;
  
      fill(random(250, 255), random(250, 255), 0, alpha * 5);
      noStroke();
      beginShape();
  
      vertex(x1 + shapeWidth, 0);
      vertex(x1, 0);
      vertex(x2, height);
      vertex(x2 + shapeWidth, height);
  
      endShape(CLOSE);
    }
  }
  
  function bgGradient() {
    let topColor = color(random(100, 200), random(150, 230), random(200, 255)); // Random light blue
    let bottomColor = color(0, 0, random(100, 150)); // Random dark blue
  
    // Randomize the start and end positions of the gradient
    let startY = random(0, height / 8);
    let endY = random(height / 2, height);
  
    for (let y = 0; y <= height; y++) {
      let inter;
      if (y < startY) {
        inter = 0;
      } else if (y > endY) {
        inter = 1;
      } else {
        inter = map(y, startY, endY, 0, 1);
      }
      let c = lerpColor(topColor, bottomColor, inter);
      stroke(c);
      line(0, y, width, y);
    }
  }
  
  function drawSand() {
    let duneHeight = height * random(0.01, 0.2); // Height of the dunes
    let baseY = height - duneHeight; // Starting Y position for the dunes
    let xOffset = random(1000); // Random offset for noise
  
    // Sand color
    let sandColor = color(237, 201, 175);
  
    // Draw sand
    for (let x = 0; x <= width; x++) {
      // Perlin noise for smooth, natural variation
      let noiseVal = noise(x * 0.01 + xOffset);
      let y = map(noiseVal, 0, 1, baseY, height);
  
      stroke(sandColor);
      line(x, y, x, height);
    }
  }
  
  function seaGrass(canvas) {}
  
  function initializeFish() {
    fishBucket = [];
    let numFish = random(5, 20); // Number of fish based on seed
    for (let i = 0; i < numFish; i++) {
      let x = random(width);
      let y = random(height);
      let size = random(20, 50);
      fishBucket.push(new Fish(x, y, size));
    }
  }

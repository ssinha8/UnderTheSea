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
    let movement = 2 * sin(noise(i) + millis() / 1000);

    let x1 = random(-shapeWidth, width - shapeWidth) + movement;
    let x2 = x1 + shapeWidth + movement;
    let alpha = constrain(sin(millis() / noise(x1)) + noise(x1), 0.6, 0.85);

    fill(random(250, 255), random(250, 255), 0, alpha);
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

function initializeFish() {
  fishBucket = [];
  let numFish = random(5, 20); // Number of fish based on seed
  for (let i = 0; i < numFish; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(30, 45);
    fishBucket.push(new Fish(x, y, size));
  }
}

function killFish(fish) {
  if (fish.alive == false) {
    let index = fishBucket.indexOf(fish); // Find the index of the element
    if (index != -1) {
      fishBucket.splice(index, 1); // Remove the element from the list
    }
  }
}

function intializeKelp() {
  let base = width / 10;
  for (let i = 0; i < 10; i++) {
    let x = i * base + base / 2;
    x += random(-base / 10, base / 10);
    seaLife.push(new Plant(x, height));
  }
}

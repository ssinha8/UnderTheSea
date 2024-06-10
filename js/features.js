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

  // Adjust the oscillation parameters
  let oscillationSpeed = 0.005; // Slower oscillation
  let startAmplitude = height / 16; // Smaller amplitude for startY
  let endAmplitude = height / 8; // Smaller amplitude for endY

  let startYOffset = startAmplitude * sin(frameCount * oscillationSpeed);
  let endYOffset = endAmplitude * sin(frameCount * oscillationSpeed + PI / 2);

  let startY = height / 8 + startYOffset;
  let endY = height / 2 + endYOffset;

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

  // Draw sand with vertical shifting effect
  for (let x = 0; x <= width; x++) {
    // Perlin noise for smooth, natural variation with time component for vertical movement
    let time = millis() * 0.0001; // Adjust the speed of the up and down movement
    let noiseVal = noise(x * 0.01 + xOffset, time);
    let y = map(noiseVal, 0, 1, baseY, height);

    stroke(sandColor);
    line(x, y, x, height);
  }
}

function initializeFish() {
  fishBucket = [];
  breedingFish = [];
  let numFish = random(5, 20); // Number of fish based on seed
  for (let i = 0; i < numFish; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(30, 45);
    fishBucket.push(new Fish(x, y, size));
  }
}

function breed(fish1, fish2) {
  if (fish1.canBreed() && fish2.canBreed()) {
    if (fish1.partner == null && fish2.partner == null) {
      fish1.partner = fish2;
      fish2.partner = fish1;
    }
    if (
      !fish1.hasBred &&
      !fish2.hasBred &&
      fish1.partner == fish2 &&
      fish2.partner == fish1 &&
      random() < 0.3
    ) {
      let targetX = (fish1.x + fish2.x) / 2;
      let targetY = (fish1.y + fish2.y) / 2;
      fish1.targetX = targetX;
      fish1.targetY = targetY;
      fish2.targetX = targetX;
      fish2.targetY = targetY;

      if (fish1.funTimeOver && fish2.funTimeOver) {
        let newSize = random(
          min(fish1.originalSize, fish2.originalSize),
          max(fish1.originalSize + fish2.originalSize)
        );
        let newFish = new Fish(targetX, targetY, newSize);

        if (random() > 0.5) {
          newFish.body = fish1.body;
        } else {
          newFish.body = fish2.body;
        }
        if (random() > 0.5) {
          newFish.tail = fish1.tail;
        } else {
          newFish.tail = fish2.tail;
        }
        if (random() > 0.5) {
          newFish.eye = fish1.eye;
        } else {
          newFish.eye = fish2.eye;
        }

        fish1.hasBred = true;
        fish2.hasBred = true;
        fish1.targetX = null;
        fish1.targetY = null;
        fish2.targetX = null;
        fish2.targetY = null;

        return newFish;
      }
    }
  }
  return null;
}

function intializeKelp() {
  seaLife = [];
  let base = width / 10;
  for (let i = 0; i < 10; i++) {
    let x = i * base + base / 2;
    x += random(-base / 10, base / 10);
    seaLife.push(new Plant(x, height));
  }
}

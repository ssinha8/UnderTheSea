// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Define variables
let yOffset = 0; // Initial offset for Perlin noise
let canvasContainer; // Define canvasContainer variable
let dragging = null; // To track what is being dragged
let dragImage = null; // To track the image being dragged

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  $("#clicker").click(generate);

  $("#drag-kelp").mousedown(() => startDrag('kelp'));
  $("#drag-coral").mousedown(() => startDrag('coral'));

  initializeFish();
  initializeInventory(seed);
}

function generate() {
  seed += 1;
  initializeFish();
  initializeInventory(seed);
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
          rect(entity.x, entity.y, 10, 10);
      }
  });

  if (dragImage) {
      image(dragImage, mouseX - 25, mouseY - 25, 50, 50);
  }

  for (let fish of fishBucket) {
    fish.update();
  }

}

function mousePressed() {
  if (dragging) {
    if (mouseY > height - sandHeight) {
      if (dragging === 'kelp' && inventory.kelp > 0) {
        seaLife.push({ type: 'kelp', x: mouseX, y: mouseY - 50 });
        inventory.kelp--;
      } else if (dragging === 'coral' && inventory.coral > 0) {
        seaLife.push({ type: 'coral', x: mouseX, y: mouseY - 10 });
        inventory.coral--;
      }
      updateInventoryDisplay();
    }
    dragging = null;
    dragImage = null;
  }
}

function startDrag(type, imgSrc){
  dragging = type;
  dragImage = loadImage(imgSrc);
}

const button = document.getElementById("clicker");

button.addEventListener("click", () => {
  generate();
  console.log(`Environment reimagined with new seed.`);
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




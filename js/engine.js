// engine.js

let seaLife = [];
const sandHeight = 100;
let kelpPositions = []; // Array to store kelp positions


// Function to generate initial world values
function seedGetter(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Initialize sea life
function initializeSeaLife(seed) {
  seaLife = [];
  for (let i = 0; i < 10; i++) {
    seaLife.push({
      type: i % 2 === 0 ? 'coral' : 'fish',
      x: Math.random() * width,
      y: Math.random() * (height - sandHeight)
    });
  }
}

function addKelp(x, y) {
  if (y > height - sandHeight) { // Check if y-coordinate is within the sand area
    seaLife.push(new Plant(x, y));
  }
}




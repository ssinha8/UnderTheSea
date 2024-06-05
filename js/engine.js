// engine.js

let seaLife = [];
const sandHeight = 100;
let inventory = {
  kelp: 0,
  coral: 0
};
const maxKelp = 10;
const maxCoral = 5;

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
      type: i % 2 === 0 ? 'kelp' : 'coral',
      x: Math.random() * width,
      y: Math.random() * (height - sandHeight)
    });
  }
}

// Initialize inventory
function initializeInventory(seed) {
  // Create a pseudo-random generator based on the seed
  let kelpCount = seed % (maxKelp + 1);
  let coralCount = (Math.floor(seed / 10) % (maxCoral + 1));

  inventory.kelp = kelpCount;
  inventory.coral = coralCount;
  updateInventoryDisplay();
}

// Update the inventory display
function updateInventoryDisplay() {
  $("#kelp-count").text(inventory.kelp);
  $("#coral-count").text(inventory.coral);
}

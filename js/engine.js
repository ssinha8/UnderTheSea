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





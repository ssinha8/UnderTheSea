// engine.js

let seaLife = [];
const sandHeight = 100;
let noiseOffsetX = [];
let noiseOffsetY = [];

// Function to generate initial world values
function seedGetter(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 1000);
}

function initializeSeaLife(seed) {
    seaLife = []; // Clear the seaLife array
    noiseOffsetX = []; // Clear the noise offset arrays
    noiseOffsetY = [];

    randomSeed(seed); // Set the seed for randomness
    noiseSeed(seed);  // Set the seed for Perlin noise

    // Determine the extents of the sand layer
    const sandLayerStart = height - sandHeight;

    // Determine the amounts based on the seed
    const initialKelpCount = floor(random(5, 10));
    const initialCoralCount = floor(random(5, 10));
    const initialFishCount = floor(random(10, 20));

    for (let i = 0; i < initialKelpCount; i++) {
        const x = random(width);
        const y = random(sandLayerStart, height); // Generate y within the sand layer
        seaLife.push({ type: 'kelp', x, y });
    }
    for (let i = 0; i < initialCoralCount; i++) {
        const x = random(width);
        const y = random(sandLayerStart, height); // Generate y within the sand layer
        seaLife.push({ type: 'coral', x, y });
    }
    for (let i = 0; i < initialFishCount; i++) {
        seaLife.push({ type: 'fish', x: random(width), y: random(height - sandHeight) });
        noiseOffsetX.push(random(1000)); // Initialize Perlin noise offsets
        noiseOffsetY.push(random(1000));
    }
}

// Ensure these functions are globally accessible
window.initializeSeaLife = initializeSeaLife;
window.seedGetter = seedGetter;
// sketch.js - purpose and description here
// Author: Your Name
// Date:

let trashParticles = [];
let lastSpawnTime = 0;
const spawnInterval = 10000;

function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");

    $("#clicker").click(generate);

    initializeFish();
    //initializeSeaLife(seed);
    initializeTrash();
    intializeKelp();
    console.log(seaLife);
}

function generate() {
    seed += 1;
    initializeFish();
    initializeTrash();
    lastSpawnTime = millis(); 
    initializeKelp();
}

function draw() {
    noiseSeed(seed);
    randomSeed(seed);
    background(100);
    noStroke();
    fill("#065363");
    rect(0, 0, width, height);
    drawBackground();

    for (let life of seaLife) {
        life.update();
        life.draw();
    }

    for (let fish of fishBucket) {
        fish.update();
        fish.draw();
    }

    for (let trash of trashParticles) {
        trash.move();
        trash.display();
    }

    trashParticles = trashParticles.filter(trash => !trash.isOffScreen());

    generateTrash();
}

function mousePressed() {
    for (let i = trashParticles.length - 1; i >= 0; i--) {
        if (trashParticles[i].isClicked(mouseX, mouseY)) {
            trashParticles.splice(i, 1);
            break;
        }
    }
}

function initializeTrash() {
    trashParticles = [];
}


function generateTrash() {
    if (millis() - lastSpawnTime > spawnInterval) {
        let newTrash = new Trash();
        trashParticles.push(newTrash);
        lastSpawnTime = millis();
    }
}

// Mouse pressed function to remove fish
function mousePressed() {
    console.log(`Mouse clicked at (${mouseX}, ${mouseY})`);
  
    for (let i = fishBucket.length - 1; i >= 0; i--) {
      if (fishBucket[i].contains(mouseX, mouseY)) {
        console.log(`Fish at index ${i} clicked and removed`);
        fishBucket.splice(i, 1);
        break; // Stop checking after the first match
      }
    }
  }
  
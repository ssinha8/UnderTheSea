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
    initializeSeaLife(seed);
    initializeTrash();
}

function generate() {
    seed += 1;
    initializeFish();
    initializeSeaLife(seed);
    initializeTrash();
    lastSpawnTime = millis(); 
}

function draw() {
    noiseSeed(seed);
    randomSeed(seed);
    background(100);
    noStroke();
    fill("#065363");
    rect(0, 0, width, height);
    drawBackground();

    for (let fish of fishBucket) {
        fish.update();
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
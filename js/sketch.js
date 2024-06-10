
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
    //intializeKelp();
    console.log(seaLife);
}

function generate() {
    seed += 1;
    initializeFish();
    initializeTrash();
    lastSpawnTime = millis(); 
    //initializeKelp();
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

     // Check if the mouse click is within the sand layer
    if (mouseY > height - sandHeight) {
      seaLife.push(new Plant(mouseX, mouseY));
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

function addKelp(x, y) {
  if (y > height - sandHeight) { // Check if y-coordinate is within the sand area
    seaLife.push(new Plant(x, y));
  }
}

/**
 * Exported functiuons for use in engine or skethc.js
 */

function drawBackground() {
    lightRays();
}

function lightRays() {
    let shapeWidth = 50;

    for (let i = 0; i < 50; i++) {
        let movement = sin(millis());
        
        let x1 = random(-shapeWidth, width - shapeWidth) + movement;
        let x2 = x1 + shapeWidth + movement;
    

        let alpha = random(0.8, 0.95) + sin(second())/10

        fill(random(250, 255), random(250, 255), 0, alpha);
        
        beginShape();
        
        vertex(x1 + shapeWidth, 0);
        vertex(x1, 0);
        vertex(x2, height);
        vertex(x2 + shapeWidth, height);
        
        endShape(CLOSE);
    }
}

function seaGrass(canvas) {

}


class Trash {
    constructor() {
        this.x = random(width); 
        this.y = 0;
        this.size = random(10, 20);
        this.speed = random(0.5, 1);
    }
  
    move() {
        this.y += this.speed;
  
        if (this.y + this.size / 2 > height) {
            this.y = height - this.size / 1.5;
            this.speed = 0;  
        }
    }
  
    display() {
        noStroke();
        fill(51, 102, 0); 
        ellipse(this.x, this.y, this.size);
    }
  
    isOffScreen() {
        return this.y > height;
    }
  
    isClicked(mx, my) {
        let d = dist(mx, my, this.x, this.y);
        return d < this.size / 2;
    }
  
    reset() {
        this.x = random(width); 
        this.y = 0;
        this.speed = random(0.5, 1); 
    }
  }
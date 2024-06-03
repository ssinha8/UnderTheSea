class Fish {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speed = random(1, 3);
      this.direction = random(TWO_PI);
      this.changeDirectionInterval = random(60, 180);
      this.timeSinceLastChange = 0;
      this.noiseOffset = random(1000); // Unique noise offset for each fish
    }
  
    draw() {
      push();
      translate(this.x, this.y);
  
      // Body
      fill(150, 100, 250);
      ellipse(0, 0, this.size * 2, this.size);
  
      // Tail
      fill(100, 50, 200);
      triangle(
        -this.size,
        0,
        -this.size * 1.5,
        -this.size / 2,
        -this.size * 1.5,
        this.size / 2
      );
  
      // Eye
      fill(255);
      ellipse(this.size / 2, -this.size / 4, this.size / 4, this.size / 4);
      fill(0);
      ellipse(this.size / 2, -this.size / 4, this.size / 8, this.size / 8);
  
      pop();
    }
  
    move() {
      this.x += this.speed * cos(this.direction);
      this.y += this.speed * sin(this.direction);
  
      // Wrap around canvas edges
      if (this.x > width) this.x = 0;
      if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      if (this.y < 0) this.y = height;
    }
  
    changeDirection() {
      this.direction = noise(this.noiseOffset) * TWO_PI;
      this.noiseOffset += 0.1; // Increment noise offset for new values
    }
  
    updateChangeInterval() {
      this.changeDirectionInterval = noise(this.noiseOffset) * 120 + 60;
      this.noiseOffset += 0.01;
    }
  
    update() {
      this.timeSinceLastChange++;
      if (this.timeSinceLastChange >= this.changeDirectionInterval) {
        this.changeDirection();
        this.updateChangeInterval();
        this.timeSinceLastChange = 0;
      }
      this.move();
      this.draw();
    }
  }
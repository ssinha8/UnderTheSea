class Fish extends BaseObject {
  constructor(x, y, size) {
    super(x, y)
    this.size = size;
    this.speed = random(1, 3);
    this.direction = random(TWO_PI);
    this.targetDirection = this.direction;
    this.changeDirectionInterval = random(60, 180);
    this.timeSinceLastChange = 0;
    this.noiseOffset = random(1000); // Unique noise offset for each fish
    this.flipped = false; // Track if the fish is flipped

    // Randomly choose a drawing style for each body part
    this.tail = floor(random(tailTypes));
    this.body = floor(random(bodyTypes));
    this.eye = floor(random(eyeTypes));

    // Define anchor point
    this.anchorX = -this.size; // All bodies and tails will connect at this x position
  }

  draw() {
    noStroke();
    push();
    translate(this.x, this.y);

    // Rotate fish to its angle
    rotate(this.direction);

    // Apply horizontal flip if necessary
    if (this.flipped) {
      scale(1, -1);
    }

    // Draw body
    let eye = this.drawBody();

    // Draw tail
    this.drawTail();

    // Draw eye
    this.drawEye(eye.x, eye.y);

    pop();
  }

  drawTail() {
    fill(100, 50, 200);
    if (this.tail == 0) {
      // Triangle tail
      triangle(
        this.anchorX,
        0,
        this.anchorX - this.size * 0.5,
        -this.size / 2,
        this.anchorX - this.size * 0.5,
        this.size / 2
      );
    } else if (this.tail == 1) {
      // Another tail type
      beginShape();
      vertex(this.anchorX, 0);
      vertex(this.anchorX - this.size * 0.5, -this.size * 0.6);
      vertex(this.anchorX - this.size * 0.25, 0);
      vertex(this.anchorX - this.size * 0.5, this.size * 0.6);
      endShape(CLOSE);
    } else if (this.tail == 2) {
      let tailLength = this.size; // Length of the tail
      beginShape();
      vertex(this.anchorX, 0); // Tail anchor
      bezierVertex(
        this.anchorX - tailLength / 2,
        -this.size / 2,
        this.anchorX - tailLength,
        -this.size / 4,
        this.anchorX - tailLength / 4,
        0
      ); // First curve
      bezierVertex(
        this.anchorX - tailLength,
        this.size / 4,
        this.anchorX - tailLength / 2,
        this.size / 2,
        this.anchorX,
        0
      ); // Second curve
      endShape(CLOSE);
    }
  }

  drawBody() {
    fill(150, 100, 250);
    if (this.body == 0) {
      // Ellipse body
      ellipse(this.anchorX + this.size, 0, this.size * 2, this.size);
      let x = this.anchorX + this.size * 1.5;
      let y = -this.size / 4;
      return { x: x, y: y };
    } else if (this.body == 1) {
      // Sideways arc body
      let arcWidth = this.size * 1.5; // Longer body
      let arcHeight = this.size; // Maintain height
      let offsetX = this.anchorX - arcWidth / 6;
      let headX = this.anchorX + arcWidth;
      let headY = 0;

      beginShape();

      for (let angle = HALF_PI; angle > 0; angle -= PI / 36) {
        let x = offsetX + arcWidth * cos(angle);
        let y = (arcHeight / 2) * sin(angle);
        if (x <= offsetX + arcWidth / 1.2) {
          vertex(x, y);
        }
      }

      vertex(headX, headY);

      for (let angle = 0; angle >= -HALF_PI; angle -= PI / 36) {
        let x = offsetX + arcWidth * cos(angle);
        let y = (arcHeight / 2) * sin(angle);
        if (x <= offsetX + arcWidth / 1.2) {
          vertex(x, y);
        }
      }
      vertex(this.anchorX, 0);
      vertex(offsetX, arcHeight / 2); // Tail bottom
      endShape(CLOSE);

      let x = this.anchorX + this.size;
      let y = -this.size / 6;
      return { x: x, y: y };
    } else if (this.body == 2) {
      // Pufferfish body with spikes only in the front part
      fill(200, 150, 250);
      let innerRadius = this.size;

      // Draw the inner circle for the entire body
      ellipse(this.anchorX + innerRadius, 0, innerRadius * 2, innerRadius * 2);

      // Draw spikes only between 45 degrees and -45 degrees
      let startAngle = (-2 * PI) / 3;
      let endAngle = (2 * PI) / 3;
      let spikeCount = 12; // Number of spikes in the specified angle range

      for (let i = 0; i < spikeCount; i++) {
        let angle1 = lerp(startAngle, endAngle, i / spikeCount);
        let angle2 = lerp(startAngle, endAngle, (i + 1) / spikeCount);
        let spikeLength = this.size * 0.15;

        // Inner points on the circumference of the circle
        let xInner1 = this.anchorX + innerRadius * cos(angle1) + innerRadius;
        let yInner1 = innerRadius * sin(angle1);
        let xInner2 = this.anchorX + innerRadius * cos(angle2) + innerRadius;
        let yInner2 = innerRadius * sin(angle2);

        // Outer point extended outward
        let xOuter =
          this.anchorX +
          (innerRadius + spikeLength) * cos((angle1 + angle2) / 2) +
          innerRadius;
        let yOuter = (innerRadius + spikeLength) * sin((angle1 + angle2) / 2);

        // Draw each spike as a triangle
        fill(200, 150, 250);
        triangle(
          xInner1,
          yInner1, // First point on the circle's circumference
          xInner2,
          yInner2, // Second point on the circle's circumference
          xOuter,
          yOuter // Outer point of the spike
        );
      }
      let x = this.anchorX + this.size * 1.5;
      let y = -this.size / 4;
      return { x: x, y: y };
    } else if (this.body == 3) {
      // Pufferfish body with spikes only in the front part
      fill(200, 150, 250);
      let innerRadius = this.size;

      // Draw the inner circle for the entire body
      ellipse(
        this.anchorX + innerRadius,
        0,
        innerRadius * 2,
        innerRadius * 1.5
      );

      // Draw spikes only between 45 degrees and -45 degrees
      let startAngle = (-5 * PI) / 6;
      let endAngle = (5 * PI) / 6;
      let circleCount = 12; // Number of spikes in the specified angle range

      for (let i = 1; i < circleCount; i++) {
        let angle = lerp(startAngle, endAngle, i / circleCount);
        let circleRadius = this.size * 0.15;

        // Center point of each circle
        let xCenter =
          this.anchorX + innerRadius * 0.95 * cos(angle) + innerRadius;
        let yCenter = innerRadius * 0.7 * sin(angle);

        // Draw each circle
        fill(200, 150, 250);
        ellipse(xCenter, yCenter, circleRadius * 2, circleRadius * 2);
      }
      let x = this.anchorX + this.size * 1.5;
      let y = -this.size / 4;
      return { x: x, y: y };
    } else if (this.body == 4) {
      // Custom polygon with curves
      let bodyLength = this.size * 2;
      let bodyHeight = this.size * 0.8;

      beginShape();
      vertex(this.anchorX, -bodyHeight / 2); // Tail top

      // Upper curve
      bezierVertex(
        this.anchorX + bodyLength * 0.25,
        -bodyHeight * 0.75,
        this.anchorX + bodyLength * 0.75,
        -bodyHeight * 0.75,
        this.anchorX + bodyLength,
        0
      );

      // Lower curve
      bezierVertex(
        this.anchorX + bodyLength * 0.75,
        bodyHeight * 0.75,
        this.anchorX + bodyLength * 0.25,
        bodyHeight * 0.75,
        this.anchorX,
        bodyHeight / 2
      );

      vertex(this.anchorX, -bodyHeight / 2); // Close the shape
      endShape(CLOSE);

      let x = this.anchorX + this.size * 1.5;
      let y = -this.size / 4;
      return { x: x, y: y };
    }
  }

  drawEye(x, y) {
    fill(255);
    if (this.eye == 0) {
      // Circular eye
      ellipse(x, y, this.size / 4, this.size / 4);
      fill(0);
      ellipse(x, y, this.size / 8, this.size / 8);
    } else if (this.eye == 1) {
      // Another eye type
      ellipse(x, y, this.size / 4, this.size / 4);
      fill(0);
      ellipse(x + this.size / 16, y, this.size / 8, this.size / 8);
    } else if (this.eye == 2) {
      // Crazy eye type
      fill(30);
      ellipse(x, y, this.size / 4, this.size / 4);
    }
  }

  move() {
    this.x += this.speed * cos(this.direction);
    this.y += this.speed * sin(this.direction);

    // Wrap around canvas edges
    if (this.y < 0 - this.size * 3) {
      this.y = noise(this.noiseOffset) * (height * 0.97);
      this.x = width + this.size * 2;
      this.noiseOffset += 0.1;
    }
    if (this.x > width + this.size * 3) this.x = 0 - this.size * 3;
    if (this.x < 0 - this.size * 3) this.x = width + this.size * 3;
  }

  changeDirection() {
    this.targetDirection = noise(this.noiseOffset) * TWO_PI;
    this.noiseOffset += 0.1; // Increment noise offset for new values
  }

  updateChangeInterval() {
    this.changeDirectionInterval = noise(this.noiseOffset) * 120 + 60;
    this.noiseOffset += 0.01;
  }

  update() {
    this.direction = atan2(sin(this.direction), cos(this.direction));

    this.timeSinceLastChange++;
    if (this.timeSinceLastChange >= this.changeDirectionInterval) {
      this.changeDirection();
      this.updateChangeInterval();
      this.timeSinceLastChange = 0;
    }

    if (this.y + this.size > height * 0.97) {
      this.targetDirection = noise(this.noiseOffset) * -PI;
      this.noiseOffset += 0.1;
    }

    // Interpolate direction to target direction
    let angleDifference = this.targetDirection - this.direction;
    angleDifference = atan2(sin(angleDifference), cos(angleDifference)); // Normalize angle difference
    this.direction += angleDifference * 0.05; // Adjust 0.05 for smoothness

    // Check if the direction crosses the vertical axis
    if (
      (this.direction > HALF_PI || this.direction < -HALF_PI) &&
      !this.flipped
    ) {
      this.flipped = true; // Flip the fish horizontally
    } else if (
      this.direction <= HALF_PI &&
      this.direction >= -HALF_PI &&
      this.flipped
    ) {
      this.flipped = false; // Unflip the fish horizontally
    }

    this.move();
    //this.draw();
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.size / 2;
  }
}

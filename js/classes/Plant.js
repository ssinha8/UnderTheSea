class Plant extends BaseObject {
    constructor(x, y) {
        super(x, y);
        this.size = 0;
        this.segmentLength = 100;
    }

    draw() {
        fill("green");
        stroke("darkgreen");

        let segmentY = this.y + this.segmentLength/2;
        for (let i = 0; i < this.size; i++) {
            let segmentX = this.x + 3 * sin(noise(this.x) * millis()/1000);
            curve(segmentX + this.segmentLength, segmentY, segmentX, segmentY - this.segmentLength, segmentX, segmentY, segmentX - this.segmentLength, segmentY);
            segmentY = segmentY - this.segmentLength/2;
        }
        
    }

    update() {

        if (noise(this.x + this.y + millis()) < 0.1) { 
            this.size++;
        }
    }
}
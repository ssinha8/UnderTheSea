class Plant extends BaseObject {
    constructor(x, y) {
        super(x, y);
        this.size = 5;
        this.segmentLength = 100;
    }

    draw() {
        fill("green");
        stroke("darkgreen");

        let segmentY = this.y;
        for (let i = 0; i < this.size; i++) {
            curve(this.x + this.segmentLength, segmentY, this.x, segmentY - this.segmentLength, this.x, segmentY, this.x - this.segmentLength, segmentY);
            segmentY = segmentY + this.segmentLength;
        }
        
    }
}
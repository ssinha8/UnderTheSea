/**
 * Base class for interactable objects
 */

class BaseObject {
    constructor(x, y) {
            this.x = x
            this.y = y;
        }

    /**
     * Overide, this is what is called to draw this object
     * @param canvas the p5 canvas object to draw on
     * @Returns
     */
    draw() {
        
    }

    /**
     * 
     * overide, this is called every frame and does logic 
     */
    update() {
        
    }

}
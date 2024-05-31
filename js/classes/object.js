/**
 * Base class for interactable objects
 */

class Object {
    constructor(x, y) {
            this.x = x
            this.y = y;
        }

    draw() {
        /**
         * Overide, this is what is called to draw this object
         */
    }
}
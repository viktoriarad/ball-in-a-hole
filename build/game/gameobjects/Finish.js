import { Circle } from './Circle.js';
export class Finish extends Circle {
    constructor(_fieldSize, ballRadius) {
        super(ballRadius * 1.5);
        this.fieldSize = _fieldSize;
    }
    generateNewPosition() {
        this._x = Math.floor(Math.random() * (this.fieldSize.width * 0.2) + this._radius);
        this._y = Math.floor(Math.random() * (this.fieldSize.height - this._radius * 2) + this._radius);
    }
    checkIfBallGotInside(ball) {
        const x = (Math.abs(this._x - ball.x) - this._radius) <= 0;
        const y = (Math.abs(this._y - ball.y) - this._radius) <= 0;
        return x && y;
    }
}
//# sourceMappingURL=Finish.js.map
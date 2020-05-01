import { Circle } from './Circle.js';
export class Finish extends Circle {
    constructor(ballRadius) {
        super(ballRadius * 1.5);
    }
    /**
     * Funkcja generuje i przypisuje nowa pozycje dla dziury finiszowej na planszy gry.
     * @returns {void}
     */
    generateNewPosition(fieldSize) {
        this._x = Math.floor(Math.random() * (fieldSize.width * 0.2) + this._radius);
        this._y = Math.floor(Math.random() * (fieldSize.height - this._radius * 2) + this._radius);
    }
    /**
     * Funkcja sprawdza czy pilka trafila do dziury finiszowej.
     * @returns {boolean} True jesli trafila lub false jesli nie.
     */
    checkIfBallGotInside(ball) {
        const x = (Math.abs(this._x - ball.x) - this._radius) <= 0;
        const y = (Math.abs(this._y - ball.y) - this._radius) <= 0;
        return x && y;
    }
}
//# sourceMappingURL=Finish.js.map
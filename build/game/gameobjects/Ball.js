import { Circle } from './Circle.js';
export class Ball extends Circle {
    constructor(_fieldSize, ballRadius) {
        super(ballRadius);
        this.fieldSize = _fieldSize;
    }
    /**
     * Funkcja generuje i przypisuje nowa pozycje dla pilki na planszy gry.
     * @returns {void}
     */
    generateNewPosition() {
        this._x = Math.floor((this.fieldSize.width * 0.8) + Math.random() * (this.fieldSize.width * 0.2) - this._radius);
        this._y = Math.floor(Math.random() * (this.fieldSize.height - this._radius * 2) + this._radius);
    }
    ;
    /**
     * Funkcja przesuwa pilke o podana ilosc wedlug wspolrzednych x i y.
     * @returns {void}
     */
    moveBy(position) {
        this._x -= position.x;
        this._y -= position.y;
    }
    ;
}
//# sourceMappingURL=Ball.js.map
import { Circle } from './Circle.js';
export class Star extends Circle {
    constructor(ballRadius) {
        super(ballRadius * 1.5);
        this.drawPoints = [];
        this.visible = true;
    }
    ;
    /**
     * Funkcja generuje i przypisuje nowa pozycje dla gwiazdki na planszy gry.
     * @returns {void}
     */
    generate(fieldSize) {
        this.visible = true;
        this.generateNewPosition(fieldSize);
        this.generateDrawPoints();
    }
    ;
    /**
     * Funkcja przypisuje nowa pozycje dla gwiazdki na planszy gry.
     * @returns {void}
     */
    generateNewPosition(fieldSize) {
        this.visible = true;
        this._x = Math.floor((fieldSize.width * 0.4) + Math.random() * (fieldSize.width * 0.2) + this._radius);
        this._y = Math.floor(Math.random() * (fieldSize.height - this._radius * 2) + this._radius);
        this.generateDrawPoints();
    }
    ;
    /**
     * Funkcja generuje punkty rysowania gwiazdki.
     */
    generateDrawPoints() {
        let rot = Math.PI / 2 * 3;
        const step = Math.PI / 5;
        this.drawPoints.length = 0;
        this.drawPoints.push({ x: this._x, y: (this._y - this._radius) });
        for (let i = 0; i < 5; i++) {
            let x = this._x + Math.cos(rot) * this._radius;
            let y = this._y + Math.sin(rot) * this._radius;
            this.drawPoints.push({ x, y });
            rot += step;
            x = this._x + Math.cos(rot) * this._radius / 2;
            y = this._y + Math.sin(rot) * this._radius / 2;
            this.drawPoints.push({ x, y });
            rot += step;
        }
    }
    ;
    /**
     * Funkcja sprawdza czy pilka trafila do gwiazdki.
     * @returns {boolean} True jesli trafila lub false jesli nie.
     */
    checkIfBallGotInside(ball) {
        const x = (Math.abs(this._x - ball.x) - this._radius) <= 0;
        const y = (Math.abs(this._y - ball.y) - this._radius) <= 0;
        return x && y;
    }
    ;
    /**
     * Funkcja zmienia wartosc visible na false aby ukryc gwiazdke.
     * @returns {void}
     */
    hide() {
        this.visible = false;
    }
    ;
}
//# sourceMappingURL=Star.js.map
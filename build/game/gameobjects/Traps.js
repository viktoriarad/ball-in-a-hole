import { Hole } from "./Hole.js";
export class Traps {
    constructor(_ballRadius) {
        this.traps = [];
        this.ballRadius = _ballRadius;
    }
    ;
    /**
     * Funkcja sprawdza czy pilka trafila do jednej z pulapek.
     * @returns {boolean} True jesli trafila lub false jesli nie.
     */
    checkIfBallGotInside(ball) {
        return this.traps.some((trap) => {
            const x = Math.abs(trap.x - ball.x) - trap.radius <= 0;
            const y = Math.abs(trap.y - ball.y) - trap.radius <= 0;
            return x && y;
        });
    }
    ;
    /**
     * Funkcja generuje wszystkie czerwone pulapki
     * @returns {void}
     */
    generateTraps(level, finishHole, ball, fieldSize) {
        const trapsAmount = 5 + level * 2;
        const radius = this.ballRadius + level;
        this.clearTraps();
        for (let i = 0; i <= trapsAmount; i++) {
            this.traps.push(this.generateTrap(radius, finishHole, ball, fieldSize));
        }
    }
    ;
    /**
     * Funkcja generuje pulapke i sprawdza aby sie nie znajdowala zablisko obok innych elementow gry
     * @returns {void}
     */
    generateTrap(radius, finishHole, ball, fieldSize) {
        const x = Math.floor(Math.random() * (fieldSize.width - radius * 2) + radius);
        const y = Math.floor(Math.random() * (fieldSize.height - radius * 2) + radius);
        const trapCrossing = this.traps.some((hole) => {
            const nearX = Math.abs(hole.x - x) - hole.radius - radius <= 0;
            const nearY = Math.abs(hole.y - y) - hole.radius - radius <= 0;
            return nearX && nearY;
        });
        const ballCrossing = (Math.abs(ball.x - x) - ball.radius - radius <= radius &&
            Math.abs(ball.y - y) - ball.radius - radius <= radius);
        const finishCrossing = (Math.abs(finishHole.x - x) - finishHole.radius - radius <= 0 &&
            Math.abs(finishHole.y - y) - finishHole.radius - radius <= 0);
        if (trapCrossing || ballCrossing || finishCrossing) {
            return this.generateTrap(radius, finishHole, ball, fieldSize);
        }
        else {
            return new Hole(radius, x, y);
        }
    }
    ;
    /**
     * Funkcja zwraca tablice ze wszystkimi pulapkami na planszy gry.
     * @returns {Array<ICircle>}
     */
    getAll() {
        return this.traps;
    }
    ;
    /**
     * Funkcja wyczyszcza tablice ze wszystkimi pulapkami na planszy gry.
     * @returns {void}
     */
    clearTraps() {
        this.traps.length = 0;
    }
    ;
}
//# sourceMappingURL=Traps.js.map
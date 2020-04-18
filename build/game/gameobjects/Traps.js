import { Hole } from "./Hole.js";
export class Traps {
    constructor(_fieldSize) {
        this.traps = [];
        this.fieldSize = _fieldSize;
    }
    checkIfBallGotInside(ball) {
        return this.traps.some((trap) => {
            const x = Math.abs(trap.x - ball.x) - trap.radius <= 0;
            const y = Math.abs(trap.y - ball.y) - trap.radius <= 0;
            return x && y;
        });
    }
    /**
     * Funkcja generuje wszystkie czerwone pulapki
     * @void
     */
    generateTraps(level, finishHole, ball) {
        const trapsAmount = 5 + level * 2;
        const radius = 15 + level;
        for (let i = 0; i <= trapsAmount; i++) {
            this.traps.push(this.generateTrap(radius, finishHole, ball));
        }
    }
    /**
     * Funkcja generuje pulapke i sprawdza aby sie nie znajdowala zablisko obok innych elementow gry
     * @void
     */
    generateTrap(radius, finishHole, ball) {
        const x = Math.floor(Math.random() * (this.fieldSize.width - radius * 2) + radius);
        const y = Math.floor(Math.random() * (this.fieldSize.height - radius * 2) + radius);
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
            return this.generateTrap(radius, finishHole, ball);
        }
        else {
            return new Hole(radius, x, y);
        }
    }
    ;
    getAll() {
        return this.traps;
    }
}
//# sourceMappingURL=Traps.js.map
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
    generateTraps(level, finishHole, ball, star, fieldSize) {
        const trapsAmount = 5 + level * 2;
        const radius = this.ballRadius + level;
        this.clearTraps();
        while (this.traps.length <= trapsAmount) {
            const generatedTrap = this.generateTrap(radius, finishHole, ball, star, fieldSize);
            if (generatedTrap.radius !== 0) {
                this.traps.push(generatedTrap);
            }
        }
    }
    ;
    /**
     * Funkcja generuje pulapke i sprawdza aby sie nie znajdowala zablisko obok innych elementow gry
     * @returns {void}
     */
    generateTrap(radius, finishHole, ball, star, fieldSize) {
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
        const starCrossing = (Math.abs(star.x - x) - star.radius - radius <= 0 &&
            Math.abs(star.y - y) - star.radius - radius <= 0);
        if (trapCrossing || ballCrossing || finishCrossing || starCrossing) {
            return new Hole(0, 0, 0);
        }
        else {
            return new Hole(radius, x, y);
        }
    }
    ;
    /**
     * Funkcja zwraca tablice ze wszystkimi pulapkami na planszy gry.
     * @returns {Array}
     */
    getAll() {
        return this.traps;
    }
    ;
    /**
     * Funkcja zmniejsza ilosc pulapek o podana wartosc razy.
     * @returns {void}
     */
    decreaseTraps(rate) {
        const decreasedTraps = [];
        for (let i = 0; i < this.traps.length; i++) {
            if (i % rate === 0) {
                decreasedTraps.push(this.traps[i]);
            }
        }
        this.traps.length = 0;
        for (let i = 0; i < decreasedTraps.length; i++) {
            this.traps.push(decreasedTraps[i]);
        }
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
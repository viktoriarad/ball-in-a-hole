var States;
(function (States) {
    States[States["INIT"] = 0] = "INIT";
    States[States["PLAY"] = 1] = "PLAY";
    States[States["PAUSE"] = 2] = "PAUSE";
    States[States["WIN"] = 3] = "WIN";
    States[States["OVER"] = 4] = "OVER";
})(States || (States = {}));
export class State {
    constructor() {
        this.state = States.INIT;
    }
    /**
     * Funkcja zmienia stan gry na wystartowany
     * @returns {void}
     */
    start() {
        return this.state === States.PLAY;
    }
    ;
    /**
     * Funkcja sprawdza czy gra sie wystartowala
     * @returns {boolean} True or false
     */
    isStarted() {
        return this.state === States.PLAY || this.state === States.PAUSE;
    }
    ;
    /**
     * Funkcja sprawdza czy gra sie wystartowala
     * @returns {boolean} True or false
     */
    isActive() {
        return this.state === States.PLAY;
    }
    ;
    /**
     * Funkcja zmienia stan gry na zatrzymany
     * @returns {void}
     */
    pause() {
        if (this.state === States.PLAY) {
            this.state = States.PAUSE;
        }
    }
    ;
    /**
     * Funkcja sprawdza czy gra jest w pauzie
     * @returns {boolean} True or false
     */
    isPaused() {
        return this.state === States.PAUSE;
    }
    ;
    /**
     * Funkcja sprawdza czy gra jest wygrana
     * @returns {boolean} True or false
     */
    isWin() {
        return this.state === States.WIN;
    }
    ;
    /**
     * Funkcja sprawdza czy gra jest przegrana
     * @returns {boolean} True or false
     */
    isGameOver() {
        return this.state === States.OVER;
    }
    ;
    /**
     * Funkcja konczy gre z przegranym wynikiem
     * @returns {void}
     */
    over() {
        this.state = States.OVER;
    }
    ;
    /**
     * Funkcja konczy gre z wygranym wynikiem
     * @returns {void}
     */
    win() {
        this.state = States.WIN;
    }
    ;
}
//# sourceMappingURL=State.js.map
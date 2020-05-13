export class Clock {
    constructor(game) {
        this.intervalId = -1;
        this.game = game;
        this.value = { hours: 0, minutes: 0, seconds: 0 };
    }
    ;
    /**
     * Funkcja zwieksza czas o sekunde.
     */
    tick() {
        if (this.value.seconds < 59) {
            this.value.seconds += 1;
        }
        else if (this.value.minutes < 59) {
            this.value.seconds = 0;
            this.value.minutes += 1;
        }
        else {
            this.value.seconds = 0;
            this.value.minutes = 0;
            this.value.hours += 1;
        }
        this.game.tick();
    }
    ;
    /**
     * Funkcja co sekunde zwieksza czas.
     */
    start() {
        this.value = { hours: 0, minutes: 0, seconds: 0 };
        this.stopTick();
        this.intervalId = window.setInterval(this.tick.bind(this), 1000);
    }
    ;
    /**
     * Funkcja wstrzymuje czas.
     */
    pause() {
        this.stopTick();
    }
    ;
    /**
     * Funkcja zatrzymuje czas.
     */
    stopTick() {
        if (this.intervalId >= 0) {
            window.clearInterval(this.intervalId);
        }
    }
    ;
    /**
     * Funkcja wznawia zwiekszenie czasu.
     */
    resume() {
        this.intervalId = window.setInterval(this.tick.bind(this), 1000);
    }
    ;
    /**
     * Funkcja zwraca aktualny czas w formacie { hours: number, minutes: number, seconds: number }.
     */
    getValue() {
        return this.value;
    }
    ;
    /**
     * Funkcja zwraca aktualny czas w sekundach
     */
    getValueInSecs() {
        return (this.value.hours * 3600) + (this.value.minutes * 60) + this.value.seconds;
    }
    ;
    /**
     * Funkcja zwraca aktualny czas w formacie "godziny:minuty:sekundy".
     */
    getValueString() {
        const hr = this.value.hours > 0 ?
            this.value.hours > 9 ?
                this.value.hours + ":" :
                "0" + this.value.hours + ":" :
            "";
        const min = this.value.minutes > 9 ?
            this.value.minutes + ":" :
            "0" + this.value.minutes + ":";
        const sec = this.value.seconds > 9 ?
            "" + this.value.seconds :
            "0" + this.value.seconds;
        return hr + min + sec;
    }
    ;
}
//# sourceMappingURL=Clock.js.map
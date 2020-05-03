export class Clock {
    constructor() {
        this.intervalId = 0;
        this.value = { hours: 0, minutes: 0, seconds: 0 };
    }
    ;
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
    }
    ;
    start() {
        this.value = { hours: 0, minutes: 0, seconds: 0 };
        this.intervalId = window.setInterval(this.tick.bind(this), 1000);
    }
    ;
    pause() {
        window.clearInterval(this.intervalId);
    }
    ;
    resume() {
        this.intervalId = window.setInterval(this.tick.bind(this), 1000);
    }
    ;
    getValue() {
        return this.value;
    }
    ;
    getValueInSecs() {
        return (this.value.hours * 3600) + (this.value.minutes * 60) + this.value.seconds;
    }
    ;
    getValueString() {
        const hr = this.value.hours > 0 ?
            this.value.hours > 9 ?
                this.value.hours + " " :
                "0" + this.value.hours + " " :
            "";
        const min = this.value.minutes > 9 ?
            this.value.minutes + " " :
            "0" + this.value.minutes + " ";
        const sec = this.value.seconds > 9 ?
            "" + this.value.seconds :
            "0" + this.value.seconds;
        return hr + min + sec;
    }
}
//# sourceMappingURL=Clock.js.map
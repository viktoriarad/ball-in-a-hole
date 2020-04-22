export class Device {
    constructor(_game) {
        this.motionPermission = false;
        this.game = _game;
        this.isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        this.screenSize = this.defineScreenSize();
        this.setOrientationChangeEventHandler();
    }
    /**
     * Funkcja prosi o pozwolenie aby sie korzystac z API sensorow
     * @returns {boolean} True if permission was granted and false if not.
     */
    requestSensorsPermission() {
        if (this.motionPermission) {
            this.game.start();
            return this.motionPermission;
        }
        if (typeof (DeviceMotionEvent) !== 'undefined' && typeof (DeviceMotionEvent.requestPermission) === 'function') {
            DeviceMotionEvent.requestPermission()
                .then((response) => {
                if (response === 'granted') {
                    this.motionPermission = true;
                    this.game.start();
                }
            })
                .catch(console.error);
        }
        else {
            alert('DeviceMotionEvent is not defined. Sorry you can\'t play this game!');
        }
        return this.motionPermission;
    }
    ;
    /**
     * Funkcja zwraca rozmiar ekranu urzadzenia w pixeliach
     * @returns {{width: {number}, height: {number}}} Object with width and height.
     */
    getScreenSize() {
        return this.screenSize;
    }
    ;
    /**
     * Funkcja dodaje nasłuchiwanie na zmianę orientacji urządzenia
     * @returns {{width: {number}, height: {number}}} Object with width and height.
     */
    setOrientationChangeEventHandler() {
        window.addEventListener('orientationchange', this.onOrientationChange.bind(this));
    }
    ;
    setDeviceOrientationEventHandler() {
        window.addEventListener('deviceorientation', this.onOrientationEvent.bind(this));
    }
    ;
    onOrientationEvent(e) {
        const x = parseFloat(e.beta.toFixed(1));
        const y = parseFloat(e.gamma.toFixed(1));
        this.game.accelerate({ x, y });
    }
    ;
    /**
     * Funkcja obsluguje eventy sensorow urzadzenia
     * @returns {void}
     */
    onOrientationChange() {
        this.game.onOrientationChange();
    }
    ;
    /**
     * Funkcja definiuje rozmiar ekranu urzadzenia w pixeliach
     * @returns {{width: {number}, height: {number}}} Object with width and height.
     */
    defineScreenSize() {
        const screenSize = { width: 0, height: 0 };
        if (this.isiOS) {
            screenSize.width = window.screen.width;
            screenSize.height = window.screen.height;
        }
        else {
            screenSize.width = window.innerWidth;
            screenSize.height = window.innerHeight;
        }
        return screenSize;
    }
    ;
    /**
     * Funkcja zwraca wlasciwosci dotyczace orientacji urzadzenia
     * @returns {{default: {string}, current: {string}, reversed: {boolean}}} Returns object with three properties
     */
    getOrientation() {
        const defaultOrientation = this.screenSize.width > this.screenSize.height ? 'landscape' : 'portrait';
        const orientation = { default: defaultOrientation, current: defaultOrientation, reversed: false };
        switch (window.orientation) {
            case 0:
                orientation.current = defaultOrientation;
                break;
            case 90:
                orientation.current = defaultOrientation === 'landscape' ? 'portrait' : 'landscape';
                break;
            case -90:
                orientation.current = defaultOrientation === 'landscape' ? 'portrait' : 'landscape';
                if (orientation.default === 'portrait')
                    orientation.reversed = true;
                break;
            default:
                orientation.current = defaultOrientation;
                break;
        }
        return orientation;
    }
    ;
    /**
     * Funkcja sparwdza czy urzadzenie jest w landscape mode
     * @returns {boolean} True or false
     */
    get isLandscape() {
        return this.getOrientation().current === 'landscape';
    }
    /**
     * Funkcja sparwdza czy urzadzenie jest w portrait mode
     * @returns {boolean} True or false
     */
    get isPortrait() {
        return this.getOrientation().current === 'portrait';
    }
}
//# sourceMappingURL=Device.js.map
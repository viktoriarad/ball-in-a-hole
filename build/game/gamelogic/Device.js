export class Device {
    constructor(_game) {
        this.motionPermission = false;
        this.game = _game;
        this.isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        this.screenSize = this.defineScreenSize();
    }
    ;
    /**
     * @returns {void}
     */
    setupDeviceHandlers() {
        this.setOrientationChangeEventHandler();
        this.setResizeEventHandler();
        this.checkFullScreenAPI();
    }
    /**
     * Funkcja prosi o pozwolenie aby sie korzystac z API sensorow urzadzenia.
     * @returns {boolean} True lub false jesli pozwolenie nie zostalo nadane.
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
            alert('DeviceMotionEvent nie istnieje. Nie mozesz zagrac w gre.');
        }
        return this.motionPermission;
    }
    ;
    /**
     * Funkcja zwraca rozmiar ekranu urzadzenia w pixeliach.
     * @returns {ISize} Obiekt z wysokoscia i szerokoscia.
     */
    getScreenSize() {
        return this.screenSize;
    }
    ;
    /**
     * Funkcja dodaje nasłuchiwanie na zmianę orientacji urządzenia.
     * @returns {void}
     */
    setOrientationChangeEventHandler() {
        window.addEventListener('orientationchange', this.onOrientationChange.bind(this));
    }
    ;
    /**
     * Funkcja dodaje nasłuchiwanie na zmianę polozenia urzadzenia.
     * @returns {void}
     */
    setDeviceOrientationEventHandler() {
        window.addEventListener('deviceorientation', this.onOrientationEvent.bind(this));
    }
    ;
    /**
     * Funkcja dodaje nasłuchiwanie na zmianę rozmiaru stronki (globalny obiekt window).
     * @returns {void}
     */
    setResizeEventHandler() {
        window.addEventListener('resize', this.onResizeEvent.bind(this));
    }
    ;
    /**
     * Funkcja obsluguje zdarzenia zmiany rozmiaru stronki.
     * @returns {void}
     */
    onResizeEvent() {
        this.checkFullScreenAPI();
        this.game.onResize(this.defineScreenSize());
    }
    ;
    /**
     * Funkcja obsluguje zdarzenia zmiany polozenia urzadzenia, przekazywuje te dane do glownego obiektu game
     * @returns {void}
     */
    onOrientationEvent(e) {
        const x = parseFloat(e.beta.toFixed(1));
        const y = parseFloat(e.gamma.toFixed(1));
        this.game.accelerate({ x, y });
    }
    ;
    /**
     * Funkcja obsluguje zdarzenia zmiany orientacji urzadzenia
     * @returns {void}
     */
    onOrientationChange() {
        this.screenSize = this.defineScreenSize();
        this.game.onOrientationChange();
    }
    ;
    checkFullScreenAPI() {
        const fullScreenEnabled = document.fullscreenEnabled || document.webkitFullscreenEnabled;
        const isInFullScreen = document.fullscreenElement || document.webkitFullscreenElement ? true : false;
        if (fullScreenEnabled && !isInFullScreen) {
            this.game.requestFullScreen();
        }
    }
    setFullScreen() {
        if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
        }
        else if (document.body.webkitRequestFullscreen) {
            document.body.webkitRequestFullscreen();
        }
    }
    /**
     * Funkcja definiuje rozmiar ekranu urzadzenia w pixeliach
     * @returns {ISize} Obiekt z wysokoscia i szerokoscia.
     */
    defineScreenSize() {
        const screenSize = { width: 0, height: 0 };
        if (this.isiOS) {
            screenSize.width = window.screen.width;
            screenSize.height = window.screen.height;
        }
        else {
            screenSize.width = window.outerWidth;
            screenSize.height = window.outerHeight;
        }
        return screenSize;
    }
    ;
    /**
     * Funkcja zwraca wlasciwosci dotyczace orientacji urzadzenia
     * @returns {IOrientation} Zwraca obiekt z trzema wlasciwosciami.
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
     * Funkcja sparwdza czy urzadzenie jest w landscape widoku
     * @returns {boolean} True lub false
     */
    get isLandscape() {
        return this.getOrientation().current === 'landscape';
    }
    ;
    /**
     * Funkcja sparwdza czy urzadzenie jest w portrait widoku
     * @returns {boolean} True lub false
     */
    get isPortrait() {
        return this.getOrientation().current === 'portrait';
    }
    ;
}
//# sourceMappingURL=Device.js.map
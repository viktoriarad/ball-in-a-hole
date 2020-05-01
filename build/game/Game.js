import { Device, View, State } from './gamelogic/index.js';
import { Ball, Finish, Traps } from './gameobjects/index.js';
export class Game {
    constructor(ballRadius) {
        this.device = new Device(this);
        this.fieldSize = this.defineFieldSize(this.device.getScreenSize());
        this.view = new View(this, this.fieldSize);
        this.ball = new Ball(ballRadius);
        this.finish = new Finish(ballRadius);
        this.traps = new Traps(ballRadius);
        this.state = new State();
        this.level = 0;
        this.device.setupDeviceHandlers();
        this.updateOrientationViewOnInit();
    }
    ;
    /**
     * Funkcja obsluguje zdarzenie nacisniecia przycisku Start.
     * @returns {void}
     */
    onPressStartBtn() {
        if (this.device.isiOS) {
            this.device.requestSensorsPermission();
        }
        else {
            this.start();
        }
    }
    ;
    /**
     * Funkcja rozpoczyna gre.
     * @returns {void}
     */
    start() {
        this.view.onStart();
        this.nextLevel();
        this.render();
        this.device.setDeviceOrientationEventHandler();
    }
    ;
    /**
     * Funkcja rozpoczyna gre z nastepnym levelem.
     * @returns {void}
     */
    nextLevel() {
        this.level += 1;
        this.ball.generateNewPosition(this.fieldSize);
        this.finish.generateNewPosition(this.fieldSize);
        this.traps.generateTraps(this.level, this.finish, this.ball, this.fieldSize);
        this.state.start();
    }
    ;
    /**
     * Funkcja kontynuje gre po pausie.
     * @returns {void}
     */
    resume() {
        this.state.start();
    }
    ;
    /**
     * Funkcja zatryzumje gre na pausie.
     * @returns {void}
     */
    pause() {
        this.state.pause();
    }
    ;
    /**
     * Funkcja restartuje gre.
     * @returns {void}
     */
    restart() {
        this.level = 0;
        this.nextLevel();
    }
    ;
    /**
     * Funkcja zwraca rozmiar planszy gry. Nie zaleznie od urzadzenia zawsze przypisyjemy wieksza wartosc do szerokosci
     * i mniejsza do wysykosci.
     * @returns {ISize}
     */
    defineFieldSize(screenSize) {
        return {
            width: screenSize.width > screenSize.height ? screenSize.width : screenSize.height,
            height: screenSize.width > screenSize.height ? screenSize.height : screenSize.width
        };
    }
    ;
    onResize(screenSize) {
        this.fieldSize = this.defineFieldSize(screenSize);
    }
    ;
    requestFullScreen() {
        this.view.showFullScreenMsg();
    }
    ;
    setFullScreen() {
        this.device.setFullScreen();
    }
    getFieldSize() {
        return this.fieldSize;
    }
    ;
    /**
     * Funkcja konczy gre z przegranym wynikiem.
     * @returns {void}
     */
    gameOver() {
        this.state.over();
    }
    ;
    /**
     * Funkcja konczy gre z wygranym wynikiem.
     * @returns {void}
     */
    win() {
        this.state.win();
    }
    ;
    /**
     * Funkcja zwraca obiekty gry.
     * @returns {IGameObjects}
     */
    getGameObjects() {
        return {
            ball: this.ball,
            traps: this.traps.getAll(),
            finish: this.finish
        };
    }
    ;
    /**
     * Funkcja obsluguje zdarzenia zmiany polozenia urzadzenia.
     * @returns {void}
     */
    accelerate(coords) {
        if (!this.state.isActive())
            return;
        this.moveBallBy(coords);
        this.render();
        if (this.state.isGameOver()) {
            this.view.gameOver();
        }
        else if (this.state.isWin()) {
            this.view.win();
        }
    }
    ;
    /**
     * Funkcja obsluguje zachowanie w przypadku zmiany orientacjii urzadzenia
     * @returns {void}
     */
    onOrientationChange() {
        this.state.pause();
        if (this.device.isPortrait) {
            this.view.onPortrait();
        }
        else {
            this.view.onLandscape();
            this.updateLandscapeView();
        }
        this.render();
    }
    ;
    /**
     * Funkcja odswieza widok gry podczas inicjalizacji w zaleznosci od orientacji
     * @returns {void}
     */
    updateOrientationViewOnInit() {
        if (this.device.isPortrait) {
            this.view.onPortrait();
        }
        else {
            this.view.onLandscape();
        }
    }
    ;
    /**
     * Funkcja odswieza widok gry w landscapie
     * @returns {void}
     */
    updateLandscapeView() {
        if (this.state.isPaused()) {
            this.view.onPause();
        }
        else if (this.state.isWin()) {
            this.view.onWin();
        }
        else if (this.state.isGameOver()) {
            this.view.onGameOver();
        }
    }
    ;
    /**
     * Funkcja przesuwa pilke na odpowiednia ilosc pixeli.
     * @returns {void}
     */
    moveBallBy(coords) {
        const orientation = this.device.getOrientation();
        const multiplier = orientation.reversed ? 1 : -1;
        this.ball.moveBy({
            x: coords.x * multiplier * this.level * 0.1,
            y: coords.y * (multiplier * -1) * this.level * 0.1
        });
        if (this.gotInTrap()) {
            this.gameOver();
        }
        else if (this.gotFinish()) {
            this.win();
        }
    }
    ;
    /**
     * Funkcja sprawdza czy pilka nie trafila do czerwonej pulapki
     * @returns {boolean} True or false
     */
    gotInTrap() {
        return this.traps.checkIfBallGotInside(this.ball);
    }
    ;
    /**
     * Funkcja sprawdza czy pilka nie trafila do zielonej dziury (finiszu)
     * @returns {boolean} True or false
     */
    gotFinish() {
        return this.finish.checkIfBallGotInside(this.ball);
    }
    ;
    /**
     * Funkcja odpowiedzialna za rendering widoku gry
     * @returns {void}
     */
    render() {
        if (!this.state.isActive())
            return;
        const objectsToRender = this.getGameObjects();
        this.view.render(objectsToRender);
    }
    ;
}
//# sourceMappingURL=Game.js.map
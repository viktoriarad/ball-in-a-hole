import { Device, View, State } from './gamelogic/index.js';
import { Ball, Finish, Traps } from './gameobjects/index.js';
export class Game {
    constructor(ballRadius) {
        this.device = new Device(this);
        this.fieldSize = this.getFieldSize(this.device.getScreenSize());
        this.view = new View(this, this.fieldSize);
        this.ball = new Ball(this.fieldSize, ballRadius);
        this.finish = new Finish(this.fieldSize, ballRadius);
        this.traps = new Traps(this.fieldSize);
        this.state = new State();
        this.level = 0;
    }
    ;
    onPressStartBtn() {
        this.device.requestSensorsPermission();
    }
    ;
    start() {
        this.view.onStart();
        this.nextLevel();
        this.render();
        this.device.setDeviceMotionEventHandler();
    }
    ;
    /**
     * Funkcja restartuje gre
     * @returns {void}
     */
    nextLevel() {
        this.level += 1;
        this.ball.generateNewPosition();
        this.finish.generateNewPosition();
        this.traps.generateTraps(this.level, this.finish, this.ball);
        this.state.start();
    }
    ;
    resume() {
        this.state.start();
    }
    ;
    pause() {
        this.state.pause();
    }
    ;
    /**
     * Funkcja restartuje gre
     * @returns {void}
     */
    restart() {
        this.level = 0;
        this.nextLevel();
    }
    ;
    getFieldSize(screenSize) {
        return {
            width: screenSize.width > screenSize.height ? screenSize.width : screenSize.height,
            height: screenSize.width > screenSize.height ? screenSize.height : screenSize.width
        };
    }
    /**
     * Funkcja konczy gre z przegranym wynikiem
     * @returns {void}
     */
    gameOver() {
        this.state.over();
    }
    ;
    /**
     * Funkcja konczy gre z wygranym wynikiem
     * @returns {void}
     */
    win() {
        this.state.win();
    }
    ;
    /**
     * Funkcja zwraca obiekty gry
     * @returns {IGameObjects} {{ball: IBall, traps: Array<ICircle>, finish: ICircle}}
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
     * Funkcja sprawdza czy gra jest wygrana
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
     * @returns {boolean} True or false
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
     * Funkcja przesuwa pilke na odpowiednia ilosc pixeli
     * @returns {void}
     */
    moveBallBy(coords) {
        const orientation = this.device.getOrientation();
        const multiplier = orientation.reversed ? -1 : 1;
        this.ball.moveBy({
            x: coords.y * multiplier * this.level * 0.5,
            y: coords.x * multiplier * this.level * 0.5
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
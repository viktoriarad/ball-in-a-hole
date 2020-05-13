import { Device, View, State, Server } from './gamelogic/index.js';
import { Ball, Finish, Traps, Star, Clock } from './gameobjects/index.js';
export class Game {
    constructor(ballRadius) {
        this.bonus = true;
        this.score = 0;
        this.server = new Server(this);
        this.device = new Device(this);
        this.fieldSize = this.defineFieldSize(this.device.getScreenSize());
        this.view = new View(this, this.fieldSize);
        this.ball = new Ball(ballRadius);
        this.star = new Star(ballRadius);
        this.finish = new Finish(ballRadius);
        this.traps = new Traps(ballRadius);
        this.clock = new Clock(this);
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
        this.bonus = true;
        this.ball.generateNewPosition(this.fieldSize);
        this.finish.generateNewPosition(this.fieldSize);
        this.star.generate(this.fieldSize);
        this.traps.generateTraps(this.level, this.finish, this.ball, this.star, this.fieldSize);
        this.state.start();
        this.clock.start();
        this.view.updateGamePanel(this.score, this.level, this.clock.getValueString());
        this.render();
    }
    ;
    /**
     * Funkcja kontynuje gre po pausie.
     * @returns {void}
     */
    resume() {
        this.state.start();
        this.clock.resume();
    }
    ;
    /**
     * Funkcja zatryzumje gre na pausie.
     * @returns {void}
     */
    pause() {
        this.state.pause();
        this.clock.pause();
    }
    ;
    /**
     * Funkcja restartuje gre.
     * @returns {void}
     */
    restart() {
        this.level = 0;
        this.score = 0;
        this.nextLevel();
    }
    ;
    /**
     * Funkcja zwraca rozmiar planszy gry. Nie zaleznie od urzadzenia zawsze przypisyjemy wieksza wartosc do szerokosci
     * i mniejsza do wysykosci.
     * @returns {Size}
     */
    defineFieldSize(screenSize) {
        return {
            width: screenSize.width > screenSize.height ? screenSize.width : screenSize.height,
            height: screenSize.width > screenSize.height ? screenSize.height : screenSize.width
        };
    }
    ;
    /**
     * Funkcja sprawdza rozmiar okna przegladarki i odswieza wartosc zmiennej fieldSize.
     */
    onResize(screenSize) {
        this.fieldSize = this.defineFieldSize(screenSize);
    }
    ;
    /**
     * Funkcja wyswietla komunikat z prosba aby uzytkownik przeszedl w tryb FullScreen.
     */
    requestFullScreen() {
        this.view.showFullScreenMsg();
    }
    ;
    /**
     * Funkcja ustawia tryb FullScreen.
     */
    setFullScreen() {
        this.device.setFullScreen();
    }
    ;
    /**
     * Funkcja zwraca rozmiar planszy gry.
     */
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
        this.addScore();
    }
    ;
    /**
     * Funkcja dodaje wyniki.
     */
    addScore() {
        let roundScore = this.level * 10;
        const timeMax = Math.round(5 + this.level * 0.4);
        if (this.clock.getValueInSecs() <= timeMax) {
            roundScore *= 1.5;
        }
        this.score += roundScore;
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
            star: this.star,
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
        this.pause();
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
     * Funkcja odswieza widok gry podczas inicjalizacji w zaleznosci od orientacji. Widok ukrywa i wyswietla odpowiednie komunikaty.
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
        else if (this.gotStar() && this.bonus) {
            this.bonus = false;
            this.star.hide();
            this.getBonus();
        }
    }
    ;
    /**
     * Funkcja daje uzytkownikowi bonus w postaci zmniejszenia ilosci pulapek o dwa razy.
     */
    getBonus() {
        this.traps.decreaseTraps(2);
    }
    ;
    /**
     * Funkcja sprawdza czy pilka trafila do czerwonej pulapki
     * @returns {boolean} True or false
     */
    gotInTrap() {
        return this.traps.checkIfBallGotInside(this.ball);
    }
    ;
    /**
     * Funkcja sprawdza czy pilka trafila do zielonej dziury (finiszu)
     * @returns {boolean} True or false
     */
    gotFinish() {
        return this.finish.checkIfBallGotInside(this.ball);
    }
    ;
    /**
     * Funkcja sprawdza czy pilka trafila na gwiazdke
     * @returns {boolean} True or false
     */
    gotStar() {
        return this.star.checkIfBallGotInside(this.ball);
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
    /**
     * Funkcja updejtuje najlepszy wynik losowego gracza.
     * @returns {void}
     */
    onServerMessage(data) {
        this.view.updateBestScoreInfo(data);
    }
    ;
    /**
     * Funkcja updejtuje czas na zegarku co sekunde.
     * @returns {void}
     */
    tick() {
        this.view.updateTimeInfo(this.clock.getValueString());
    }
    ;
}
//# sourceMappingURL=Game.js.map
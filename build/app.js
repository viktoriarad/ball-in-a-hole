import { Game } from './game/index.js';
if (window.location.protocol !== 'https:') {
    window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}
const game = new Game(1.5);
//# sourceMappingURL=app.js.map
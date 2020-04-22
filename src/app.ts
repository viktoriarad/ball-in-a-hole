import { Game } from "./game/Game.js";

if (window.location.protocol !== 'https:') {
  window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

const game = new Game(15);

import GameManager from './gamemanger.js';

let canvas = document.querySelector("canvas")
let game = new GameManager(canvas);

game.start();
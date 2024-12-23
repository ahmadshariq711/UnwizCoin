import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

fitToContainer(canvas);
function fitToContainer(canvas){
  // Make it visually fill the positioned parent
  canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

const background = new Image();
background.src = "./assets/background.png";

const deathSound = new Audio("./assets/Death.wav");
deathSound.volume = 0.8;

let playerBulletController = new BulletController(canvas, 10, "#3b79db", true);
let enemyBulletController = new BulletController(canvas, 4, "#c95624", false);
let enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
let player = new Player(canvas, 3, playerBulletController);

let start = false;
let isGameOver = false;
let didWin = false;

document.addEventListener("keydown", event => {
    if (event.code === "Enter") {
        if (!start) {
            start = true;
        }
        else if (isGameOver){
            restart();
        }
    }
});

function restart() {
    playerBulletController = new BulletController(canvas, 10, "#3b79db", true);
    enemyBulletController = new BulletController(canvas, 4, "#c95624", false);
    enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
    player = new Player(canvas, 3, playerBulletController);

    start = true;
    isGameOver = false;
    didWin = false;
}

function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!start) {
        enemyController.drawEnemies(ctx);
        player.drawPlayer(ctx);

        ctx.fillStyle = "white";
        ctx.font = "70px Impact";
        ctx.textAlign = "center";
        ctx.fillText("Press Enter to Start", canvas.width/2, canvas.height / 2);
        ctx.font = "40px Helvetica";
        ctx.fillText("Controls: W to shoot, A & D to move", canvas.width/2, canvas.height / 2 + 60);
    }
    else if (!isGameOver)
    {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

function displayGameOver() {
    if (isGameOver) {
        let text = didWin ? "You win!" : "Game Over";
        ctx.fillStyle = "white";
        ctx.font = "70px Impact";
        ctx.textAlign = "center";
        ctx.fillText(text, canvas.width/2, canvas.height / 2);
        ctx.font = "40px Helvetica";
        ctx.fillText("Press Enter to restart", canvas.width/2, canvas.height / 2 + 60);
    }
}

function checkGameOver() {
    if (isGameOver) {
        return;
    }

    if (enemyBulletController.collideWith(player) || enemyController.collideWith(player)) {
        isGameOver = true;
        deathSound.currentTime = 0;
        deathSound.play();
    }

    if (enemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver = true;
    }
}

setInterval(game, 1000/60);
export default class Player {
    rightPressed = false;
    leftPressed = false;
    shootPressed = false;

    constructor(canvas, velocity, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 75;
        this.width = 17;
        this.height = 18;
        this.image = new Image();
        this.image.src = "assets/wizard.png";

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }
    draw(ctx) {
        if (this.shootPressed) {
            this.bulletController.shoot(this.x + this.width/2, this.y, 4, 10);
        }
        this.move();
        this.collideWithWalls();
        this.drawPlayer(ctx);
    }
    drawPlayer(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    collideWithWalls() {
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x + this.width > this.canvas.width) {
            this.x = this.canvas.width - this.width
        }
    }
    move() {
        if (this.rightPressed) {
            this.x += this.velocity;
        }
        else if (this.leftPressed) {
            this.x -= this.velocity;
        }
    }

    keydown = event => {
        if(event.code === 'KeyD') {
            this.rightPressed = true;
        }
        if(event.code === 'KeyA') {
            this.leftPressed = true;
        }
        if(event.code === 'KeyW') {
            this.shootPressed = true;
        }
    }
    keyup = event => {
        if(event.code === 'KeyD') {
            this.rightPressed = false;
        }
        if(event.code === 'KeyA') {
            this.leftPressed = false;
        }
        if(event.code === 'KeyW') {
            this.shootPressed = false;
        }
    }
}
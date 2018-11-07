
// declaring and selscting canvas
var canvas = document.getElementById("myCanvas");

// ctx is abbr for context
var ctx = canvas.getContext("2d");

// creating Balls with this class
class Ball {
    constructor(radius, color = "#0095DD") {
        this.radius = radius;
        this.color = color;
        this.x = 600;
        this.y = 200;
    }

    render(ctx) {
        // defining x and y - arc's center
        // var x = canvas.width / 2;
        // var y = canvas.height - 30;
        console.log("happening", this.x, this.y)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

//  creating a Ball named crusher, 50 is radius
const crusher = new Ball(50);
crusher.render(ctx);




// creating Bricks with this class
class Brick {

}

// creating Paddle with this class
class Paddle {

    constructor(width, height, color = "#0095DD", startX, startY){
        this.width = width 
        this.height = height
        this.color = color
        this.x = startX
        this.y = startY
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

const saver = new Paddle(100, 20, 'red', canvas.width / 2, canvas.height - 20);

saver.x = 500
saver.render(ctx)

// 

// creating Score with this class
class Score {

}

// creating Lives with this class
class  Lives {

}


class Game {
    constructor() {
        this.paddle = new Paddle()
        this.ball = new Ball()
        // ...

        // addEventListener('keydown', this.keyPressed) ....
    }

    onKeyPressed(e) {
        //...
        this.paddle.x += 7
    }
}

// new Game()
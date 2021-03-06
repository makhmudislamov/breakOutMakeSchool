
	// declaring and selscting canvas
    var canvas = document.getElementById("myCanvas");
// ctx is abbr for context
var ctx = canvas.getContext("2d");

// Rectangle
ctx.beginPath();
// defining rectangle rect(x,y, width, height)
ctx.rect(20, 40, 50, 50);
// assign red color using hex
ctx.fillStyle = "#FF0000";
// filling with red color
ctx.fill();
ctx.closePath();

// Circle
ctx.beginPath();
// takes 6 parameters: x, y - arc's center, start and end angle in radians, direction of drawing - false: clockwise
ctx.arc(300, 260, 30, 0, Math.PI * 2, true);
// assigning color with words
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

// Rectangle with outer stroke colored
ctx.beginPath();
ctx.rect(160, 10, 100, 100);
// coloring borders of rect
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();

// defining x and y - arc's center
var x = canvas.width / 2;
var y = canvas.height - 30;
// 
var ballRadius = 10;
function drawBall() {
    // drawing the ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// building a paddle 
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// small values for x and y and it'll make the ball "move"
var dx = 5;
var dy = -5;
// main function that draws all shapes into canvas
function draw() {
    // clearing the canvas so the ball has no trails
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();
    // updating x and y on eveyframe everytime the ball is repainted = movement. if you dont clear it will leave a trail
    x += dx;
    y += dy;

    // coordinates start with top left
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // letting the paddle to hit the ball
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                // alert("GAME OVER");
                exit
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 5;
                dy = -5;
                paddleX = (canvas.width - paddleWidth);
            }
        }
    }

    // bouncing off the left and right
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // paddle moving logic
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
        // saver.x += 7
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
        saver.x -= 7
    }
    requestAnimationFrame(draw);
}

// adding buttons - user can control the movement of the pads
// defaul value is false because at the beginning the pad is not moved
var rightPressed = false;
var leftPressed = false;

// adding action to the button via eventlistener
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// when we press keydown/up the value is stored and relevant valus is true until jey is released.
function keyDownHandler(e) {
    // 39 is right cursor key
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    // 37 is left cursor key
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

// Collision detection
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}



// bricks
var brickRowCount = 6;
var brickColumnCount = 9;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;


var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
// creating array of colors to use inside the func
const colors = ["green", "red"];
// drawing bricks
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                // challenge 1 - changed the bricks` color
                // ctx.fillStyle = "black";
                // challenge 2 - set the rainbow
                // const hue = c * 9;
                // ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
                // challenge 3 - changed color of each row - colors array should have 3 colors
                // ctx.fillStyle = colors[r%3]
                // challenge 4 - changed color of each row
                // ctx.fillStyle = colors[r % 2];
                // challenge 5 - bricks alternate color - array has 2 colors
                // colors[r % 2 && c % 2];
                const grd = ctx.createLinearGradient(brickX, brickY, (brickX), (brickHeight + brickY));
                grd.addColorStop(1, "orange");
                grd.addColorStop(0, "white");
                grd.addColorStop(0.5, "red");
                ctx.fillStyle = grd;
                // ctx.fill(x, y, , brickHeight);


                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// score for destroying bricks
var score = 0;

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// user lives
var lives = 3;

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
// draw func will be called every 10 mlseconds forever
// the ball is being repainted but not moving
draw(); 

    

    

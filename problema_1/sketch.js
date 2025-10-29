let snake;
let rez = 20;
let food;
let w;
let h;
let gameStarted = false;

function setup() {
  createCanvas(600, 600);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(3);
  snake = new Snake();
  foodLocation();
  
  window.snake = snake;
  
  showStartInstructions();
}

function showStartInstructions() {
  background(50);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text('SNAKE CON CONTROL POR GESTOS', width/2, height/2 - 40);
  textSize(12);
  text('Mueve tu mano en los bordes de la cámara para controlar la serpiente', width/2, height/2);
  text('Haz clic o toca la pantalla para comenzar', width/2, height/2 + 30);
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
    loop();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  } else if (key == ' ') {
    snake.grow();
  } else if (key == 'r' || key == 'R') {
    restartGame();
  }
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
  
  if (snake) {
    for (let i = 0; i < snake.body.length; i++) {
      if (snake.body[i].x === x && snake.body[i].y === y) {
        foodLocation();
        return;
      }
    }
  }
}

function draw() {
  if (!gameStarted) {
    return;
  }
  
  scale(rez);
  background(220);
  
  if (snake.eat(food)) {
    foodLocation();
  }
  
  snake.update();
  snake.show();
  
  if (snake.endGame()) {
    gameOver();
    return;
  }
  
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

function gameOver() {
  print("END GAME");
  background(255, 0, 0, 100);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text('¡GAME OVER!', w/2, h/2 - 20);
  textSize(3);
  text('Puntuación: ' + snake.len, w/2, h/2);
  text('Presiona R para reiniciar', w/2, h/2 + 20);
  noLoop();
}

function restartGame() {
  snake = new Snake();
  window.snake = snake;
  foodLocation();
  gameStarted = true;
  loop();
}
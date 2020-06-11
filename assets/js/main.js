class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.element = document.createElement("div");
    this.element.classList.add("obstacle");
    playground.appendChild(this.element);
    this._positionObstacle();
  }

  _positionObstacle() {
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }
}

const keyMap = {
  TOP: 38,
  RIGHT: 39,
  BOTTOM: 40,
  LEFT: 37,
};

const PLAYER_MOVE_STEP = 20;
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;
const OBSTACLE_WIDTH = 20;
const OBSTACLE_HEIGHT = 300;

class Player {
  element = document.querySelector(".player");
  x = 0;
  y = 0;
  lives = 2;

  constructor() {
    this._initMovement();
  }

  _initMovement() {
    document.addEventListener("keydown", this._movePlayer.bind(this));
  }

  _movePlayer(event) {
    this._handleMovement(event);
    setTimeout(() => {
      this._verifyCollision();
    }, 0);
  }

  _handleMovement(event) {
    switch (event.keyCode) {
      case keyMap.TOP: {
        this.moveTop();
        break;
      }
      case keyMap.RIGHT: {
        this.moveRight();
        break;
      }
      case keyMap.BOTTOM: {
        this.moveBottom();
        break;
      }
      case keyMap.LEFT: {
        this.moveLeft();
        break;
      }
    }
  }

  moveTop() {
    const newY = this.y - PLAYER_MOVE_STEP;
    if (this._isMoveInBoundaries(this.x, newY)) {
      this.y = newY;
      this._updatePosition();
    }
  }

  moveRight() {
    const newX = this.x + PLAYER_MOVE_STEP;
    if (this._isMoveInBoundaries(newX, this.y)) {
      this.x = newX;
      this._updatePosition();
    }
  }

  moveBottom() {
    const newY = this.y + PLAYER_MOVE_STEP;
    if (this._isMoveInBoundaries(this.x, newY)) {
      this.y = newY;
      this._updatePosition();
    }
  }

  moveLeft() {
    const newX = this.x - PLAYER_MOVE_STEP;
    if (this._isMoveInBoundaries(newX, this.y)) {
      this.x = newX;
      this._updatePosition();
    }
  }

  _updatePosition() {
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }

  _updateLives() {
    this.lives = this.lives - 1;
    if (this.lives < 0) {
      alert("Game over!");
      this.lives = 2;
    } else {
      alert("You are dead!,please move around the this obstacle.");
    }
    document.querySelector(".lives").innerHTML = `Lives: ${this.lives}`;
  }

  _verifyCollision() {
    const arrayObstacles = document.querySelectorAll(".obstacle");

    for (let i = 0; i < arrayObstacles.length; i++) {
      if (this._collision(arrayObstacles[i])) {
        this.x = 0;
        this.y = 0;
        this._updatePosition();
        this._updateLives();
      }
    }
  }

  _collision(obstacle) {
    const left1 = this.x;
    const top1 = this.y;
    const right1 = left1 + PLAYER_WIDTH;
    const bottom1 = top1 + PLAYER_HEIGHT;
    const left2 = parseInt(obstacle.style.left);
    const top2 = parseInt(obstacle.style.top);
    const bottom2 = top2 + OBSTACLE_HEIGHT;
    const right2 = left2 + OBSTACLE_WIDTH;
    if (
      bottom1 <= top2 ||
      top1 >= bottom2 ||
      right1 <= left2 ||
      left1 >= right2
    )
      return false;
    return true;
  }

  _isMoveInBoundaries(x, y) {
    if (y < 0) {
      return false;
    }

    if (x < 0) {
      return false;
    }

    if (x > MAP_WIDTH - PLAYER_WIDTH) {
      return false;
    }

    if (y > MAP_HEIGHT - PLAYER_HEIGHT) {
      return false;
    }

    return true;
  }
}

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const playground = document.querySelector(".playground");

const obs1 = new Obstacle(getRandomInteger(20, 100), 0);
const obs2 = new Obstacle(getRandomInteger(140, 220), 200);
const obs3 = new Obstacle(getRandomInteger(260, 340), 0);
const obs4 = new Obstacle(getRandomInteger(380, 460), 200);
const obs5 = new Obstacle(getRandomInteger(500, 580), 0);
const obs6 = new Obstacle(getRandomInteger(620, 700), 200);
const obs7 = new Obstacle(getRandomInteger(740, 820), 0);
const obs8 = new Obstacle(getRandomInteger(860, 940), 200);
const obs9 = new Obstacle(getRandomInteger(980, 980), 0);

const p = new Player();

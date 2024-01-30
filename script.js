const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");
const startScreen = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");
const checkpointMessage = document.querySelector(".checkpoint-screen > p");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 0.5;
let isCheckpointCollisionDetectionActive = true;
// Define the Player class
class Player {
  constructor() {
    this.position = {
      x: 10,
      y: 400,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 40;
    this.height = 40;
  }
  draw() {
    ctx.fillStyle = "#99c9ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  
  // Method to update the player's position and handle collisions
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y = gravity;
      }
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }

    if (this.position.x < this.width) {
      this.position.x = this.width;
    }
  }
}
// Define the Platform class
class Platform {
  constructor(x, y) {
    this.position = {
      x,
      y,
    };
    this.width = 200;
    this.height = 40;
  }
  draw() {
    ctx.fillStyle = "#acd157";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class CheckPoint {
  constructor(x, y) {
    this.position = {
      x,
      y,
    };
    this.width = 40;
    this.height = 70;
  };

  draw() {
    ctx.fillStyle = "#f1be32";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  claim() {
    this.width = 0;
    this.height = 0;
    this.position.y = Infinity;
  }
};

const player = new Player();

const platformPositions = [
  { x: 500, y: 450 },
  { x: 700, y: 400 },
  { x: 850, y: 350 },
  { x: 900, y: 350 },
  { x: 1050, y: 150 },
  { x: 2500, y: 450 },
  { x: 2900, y: 400 },
  { x: 3150, y: 350 },
  { x: 3900, y: 450 },
  { x: 4200, y: 400 },
  { x: 4400, y: 200 },
  { x: 4700, y: 150 }
];

// Create instances of the Platform class based on positions
const platforms = platformPositions.map(
  (platform) => new Platform(platform.x, platform.y)
);

const checkpointPositions = [
  { x: 1170, y: 80 },
  { x: 2900, y: 330 },
  { x: 4800, y: 80 },
];

const checkpoints = checkpointPositions.map(
  checkpoint => new CheckPoint(checkpoint.x, checkpoint.y)
);
// Animation function
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  platforms.forEach((platform) => {
    platform.draw();
  });
 
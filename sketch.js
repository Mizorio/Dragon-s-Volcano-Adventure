//According to java
// Variables defined
var dragonImg, volcanoImg;
var dragon, volcanoes;
var gravity = 0.6;
var score = 0;

// Load images
function preload() {
  dragonImg = loadImage('dragon.png');
  volcanoImg = loadImage('volcano.png');
}

// Set up the game
function setup() {
  createCanvas(500, 450);
  dragon = new Dragon();
  volcanoes = [new Volcano(), new Volcano(width + 400), new Volcano(width + 600)];
  score = 0;
}

// Update the game state
function draw() {
  // Draw the background
  background(0, 50, 100);
  
  // Update and display the dragon
  dragon.update();
  dragon.display();
  
  // Update and display the volcanoes
  for (var i = 0; i < volcanoes.length; i++) {
    volcanoes[i].update();
    volcanoes[i].display();
    
    // Check for collisions
    if (volcanoes[i].hits(dragon)) {
      console.log('Game over!');
      noLoop();
    }
    
    // Increase score if the volcano has passed the dragon
    if (volcanoes[i].x + volcanoes[i].w < dragon.x && !volcanoes[i].scored) {
      score++;
      volcanoes[i].scored = true;
    }
  }
  
  // Display the score
  textSize(32);
  fill(255);
  text(score, width - 50, 50);
  
  // Add new volcanoes if needed
  if (volcanoes[0].x + volcanoes[0].w < 0) {
    volcanoes.shift();
    volcanoes.push(new Volcano(width + 300));
  }
}
//Access to touch
function touchStarted() {
  dragon.jump();
}

// Handle keyboard input
function keyPressed() {
  if (key == ' ') {
    dragon.jump();
  }
}

// Dragon class defined
function Dragon() {
  this.x = 64;
  this.y = height / 2;
  this.vy = 0;
  this.gravity = gravity;
  this.lift = -15;
  
  this.display = function() {
    image(volcanoImg, this.x, this.y, width*0.1, height*0.1);
  };
  
  this.display = function() {
    image(dragonImg, this.x, this.y, width*0.2, height*0.2);
  };
  

  this.update = function() {
    // Apply gravity
    this.vy += this.gravity;
    this.y += this.vy;
    
    // Check for bottom boundary
    if (this.y > height - 64) {
      this.y = height - 64;
      this.vy = 0;
    }
  };
  
  this.jump = function() {
    this.vy += this.lift;
  };
}

// Volcano class defined
function Volcano(x) {
  this.x = x || width;
  this.y = height - 200;
  this.w = 200;
  this.h = 200;
  this.speed = 4;
  this.scored = false;
  
  this.display = function() {
    image(volcanoImg, this.x, this.y, this.w, this.h);
  };
  
  this.update = function() {
    this.x -= this.speed;
  };
  
  this.hits = function(dragon) {
    if (dragon.y + 32 > this.y + this.h || dragon.y + 32 < this.y - this.h/2)
 {
      return false;
    }
    if (dragon.x + 48 > this.x && dragon.x < this.x + this.w) {
      return true;
    }
    return false;
  };
 
}

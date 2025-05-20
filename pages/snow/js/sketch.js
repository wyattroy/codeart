// Definitions
let snowColor = (255);
let groundSnowSize = 5;
let drawing = {snowflakes: [],};
let minSymmetry = 5;
let maxSymmetry = 11;
let angle = 360 / maxSymmetry;
let ground;
let air;
let bgimage;
let timeLastSnowflakeSpawned = 0;
let delay = 500;
let distanceBetweenSnowflakes = 50;
let lastSnowflakePos = (0, 0);
let canvas;
let container;
let n = 1;

function preload() {
  bgimage = loadImage("cambridgeblue.jpg");
}

function setup() {
  container = document.getElementById('canvas-container');
  canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent('canvas-container');
  angleMode(DEGREES);

  ground = createGraphics(container.offsetWidth, container.offsetHeight);
  air = createGraphics(container.offsetWidth, container.offsetHeight);

  resizeBackground();
}


function draw() {
  

  // Draw the buffers
  
  image(ground, 0, 0);
  image(air, 0,0);

  // air.copy(air, n, 0, air.width - n, air.height, 0, 0, air.width - n, air.height);
  air.clear();
  // n += 1;
  // n = n % frameCount;
  // console.log(frameCount);

  // Draw the snowflakes
  for (let i = 0; i < drawing.snowflakes.length; i++) {
    
    // Get snowflake
    let snowflake = drawing.snowflakes[i];

    // Update and display snowflakes
     snowflake.fall();
     snowflake.show();

    // Remove teensy snowflakes from the array to save memory
    if (snowflake.radius < 1) {
      drawing.snowflakes.splice(i, 1);
      
      
      // ground.strokeWeight(groundSnowSize);
      // ground.stroke(snowColor, 200);
      
      // // And print a point of dead pixels to the background
      // ground.point(snowflake.x, snowflake.y);

      // GEt the pixels of the ground buffer
      ground.loadPixels();
      let snowSplatSize = 5;

      for (let x = -snowSplatSize; x < snowSplatSize; x++){
        for (let y = -snowSplatSize; y < snowSplatSize; y++){
          let pix = ground.get(snowflake.x + x, snowflake.y + y);
          let white = 100 * noise(x, y);
          pix[0] += white;
          pix[1] += white;
          pix[2] += white;
          ground.set(snowflake.x + x, snowflake.y + y, pix);
        }
      }

      // let pix = ground.get(snowflake.x, snowflake.y);
      // pix[0] += 50;
      // pix[1] += 0;
      // pix[2] += 0;
      // ground.set(snowflake.x, snowflake.y, pix);
      ground.updatePixels();
    }
    
    // Save the last snowflake's position
    lastSnowflakePos = createVector(snowflake.x, snowflake.y);
  }
  
  // Start the first snowflake
  if (drawing.snowflakes.length == 0){
    lastSnowflakePos = createVector(0, 0);
  }

  // Spawn a new snowflake every time the mouse moves X pixels
  if (lastSnowflakePos.dist(createVector(mouseX, mouseY)) > distanceBetweenSnowflakes){
    let s = new Snowflake(mouseX, mouseY);
    drawing.snowflakes.push(s);
    timeLastSnowflakeSpawned = millis();
  }  
}

class Snowflake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(20, 80);
    this.sym = floor(random(minSymmetry, maxSymmetry));
    this.shrinkrate = random(0.96, 0.99);
    this.tinyArms = floor(random(1, 4));
    this.startAngle = random(0, 10);
  }

  fall() {
    this.radius *= this.shrinkrate;
  }

  show() {
    air.push();
    air.translate(this.x, this.y);
    this.drawSnowflake();
    air.pop();
  }
  
  drawSnowflake() {
    air.stroke(snowColor);
    air.strokeWeight(2);

    // Rotate the snowflake's start angle so they don't all have horizontal lines
    air.rotate(this.startAngle);

    // draw the number of arms that THIS snowflake has
    for (let i = 0; i <= this.sym; i++) {
      
      // Draw one arm of the snowflake
      air.line(0, 0, this.radius, 0);

      // draw the tiny arms
      for (let j = 1; j <= this.tinyArms; j++) {
        air.push();

        // move the drawing point to the end of the arm
        air.translate(this.radius / this.tinyArms * j, 0);

        // drawn an arm to the left
        air.line(0, 0, this.radius * 0.2 / this.tinyArms, -this.radius * 0.2 / this.tinyArms);

        // draw an arm to the right
        air.line(0, 0, this.radius * 0.2 / this.tinyArms, this.radius * 0.2 / this.tinyArms);
        air.pop();
      }

      // Rotate the canvas to draw the next arm
      air.rotate(PI / (0.5 * this.sym));

    }
  }
}

function resizeBackground() {
  let imageAspect = bgimage.width / bgimage.height;
  let canvasAspect = width / height;

  if (canvasAspect > imageAspect) {
    // then the width is greater than the height
    // so use the width to set the scale
    imageW = width;
    imageH = width / imageAspect;
  } else {
    imageH = height;
    imageW = height * imageAspect;
  }

  ground.background(60, 60, 100);
  ground.imageMode(CENTER);
  ground.image(
    bgimage,
    0.5 * ground.width,
    0.5 * ground.height,
    imageW,
    imageH
  );
}

function windowResized() {
  resizeCanvas(container.offsetWidth, container.offsetHeight);
  air = createGraphics(container.offsetWidth, container.offsetHeight);
  ground = createGraphics(container.offsetWidth, container.offsetHeight);
  resizeBackground();
}

function keyPressed(){
  // to MELT the snowflakes (and restart your drawing) press 'm'
  if (key == 'm'){
    console.log("clearing snowflakes");
    drawing.snowflakes = [];
    
    // reload the background image
    ground.image(
      bgimage,
      0.5 * ground.width,
      0.5 * ground.height,
      imageW,
      imageH
    )
  }

  if (key == 's'){
    saveCanvas("snowflake", "png");
  }
}
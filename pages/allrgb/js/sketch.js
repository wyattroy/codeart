let pixX;
let pixY;
let r = 0;
let g = 0;
let b = 0;
let debugR = 0;
let debugG = 0;
let debugB = 0;

function setup() {
  
  createCanvas(4096, 4096);
  pixelDensity(1);
  pixX = width / 2 - 1;
  pixY = height / 2 - 1;
  noLoop();
}

function pingPong(i, maxValue) {
  return maxValue - Math.abs((i % (2 * maxValue)) - maxValue);
}

function draw() {
  background(0);
  loadPixels();

  let x = pixX;
  let y = pixY;
  let length = 1;
  let count = 0;
  let direction = 0;

  let numberOfColors = 256;

  for (let i = 0; i < width * height; i++) {
    // Calculate the index for the current pixel
    let index = (y * width + x) * 4;

    r = i % numberOfColors;
    b = floor(i / numberOfColors) % numberOfColors;
    g = floor(i / (numberOfColors * numberOfColors)) % numberOfColors;
    
    // Try to pingpong the colors; but yields multiple pixels of same color
    // b = pingPong(i, numberOfColors - 1);
    // g = pingPong(Math.floor(i / numberOfColors), numberOfColors - 1);
    // r = pingPong(Math.floor(i / (numberOfColors * numberOfColors)), numberOfColors - 1);

    // Set the pixel color
    pixels[index + 0] = r; // Red
    pixels[index + 1] = g;   // Green
    pixels[index + 2] = b;   // Blue
    pixels[index + 3] = 255; // Alpha

    // Move to the next position in the spiral
    switch (direction) {
      case 0: x++; break; // Right
      case 1: y++; break; // Down
      case 2: x--; break; // Left
      case 3: y--; break; // Up
    }

    count++;
    if (count >= length) {
      count = 0;
      direction = (direction + 1) % 4;
      if (direction % 2 === 0) {
        length++;
      }
    }

    // Stop if we go out of bounds
    if (x < 0 || x >= width || y < 0 || y >= height) {
      break;
    }
  }

  updatePixels();

  // Debugging to find duplicate pixels
  for (let j = 0; j < width * height; j++){
    let index = j * 4;
    
    if (pixels[index + 0] == debugR && pixels[index + 1] == debugG && pixels[index + 2] == debugB){
      console.log("The x y coordinates of j are: " + j % width + " " + floor(j / width));
      // ellipse(j % width, floor(j / width), 100, 100);
    }
  }
}
// Adapted from https://p5js.org/examples/3d-basic-shader.html

// Our main render shader
let myShader;
let minScreenSize = 300;
let maxScreenSize = 4000;

// Ripples variables
let ripplePositions = [];
let rippleTimes = [];
const maxRipples = 10;

// Star variables
let starRadius;
let starDensity;
let starMaxDensity = 80.0;
let starMinDensity = 50.0;
let starMaxRadius = 0.25;
let starMinRadius = 0.18;

// Audio variables
let tone = 500;
let volumeHistory = [];
let volumeHistoryMaxLength = 2 * 60; // stores the last n seconds * 60 frames/ second of volume data
let rippleDelay = 2; // seconds
let sound, fft, waveform, spectrum;

let hasStarted = false;

function preload() {
  myShader = loadShader('./shaders/ripple.vert', 'shaders/ripple.frag');
  sound = loadSound('./assets/herethereherethere.mp3');
}

function setup() {
  // Use WEBGL renderer for shaders
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  noStroke();

  // create a centered HTML div on top:
  startMessage = createDiv("Click anywhere to start the music");
  startMessage.style(`
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
    pointer-events: none;
    font-family: 'Courier New', Courier, monospace;
    opacity: 1;
    transition: opacity 1s ease;
  `);

  calculateStarParameters();

  // Start the audio
  fft = new p5.FFT();

  
}

function draw() {
  // Set the active shader
  shader(myShader);

  let flattenedRipplePositions = ripplePositions.flat();
  myShader.setUniform('u_ripplePositions', flattenedRipplePositions);
  
  const timeNow = millis() * 0.001; // Convert to seconds
  myShader.setUniform('u_time', timeNow); // time in secs

  myShader.setUniform('u_resolution', [width, height]);
  myShader.setUniform('u_rippleStartTimes', Float32Array.from(rippleTimes));
  myShader.setUniform('u_numRipples', ripplePositions.length);
  myShader.setUniform('u_starDensity', starDensity);
  myShader.setUniform('u_starRadius', starRadius);

  // Draw a full screen rectangle to apply the shader to
  rect(0, 0, width, height);

  let songWaveform = fft.waveform();
  let currentVolume = getVolumeFromWaveform(songWaveform);

  volumeHistory.push(currentVolume);
  if (volumeHistory.length > volumeHistoryMaxLength){
    volumeHistory.shift();
  }

  let isLocalMaximum = true;
  for (let i = 0; i < volumeHistory.length; i++){
    let prevIndex = volumeHistory.length - 1 - i;
    if (prevIndex >=0 && currentVolume < volumeHistory[prevIndex]){
      isLocalMaximum = false;
      
      break;
    }
  }
  
  //  console.log(`Current volume: ${currentVolume}`);

  let timeSinceLastRipple = timeNow - rippleTimes[rippleTimes.length - 1];

  if (isLocalMaximum && currentVolume > 0.01 && timeSinceLastRipple > rippleDelay){
    newRipple();
    // console.log(`New Ripple at ${timeNow}`);
  }

  // console.log(`${width}x${height} FPS: ${Math.round(frameRate(), 0)}`);
}

function newRipple(){

  // Remove the oldest ripple
  if (ripplePositions.length >= maxRipples){
    ripplePositions.shift();
    rippleTimes.shift();
  }

  // draw a ripple in a random location
  let newX = random(width);
  let newY = random(height);

  ripplePositions.push([newX / width, newY /  height]);
  
  let currentTime = millis() * 0.001; // Convert to seconds
  rippleTimes.push(currentTime); // Convert to seconds

}

function mousePressed() {

  console.log("🖱️ mousePressed fired, hasStarted =", hasStarted);

  // 1) on very first click, hide the message & resume the audio context
  if (!hasStarted) {
    startMessage.style("opacity: 0");
    setTimeout(() => startMessage.remove(), 1000);

    hasStarted = true;

    let ctx = getAudioContext();
    if (ctx.state !== 'running') {
      ctx.resume();
    }
  }

  // 2) toggling playback on *every* click
  if (!sound.isPlaying()) {
    userStartAudio();
    sound.play();
    newRipple();
  } else {
    sound.pause();
  }
}

function touchStarted() {
  mousePressed();  // Reuse your existing function
}

function getVolumeFromWaveform(waveform){
  let sum = 0;
  for (let i = 0; i < waveform.length; i++){
    sum += waveform[i] * waveform[i];
  }
  let rms = sqrt(sum / waveform.length);
  return rms;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Recalculate screen-related values
  calculateStarParameters();
}

function calculateStarParameters() {
  let maxScreenDim = max(windowWidth, windowHeight);

  // Dynamically adjust based on screen size
  starRadius = map(maxScreenDim, minScreenSize, maxScreenSize, starMaxRadius, starMinRadius);
  starRadius = constrain(starRadius, starMinRadius, starMaxRadius);

  starDensity = map(maxScreenDim, minScreenSize, maxScreenSize, starMinDensity, starMaxDensity);
  starDensity = constrain(starDensity, starMinDensity, starMaxDensity);

  // Update uniforms if needed (optional, depends on your draw loop)
  myShader.setUniform('u_starDensity', starDensity);
  myShader.setUniform('u_starRadius', starRadius);

  // console.log(`Updated starDensity: ${starDensity}, starRadius: ${starRadius}, maxScreenDim: ${maxScreenDim}`);
}

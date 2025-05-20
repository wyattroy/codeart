#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // width and height of the canvas
uniform float u_time; // time in seconds

uniform int u_numRipples;
uniform int u_maxRipples;
uniform vec2 u_ripplePositions[10];   // match maxRipples in JS
uniform float u_rippleStartTimes[10];
uniform float u_starDensity;
uniform float u_starRadius;


// Define constant values
#define starCenter 0.0
#define brightnessRange 0.99
#define tau 6.28
#define twinkleSpeed 20.0
#define twinkleAmount 0.12

#define rippleSpeed 0.1
#define rippleWidth 0.08
#define rippleStartStrength 0.02
#define rippleHeight 40.0
#define rippleFade .5
#define maxRipples 10 // WYATT BRO make sure we manually make this the same as the JS side!! it's insanely complex trying to inject the same number withdynamically into the shader  code



// define a hash function to scramble any values we need randomized
float hash(vec2 p){
  p = fract(p * vec2(5.3983, 5.4427)); // fract only takes the decimal part of the number -- so we multiply the pixel by arbitrary numbers
  p += dot(p, p + 45.23); // dot product of the pixel and the pixel plus 45.23, which scrambles it even further
  return fract(p.y * p.x); // return the decimal part of the product of the x and y of the pixel

}

// Make the whole uv plane ripple
vec2 ripple(vec2 uv, vec2 center, float radius, float width, float strength) {
    vec2 dir = uv - center;          // Direction from ripple center to current pixel
    float dist = length(dir);        // Distance from ripple center to current pixel
    
    // Band creates the ripple ring area (soft edge)
    float band = smoothstep(width, 0.0, abs(dist - radius));
    float oscillation = sin((dist - radius) * rippleHeight) * .5 + .5; // oscillation makes the ripple oscillate (wavy distortion)

    // Offset makes the ripple oscillate (wavy distortion)
    float offset =  (oscillation - 0.5) * strength * band;

    // Move the UV outward/inward along the direction
    return uv + normalize(dir) * offset;
}

void main() {
    // Normalized pixel coordinates (UV)
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Scale X by the aspect ratio to make our grid square
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;
    float maxDistance = length(vec2(aspect, 1.0)); 

    // Create ripples
    for (int i = 0; i < maxRipples; i++) {
      if (i >= u_numRipples) break;

      vec2 rippleCenter = u_ripplePositions[i];
      rippleCenter.x *= aspect;
      float elapsedTime = u_time - u_rippleStartTimes[i];
      elapsedTime = max(0.0, elapsedTime);
      float rippleRadius = elapsedTime * rippleSpeed;
      float fade = 1.0 - (rippleRadius / maxDistance);
      fade = clamp(fade, 0.0, 1.0);
      float rippleStrength = rippleStartStrength * fade;

      uv = ripple(uv, rippleCenter, rippleRadius, rippleWidth, rippleStrength);
    }

    // Scale UV 
    vec2 gridUV = uv * u_starDensity;  

    // Which cell we are in
    vec2 cell = floor(gridUV);
    vec2 cellUV = fract(gridUV);

    // Sample neighboring cells to make sure the stars don't get cut off by the grid lines
    float starBrightness = 0.0;
    vec3 color = vec3(0.0);

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighborCell = cell + vec2(x, y);

        // Star position within neighbor cell
        vec2 starPos = vec2(
          hash(neighborCell + 1.0),
          hash(neighborCell + 2.0)
        );

        // Local UV offset to neighbor
        vec2 neighborCellUV = cellUV - vec2(x, y);

        // Distance from this star to current fragment
        float d = length(neighborCellUV - starPos);

        // Star brightness, twinkle, and color bias (same as before)
        float baseBrightness = (1.0 - brightnessRange) + brightnessRange * hash(neighborCell + 3.0);
        float twinkle = (1.0 - twinkleAmount) + twinkleAmount * sin(u_time * twinkleSpeed + hash(neighborCell + 4.0) * tau);
        float starRadiusRandomized = u_starRadius * hash(neighborCell + 6.0);
        float singleStarBrightness = smoothstep(starRadiusRandomized, starCenter, d) * baseBrightness * twinkle;
        float colorBias = hash(neighborCell + 5.0);

        vec3 baseColor = mix(
          vec3(1.0, 0.8, 0.8),
          vec3(0.7, 0.7, 1.0),
          colorBias
        );

      // Accumulate star brightness and color contribution
      color += baseColor * singleStarBrightness;
      starBrightness += singleStarBrightness; 
    }
  }

  // Clamp brightness to avoid oversaturation
  color = clamp(color, 0.0, 1.0);

  // Omg at long last, color the pixel.
  gl_FragColor = vec4(color, 1.0);
}


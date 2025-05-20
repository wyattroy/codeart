#ifdef GL_ES
precision mediump float;
#endif

// Define constant values
#define TAU 6.2831853071

// Define uniforms that can be passed to this shader.
// We will use 'book of shaders' naming convention.
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Some utility functions to convert from HSV to RGB:
// https://www.shadertoy.com/view/MsS3Wc
// Official HSV to RGB conversion 
vec3 hsv2rgb( in vec3 c ) {
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
	return c.z * mix( vec3(1.0), rgb, c.y);
}

// Smooth HSV to RGB conversion 
vec3 hsv2rgb_smooth( in vec3 c ) {
  vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
	rgb = rgb*rgb*(3.0-2.0*rgb); // cubic smoothing	
	return c.z * mix( vec3(1.0), rgb, c.y);
}

// Utility function to round a float to the nearest integer.
float round(in float v) {
    return floor(v + 0.5);
}



// Main fragment function
void main() {

    // // 1. A solid color 
    // gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    // gl_FragColor = vec4(12.0/256.0, 44.0/256.0, 112.0/256.0, 1.0);



    // // 2. A 1D gradient, from black to full blue
    // // Uses the x coordinate of the pixel to drive the color.
    // gl_FragColor = vec4(gl_FragCoord.x, 0.0, 1.0, 1.0);
    // // red channel expects [0.0, 1.0] range
    // // so we need to normalize it to the screen width
    // float nx = gl_FragCoord.x / u_resolution.x;
    // gl_FragColor = vec4(nx, 0.0, 1.0, 1.0);



    // // 3. A 2D gradient, normalized to screen size. 
    // float nx = gl_FragCoord.x / u_resolution.x; 
    // float ny = gl_FragCoord.y / u_resolution.y;
    // gl_FragColor = vec4(nx, 1.0, ny, 1.0);



    // // 4. We can write the above in a more elegant way:
    // // // vectors can be divided component-wise in shader language...
    // vec2 normCoord = gl_FragCoord.xy / u_resolution.xy; // normalized coord
    // // // ...and then pass as a whole to the constructor of other vectors!
    // gl_FragColor = vec4(1.0, normCoord, 1.0);



    // // 5. Vectors can be "swizzled": the order of their components shuffed.
    // // Note how in this example we switch the xy coordinates:
    // vec2 normCoord = gl_FragCoord.xy / u_resolution.xy;
    // gl_FragColor = vec4(1.0, normCoord.yx, 1.0);  // swizzled yx!
    // vec2 normCoord = gl_FragCoord.xy / u_resolution.xy;
    // gl_FragColor = vec4(1.0, normCoord.yx, 1.0);  // swizzled yx!



    // // 6. A solid color background driven by the mouse position, 
    // // normalized to screen resolution to be in range [0.0, 1.0].
    // vec2 nMouse = u_mouse / u_resolution; //vec 2 because we are dividing both x and y
    // // gl_FragColor = vec4(0.0, nMouse, 1.0); 
    // vec2 nMouse = u_mouse / u_resolution;
    // gl_FragColor = vec4(0.0, nMouse, 1.0);


    // // 7. 1D gradient in HSV space 🌈
    // // Uses one of the utility functions above to to HSV to RGB calculation.
    // // // Assumes HSV values are in the [0,1] range
    // vec2 normCoord = gl_FragCoord.xy / u_resolution.xy;
    // vec3 hsv = vec3(normCoord.x, 1.0, 1.0); // rainbow across x; full saturation and value
    // vec3 rgb = hsv2rgb_smooth(hsv); 
    // gl_FragColor = vec4(rgb, 1.0);



    // // 8. Can we animate the gradient? 😀
    // // Let's add sketch time (in milliseconds) to the normalized coord!
    // // Play with the sign of the time variable to change
    // // the direction of the animation.
    // // Play with scaling the time variable to change the
    // // speed of the animation.
    // // Play with scaling the hue variable to change the
    // // range of colors.
    // vec2 normCoord = gl_FragCoord.xy / u_resolution.xy;
    // float hue = 1.2 * normCoord.x - 0.1 * u_time; //horizontal spacing of colors plus/minus time
    // vec3 hsv = vec3(hue, 1.0, 1.0);
    // vec3 rgb = hsv2rgb_smooth(hsv);
    // gl_FragColor = vec4(rgb, 1.);



    // // 9. limit the hue with mod()
    // vec2 normCoord = gl_FragCoord.xy / u_resolution.xy;
    // float hue = 0.5 * normCoord.x - 0.1 * u_time;
    // // mod(hue, 0.2) calculates the remainder when hue is divided by 0.2; 
    // // This creates a repeating cycle between 0 and 0.2
    // hue = 0.5 + mod(hue, 0.1);
    // vec3 hsv = vec3(hue, 1.0, 1.0);
    // vec3 rgb = hsv2rgb_smooth(hsv);
    // gl_FragColor = vec4(rgb, 1.);



    // // 10. A circular gradient around the center ⚪
    // // Use the length() function to calculate the magnitude of a vector!
    // vec2 screenCenter = 0.5 * u_resolution.xy;
    // // Creates a vector from the current pixel's coordinates to the screen center.
    // vec2 radiusVector = screenCenter - gl_FragCoord.xy;
    // // length(radiusVector): Calculates the distance of the current pixel from the screen center.
    // float gray = length(radiusVector);
    // gl_FragColor = vec4(gray, gray, gray, 1.0);



    // // 11. The previous example maxes out the gray value at len = 1.
    // // We can scale the gradient with a factor:
    // vec2 screenCenter = 0.5 * u_resolution.xy;
    // vec2 radiusVector = screenCenter - gl_FragCoord.xy;
    // float gray = 0.005 * length(radiusVector); // length of the diagonal (performing pythagorean theorem)
    // gl_FragColor = vec4(gray, gray, gray, 1.0);



    // // 12. Or better yet, we can normalize it to the length of the
    // // screen's diagonal from the center to a corner!
    // vec2 screenCenter = 0.5 * u_resolution.xy;
    // float diagonalLength = length(screenCenter);  // length() calculates the distance from (0,0) to the screen center
    // vec2 radiusVector = screenCenter - gl_FragCoord.xy; // center to current pixel
    // float gray = length(radiusVector) / diagonalLength;
    // gl_FragColor = vec4(gray, gray, gray, 1.0);



    // // 13. A circular gradient around the center in HSV space.
    // vec2 screenCenter = 0.5 * u_resolution.xy;
    // float diagonalLength = length(screenCenter);
    // vec2 radiusVector = screenCenter - gl_FragCoord.xy;
    // float hue = length(radiusVector) / diagonalLength; // hue is the normalized distance from the center
    // vec3 hsv = vec3(hue, 1.0, 1.0);
    // vec3 rgb = hsv2rgb(hsv);
    // gl_FragColor = vec4(rgb, 1.0);



    // // 14. A circular gradient around the center in HSV space,
    // // ANIMATED! TRIPPY! 
    // vec2 screenCenter = 0.5 * u_resolution.xy;
    // float diagonalLength = length(screenCenter);
    // vec2 radiusVector = screenCenter - gl_FragCoord.xy;
    // float hue = length(radiusVector) / diagonalLength - 0.1 * u_time;
    // vec3 hsv = vec3(hue, 1.0, 1.0);
    // vec3 rgb = hsv2rgb(hsv);
    // gl_FragColor = vec4(rgb, 1.0);



    // // 15. A circular gradient around the mouse in HSV space.
    // // Note that this works because the mouseY coordinate is flipped
    // // in p5.js before being sent as part of the uniform. 
    // vec2 screenCenter = 0.5 * u_resolution.xy;
    // float diagonalLength = length(screenCenter);
    // vec2 radiusVector = u_mouse - gl_FragCoord.xy; // mouse to current pixel
    // float hue = length(radiusVector) / diagonalLength - 0.1 * u_time;
    // vec3 hsv = vec3(hue, 1.0, 1.0);
    // vec3 rgb = hsv2rgb(hsv);
    // gl_FragColor = vec4(rgb, 1.0);



    // // 16. A solid circle in the center
    // float r = 100.0; // radius of the circle
    // vec2 screenCenter = 0.5 * u_resolution.xy;
    // vec2 radiusVector = screenCenter - gl_FragCoord.xy;
    // float distToCenter = length(radiusVector);
    // // if the distance to the center is less than the radius, the pixel is inside the circle is 0.0;
    // // otherwise, it is 1.0.
    // float gray = step(r, distToCenter);  // if r <= distToCenter, return 1.0, otherwise 0.0
    // gl_FragColor = vec4(gray, gray, gray, 1.0);



    // // 17. Add some colors with mix() function! Mix() function: linear interpolation between two values
    // float r = 80.0; // radius of the circle
    // vec2 screenCenter = 0.5 * u_resolution.xy;
    // vec2 radiusVector = screenCenter - gl_FragCoord.xy;
    // float distToCenter = length(radiusVector);
    // float inCircle = step(r, distToCenter);
    // // Circle color: rgb(0, 140, 255)
    // vec3 circleColor = vec3(0.0/255.0, 140.0/255.0, 225.0/255.0);
    // // Background color: rgb(127, 163, 137)
    // vec3 backgroundColor = vec3(127.0/255.0, 163.0/255.0, 137.0/255.0);
    // // a is the interpolation factor: 0.0 returns the first value, 1.0 the second value.
    // vec3 finalColor = mix(circleColor, backgroundColor, inCircle);
    // gl_FragColor = vec4(finalColor, 1.0);



    // // 18. Edges where very pixelated in the circle above, 
    // // switch to smoothStep() for a more antialiased look.
    // // https://thebookofshaders.com/glossary/?search=smoothstep
    // float r = 100.0;
    // float w = 2.0;  // "width" of the smooth transition
    // vec2 screenCenter = 0.5 * u_resolution.xy;
    // vec2 radiusVector = screenCenter - gl_FragCoord.xy;
    // float distToCenter = length(radiusVector);
    // float gray = smoothstep(r - 0.5 * w, r + 0.5 * w, distToCenter); 
    // gl_FragColor = vec4(gray, gray, gray, 1.0);



    // // 19. Shift the origin to the center and normalize coordinates
    // // first normalize the coordinates to the screen size, then get the distance from the center
    // // normalizes the coordinate system so that the values are scaled relative to the height of the screen
    // float d = length((gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y);
    // // Create a gradient factor that subtly changes over time
    // float gradient = smoothstep(0.0, 0.4, d + 0.1 * sin(u_time));
    // // Define inner and outer colors
    // vec3 innerColor = vec3(0.53, 0.67, 0.46); // green
    // vec3 outerColor = vec3(0.83, 0.73, 0.69); // pink
    // // Mix colors based on the gradient value
    // vec3 color = mix(innerColor, outerColor, gradient);
    // gl_FragColor = vec4(color, 1.0);

}







setResolution(window.innerWidth*2, window.innerHeight*2)
p = new P5(); 
// Parameters for the Lissajous curve
let A = 200; // Amplitude for x
let B = 150; // Amplitude for y
let a = 3;   // Frequency for x
let b = 2;   // Frequency for y
let delta = Math.PI / 2; // Phase difference
p.setup = () => {
  p.createCanvas(1000, 1000); 
  p.noFill(); 
  p.stroke(255, 255, 255); 
  p.strokeWeight(10); 
};
p.draw = () => {
  p.clear(); // Clear the canvas for transparency
  // Make frequencies or phase shift dynamic
  a = 3 + Math.sin(p.frameCount * 0.01); // Smooth frequency change
  delta = Math.sin(p.frameCount * 0.02) * Math.PI; // Phase change
  // Draw Lissajous curve
  p.beginShape();
  for (let t = 0; t < p.TWO_PI; t += 0.01) {
    let x = A * Math.sin(a * t + delta); // X-coordinate
    let y = B * Math.sin(b * t);        // Y-coordinate
    p.vertex(p.width / 2 + x, p.height / 2 + y); // Translate to canvas center
  }
  p.endShape(p.CLOSE);
};
// Hide the p5.js canvas
p.hide();
// Initialize p5 source in Hydra
s0.init({ src: p.canvas });
src(s0) // Use p5.js as the source
  .color(0.8, 0.3, 1) // Add a color tint
  .scale(5) // Adjust the scale
  .out();
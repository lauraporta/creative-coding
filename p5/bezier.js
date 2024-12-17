// Initialize Hydra and P5.js
p5 = new P5({ mode: 'WEBGL' });
// Configurable parameter for controlling the bezier X offset
let xOffset = 100; // Default offset (can be dynamically updated)
// P5.js draw function
p5.draw = () => {
  p5.clear();
  p5.background(5);
  p5.noFill();
  p5.strokeWeight(2);
  p5.colorMode(p5.HSB);
  // Create 10 bezier lines with anchor points controlled by xOffset
  for (let i = 0; i < 500; i += 10) {
    // Set hue dynamically for each line
    let strokeColor = i + 10;
    p5.stroke(strokeColor, 50, 60);
    p5.bezier(
      xOffset - i / 2, // X position of the first anchor point
      0 + i,
      410, // Control point 1 X
      50,  // Control point 1 Y
      440, // Control point 2 X
      300, // Control point 2 Y
      240 - i / 16, // X position of the second anchor point
      300 + i / 8  // Y position of the second anchor point
    );
  }
};
// Initialize Hydra with the P5 canvas
s0.init({ src: p5.canvas });
// Merge P5 canvas with Hydra effects
src(s0)
  .modulate(osc(10, 0.1, 0.5).rotate(0.5), 0.2)
  .blend(gradient().kaleid(4).scale(1.2))
  .out();

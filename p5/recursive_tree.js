// Crashes on Atom
setResolution(window.innerWidth*2, window.innerHeight*2)
// Initialize Hydra and p5 integration
p5 = new P5({ mode: 'WEBGL' });
// Define a configurable parameter for the tree angle
let angle = time / 100; // Default angle (can be dynamically updated)
// p5.js draw function
p5.draw = () => {
  p5.clear();
  p5.background(0);
  p5.translate(0, p5.height / 2, 0); // Start the tree from the bottom
  p5.push();
  p5.stroke(255, 255, 255);
  p5.line(0, 0, 0, -500); // Draw the trunk
  p5.translate(0, -500);
  branch(100, 0);
  p5.pop();
};
// Recursive branch function
function branch(h, level) {
  if (h > 10) {
    p5.push();
    p5.stroke(level * 25, 255, 255); // Set hue based on recursion level
    h *= 0.66; // Scale down branch length
    // Right branch
    p5.rotateZ(p5.radians(angle));
    p5.line(0, 0, 0, -h);
    p5.translate(0, -h);
    branch(h, level + 1);
    p5.pop();
    // Left branch
    p5.push();
    p5.rotateZ(-p5.radians(angle));
    p5.line(0, 0, 0, -h);
    p5.translate(0, -h);
    branch(h, level + 1);
    p5.pop();
  }
}
// Initialize Hydra with the p5 canvas
s0.init({ src: p5.canvas });
// Merge with Hydra effects
src(s0)
  //.scale(0.7)
  //.diff(osc(10, 0.1, 1).rotate(0.1))
  //.blend(gradient().kaleid(4).scale(1.5))
  .out();
// Dynamically update the angle parameter
angle = 20; // Example update
//angle = time / 100

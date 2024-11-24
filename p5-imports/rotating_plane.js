// init p5
p5 = new P5({mode: 'WEBGL'})
  
// you can then draw
p5.draw = () => {
  p5.push();
  p5.translate(0, 0, 0);
  p5.rotateZ(p5.frameCount * 0.01);
  p5.rotateX(p5.frameCount * 0.01);
  p5.rotateY(p5.frameCount * 0.01);
  p5.plane(500); // increase the size for visibility
  p5.pop();
}

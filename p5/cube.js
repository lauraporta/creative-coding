// central perspective - sound sensitive
shape(4, 0.1, () => a.fft[0] * 2).blend(shape(4, 0.01, 0.1)).blend(shape(4, 0.5, 0.7)).out(o1)
// init p5
p5 = new P5({mode: 'WEBGL'})
// you can then draw
p5.draw = () => {
  p5.push();
  p5.translate(0, 0, 0);
  p5.rotateZ(p5.frameCount * 0.01);
  p5.rotateX(p5.frameCount * 0.01);
  p5.rotateY(p5.frameCount * 0.01);
  p5.box(500, 500, 500);
  p5.pop();
}
// merge with hydra code
s0.init({src: p5.canvas})
// put everything together
src(s0).diff(o1).blend(osc(1, 1, () => a.fft[0] * 2).kaleid()).out()

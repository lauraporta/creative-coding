// central perspective - sound sensitive
shape(4, 0.1, () => a.fft[0]).blend(shape(4, 0.01, 0.1)).blend(shape(4, 0.5, 0.7)).out(o1)
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
// merge with hydra code
s0.init({src: p5.canvas})
// put everything together
src(s0).modulate(o1).out()
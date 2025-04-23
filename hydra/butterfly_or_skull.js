setResolution(window.innerWidth*2, window.innerHeight*2) 
osc(2, 1, 1)
.mask(
  shape(50)
  .diff(
    shape(50)
    .scale(0.9)
  )
  .scrollY(-.15)
  .scale(3)
  .scale(() => a.fft[0] * 4 + 1)
)
.out(o0)
// corpo
solid()
.add(
  shape(4)
  .scale(1, 0.1, 1)
)
// testa
.add(
  shape(50)
  .scale(.3, .5, 1)
  .scrollY(.2)
)
// antenne
.add(
  shape(4)
  .scale(.2, 0.1, 1)
  .scrollY(.28)
  .scrollX(.01)
  .rotate(() => a.fft[0] / 15 + .05)
)
.add(
  shape(4)
  .scale(.2, 0.1, 1)
  .scrollY(.28)
  .scrollX(-.01)
  .rotate(() => a.fft[0] / 15 * -1 + -.05)
)
//ali
.add(
  shape(30)
  .scale(.9, () => a.fft[0] / 2 + 0.9, 1)
  .scrollX(-.14)
  .scrollY(.1)
)
.add(
  shape(30)
  .scale(.9, () => a.fft[0] / 2 + 0.9, 1)
  .scrollX(.14)
  .scrollY(.1)
)
.add(
  shape(30)
  .scale(.6, () => a.fft[0] / 2 + 0.9, 1)
  .scrollX(-.07)
  .scrollY(-.07)
)
.add(
  shape(30)
  .scale(.6, () => a.fft[0] / 2 + 0.9, 1)
  .scrollX(.07)
  .scrollY(-.07)
)
.diff(
  shape(30)
  .scale(.6, () => a.fft[0] / 2 + 0.9, 1)
  .scrollX(.16)
  .scrollY(.11)
)
.diff(
  shape(30)
  .scale(.6, () => a.fft[0] / 2 + 0.9, 1)
  .scrollX(-.16)
  .scrollY(.11)
)
.out(o0)
src(o0)
.diff(src(o0).scale(.98))
.out(o1)
render(o1)

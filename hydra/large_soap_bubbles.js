src(s0).modulate(osc(3, 1, 3)).out(o1)


src(o0).modulate(
  noise(() => a.fft[0] * 2)
)
.blend(
    shape([1, 3, 4, 5, 4, 3, 1].smooth())
)
  .modulate(o1)
  .diff(solid(0.5, 0.1, 0.5))
  .diff(osc(10, 1, () => a.fft[0] * 2))
  .scrollY(1, 0.5)
  .modulateKaleid(noise(2), 0.5, 0.5)
  .modulate(voronoi(1).blend(noise(5)))
  .diff(shape([1, 3, 4].smooth()).rotate(() => a.fft[0] * 4))
  .out(o0)
// London, Corsica Studios, December 2024
// https://hydra.ojack.xyz/?sketch_id=FwbXQAhpk25OyuNW
src(o0).modulate(
    noise(1)
  )
  .blend(
      shape([3, 4, 3, 1, 5].smooth())
  )
    .scrollX(0.1, 0.01)
    .scrollY(0.1, 0.01)
    .mult(solid(1, 0.7, 0.4))
    .modulate(noise(() => a.fft[0] * 4))
    .colorama()
    .kaleid()
    .scrollX(0.1, -0.5)
    .scrollY(0.1, () => Math.sine(time) / 5)
    .modulate(voronoi([4, 10]))
    .out(o0)
render(o0)

osc(1, 1, 5).blend(noise(3)).modulate(
  shape([3, 4, 5], 0.5)
  .rotate(() => a.fft[0] * 10, 0.5)
  .modulate(
    noise(() => a.fft[0] * 50)
  )
  .repeat(2, 2)
  .kaleid()
  .modulate(voronoi(5,0.3,0.3))
  .rotate(10, 0.5)
).out()

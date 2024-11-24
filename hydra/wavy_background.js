osc(3, -0.1, () => a.fft[0] * 6)
  .modulateKaleid(
	osc(3, -1), 4
)
  .scale(0.5, 0.5)
  .modulate(noise(5, 0.1))
  .mult(solid(1, 0.5, 0.2))
  .out()
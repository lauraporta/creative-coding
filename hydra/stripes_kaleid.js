solid(0.2, 0.5, 0.5)
  .diff(
  	osc().blend(
      noise(10), [0, 1].smooth()
    )
  )
  .modulateKaleid(osc(10), 10)
  .diff(
  shape([1, 3, 4, 5, 6].smooth())
  .modulate(voronoi(5,0.3,0.3))
  .repeat(2, 2)
  .scrollX(0, 0.1)
)
  .out()
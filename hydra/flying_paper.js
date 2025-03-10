src(o0).modulate(
  noise(1)
)
.blend(
    shape([4])
)
  .scrollX(0.1, 0.01)
  .scrollY(0.1, 0.01)
  .mult(solid(1, 0.7, 0.4))
  .out(o0)

// London October 2024 live coding meetup
// https://hydra.ojack.xyz/?sketch_id=ASqZVZlY8ShwKLbt
src(o0).modulate(
    noise(1)
  )
  .blend(
      shape([50])
    .modulate(noise([1, 5, 10, 20].smooth()))
  )
    .scrollX(0.1, 0.01)
    .scrollY(0.1, Math.sin(time*2)/3)
    .mult(
      solid(0.5, 2, 1.5)
    )
    .diff(
      shape([1, 4].smooth())
      .scale([1, 2].smooth(),1,1)
      .modulate(noise([4, 10].smooth()
      )))
      .diff(
      shape([1, 3].smooth())
      .scale([0.5, 1].smooth(),1,1)
      .modulate(noise([4, 10].smooth()
      )))
      .diff(
      shape([1, 50].smooth())
      .scale([0, 0.5].smooth(),1,1)
      .modulate(noise([4, 10].smooth()
      )))
      .pixelate([1000, 25, 1000, 50, 1000, 250], [1000, 25, 1000, 50, 1000, 250])
    .out(o0)

let sin = () => Math.sin(time / 100)
voronoi(sin,0)
  .diff(
  	src(o0)
  	.scale(0.9)
    .scrollX(0.1, 0.1)
    .scrollY(0.1, 0.1)
  )
  .luma(0.5)
  .colorama(1, 1, 1)
.out(o0)

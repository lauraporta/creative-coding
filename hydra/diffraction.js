let sf = 40
let tf = -0.005
let c = 0.7
let sin = () => Math.sin(time)
let cos = () => Math.cos(time) / 100
osc(sf, tf, c)
  .kaleid(50)
  .scrollX(0.01)
  .out(o0)
osc(sf, tf, c)
  .kaleid(50)
  .scrollX(-0.01)
  .out(o1)
osc(sf, tf, c)
  .kaleid(50)
  .scrollX(cos)
  .out(o2)
src(o0)
  .modulate(
	src(o1)
  )
  .modulate(
	src(o2)
  )
  .luma()
  .out(o3)
render()

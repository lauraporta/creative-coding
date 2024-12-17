a.show()
let a0 = () => a.fft[0]
let a1 = () => a.fft[1]
let a2 = () => a.fft[2]
let a3 = () => a.fft[3]
shape(4).repeat(a0).out(o0)
shape(4).repeat(a1).out(o1)
shape(4).repeat(a2).out(o2)
shape(4).repeat(a3).out(o3)
render()

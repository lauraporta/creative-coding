//  Currently not working on Atom
//  Not sure how to import screen

s0.initScreen()

src(s0).out(o0)

osc(() => a.fft[0] * 10, 0, 0.5).kaleid().out(o1)

noise(1, 1).out(o2)

src(o0).modulateScale(o1).modulate(o2).out(o3)

render(o3)

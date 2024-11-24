// loading p5 scripts not currently working in Atom

// central perspective - sound sensitive
shape(4, 0.1, () => a.fft[0] * 2).blend(shape(4, 0.01, 0.1)).blend(shape(4, 0.5, 0.7)).out(o1)

await loadScript("p5-import/error_message.js")

// merge with hydra code
s0.init({src: p5.canvas})

// put everything together
src(s0).diff(o1).blend(osc(1, 1, () => a.fft[0] * 2).kaleid()).out()

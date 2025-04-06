// head
shape(50)
.scale(0.5, 1, 1.4)
.scrollX(0.3)
.scrollY(-0.2)
//mouth
.diff(shape(50).scale(0.1, 1, 0.3).scrollX([0.3, 0.28, 0.26].smooth()).scrollY(-0.24).modulate(osc(21, 0).scrollX(0.02)))
// body
.add(shape(50).scale(0.6, 1, 2).scrollX(0.3).scrollY(-0.45).pixelate().modulate(noise(2)))
// clapping hands
.diff(shape(50).scale(0.24, 1, 0.6).scrollX([0.4, 0.3].smooth()).scrollY(() => a.fft[3] * -0.65).modulate(noise(1)))
.diff(shape(50).scale(0.24, 1, 0.6).scrollX([0.37, 0.27].smooth()).scrollY(-0.4).modulate(noise(1)))
// eye
.diff(shape(50).scale(0.1, 1, [1, 0.7].smooth()).scrollX([0.33, 0.3, 0.28].smooth()).scrollY(-0.2))
.diff(shape(50).scale(0.1, 1, [1, 0.7].smooth()).scrollX([0.28, 0.26, 0.24].smooth()).scrollY(-0.2))
// pupil
.add(shape(50).scale(0.04).scrollX([0.33, 0.3, 0.28].smooth()).scrollY(-0.2))
.add(shape(50).scale(0.04).scrollX([0.28, 0.26, 0.24].smooth()).scrollY(-0.2))
//hair
.add(shape(4).scale(0.4).scrollX(0.33).scrollY(-0.1).modulate(noise(5)).luma())
.scale(() => fft(0, 4) * 1.9)
// rescale and center
.scale(0.5)
.scrollX(-.15)
.scrollY(.15)
.scale(1.5)
.out()
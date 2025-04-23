a.show()
solid(0, 0, 0)
.diff(
    shape(50)
    .modulate(
        shape(50)
    )
    .scale(() => a.fft[3]* .7 + 1)
    .rotate(0.9)
    .diff(
        shape(50)
        .scale([.3, .4])
        .scrollY(.07)
        .scale(() => a.fft[0]/ 2 + 1)
    )
    .scrollX(.25)
)
.diff(
    shape(50)
    .modulate(
        shape(50)
    )
    .scale(() => a.fft[3]* .7 + 1)
    .rotate(0.9)
    .diff(
        shape(50)
        .scale([.3, .4])
        .scrollY(.07)
        .scale(() => a.fft[0]/ 2 + 1)
    )
    .scrollX(-.25)
)
.out(o0)
render(o0)
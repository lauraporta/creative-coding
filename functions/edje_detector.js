s0.initCam()
edgeDetector = (img) => {
  return src(img)
    .diff(src(img).rotate(0.01))
    .luma(0.1)
    .thresh(0.1, 0.1)
    .contrast(2)
}
edgeDetector(s0).out()

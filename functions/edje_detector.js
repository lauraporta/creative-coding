s0.initImage("file:///Users/laura/source/github/lauraporta/hydra-p5/images/lake.jpeg")
edgeDetector = (img) => {
  return src(img)
    .diff(src(img).rotate(0.01))
    .luma(0.1)
    .thresh(0.1, 0.1)
    .contrast(2)
}
edgeDetector(s0).out()

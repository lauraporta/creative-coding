plotMathObject = (mathFunc, numShapes, shapeSize, scrollSpeed, scrollOffset) => {
    solid().out();
    for (let i = 0; i < numShapes; i++) {
      let dynamicScroll = () => scrollOffset + mathFunc(time + i * 0.1) / 50;
      src(o0)
        .luma(0.02)
        .mult(solid(), 0.02)
        .add(
          shape(32, shapeSize)
            .scroll(0, dynamicScroll, scrollSpeed)
              .scrollY(-0.2)
        )
        .out();
    }
  };
// Example usage with a sine wave
plotMathObject(
    (x) => Math.sin(x * 2) * 10, // Math function
    2,                         // Number of shapes
    0.002,                      // Shape size
    -0.1,                      // Scroll speed
    0.25                       // Scroll offset
  );
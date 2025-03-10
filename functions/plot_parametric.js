plotParametric = (parametricFunc, numShapes, shapeSize, timeOffset, scale) => {
    solid().out();
    for (let i = 0; i < numShapes; i++) {
      let offset = i * timeOffset; 
      let getX = () => parametricFunc(time + offset).x * scale; 
      let getY = () => parametricFunc(time + offset).y * scale; 
      src(o0)
        .luma(0.02)
        .mult(solid(), 0.02)
        .add(
          shape(32, shapeSize)
            .scroll(getX, getY) 
        )
        .out();
    }
  };
// Example usage with a circle
plotParametric(
    (t) => ({ x: Math.sin(t * 2), y: Math.cos(t * 2) }), // Parametric function
    2,                         // Number of shapes
    0.002,                      // Shape size
    0.1,                      // Time offset
    0.25                       // Scale
  );
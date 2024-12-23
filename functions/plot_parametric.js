plotParametric = (parametricFunc, numShapes, shapeSize, timeOffset, scale) => {
    // Clear previous effects
    solid().out();
  
    for (let i = 0; i < numShapes; i++) {
      let offset = i * timeOffset; // Time offset for each shape
      let getX = () => parametricFunc(time + offset).x * scale; // Scaled x-coordinate
      let getY = () => parametricFunc(time + offset).y * scale; // Scaled y-coordinate
  
      // Add shapes dynamically positioned on the parametric curve
      src(o0)
        .luma(0.02)
        .mult(solid(), 0.02)
        .add(
          shape(32, shapeSize)
            .scroll(getX, getY) // Use dynamic x, y for scrolling
        )
        .out();
    }
  };
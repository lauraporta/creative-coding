//  Currently not working on Atom

// init p5
p5 = new P5({mode: 'WEBGL'})

// you can then draw
let cubes = [];

p5.draw = () => {
  p5.background(20); // dark background
  p5.noFill();
  p5.stroke(255); // white wireframe for cubes

  // Add a new random cube each frame
  cubes.push({
    x: p5.random(-300, 300),
    y: p5.random(-300, 300),
    z: p5.random(-300, 300),
    size: p5.random(20, 80),
    rotateX: p5.random(p5.TWO_PI),
    rotateY: p5.random(p5.TWO_PI),
    rotateZ: p5.random(p5.TWO_PI),
  });

  // Limit the number of cubes to avoid crashing
  if (cubes.length > 100) {
    cubes.shift(); // Remove the oldest cube
  }

  // Draw each cube in the array
  cubes.forEach(cube => {
    p5.push();
    p5.translate(cube.x, cube.y, cube.z);
    p5.rotateX(cube.rotateX + p5.frameCount * 0.01); // animate rotation
    p5.rotateY(cube.rotateY + p5.frameCount * 0.01);
    p5.rotateZ(cube.rotateZ + p5.frameCount * 0.01);
    p5.box(cube.size); // draw the cube
    p5.pop();
  });
}

// To use P5 as an input to hydra, simply use the canvas as a source:
s0.init({src: p5.canvas})

// Then render the canvas
src(s0).out()
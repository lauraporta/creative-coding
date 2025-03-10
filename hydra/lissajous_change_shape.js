// Generalized function for parametric plots
plotParametric = (parametricFunc, numShapes, _shape, timeOffset, scale) => {
	// Clear previous effects
	solid()
		.out();

	for (let i = 0; i < numShapes; i++) {
		let offset = i * timeOffset; // Time offset for each shape
		let getX = () => parametricFunc(time + offset)
			.x * scale; // Scaled x-coordinate
		let getY = () => parametricFunc(time + offset)
			.y * scale; // Scaled y-coordinate

		// Add shapes dynamically positioned on the parametric curve
		return src(o0)
			.luma(0.02)
			.mult(solid(), 0.02)
			.add(
				_shape
				.scroll(getX, getY) // Use dynamic x, y for scrolling
			)
		//.colorama()
		//.out();
	}
};

// Lissajous wave function
lissajousWave = (t, A = 1, B = 1, a = 3, b = 2, delta = Math.PI / 2) => {
	let x = A * Math.sin(a * t + delta);
	let y = B * Math.sin(b * t);
	return {
		x,
		y
	}; // Return both x and y
};


// Example usage with Lissajous waves
plotParametric(
		(t) => lissajousWave(
			t,
			1, // A
			1, // B
			3, // a
			1, // b
			Math.PI / 3
		),
		1, // Number of shapes
		shape(50, 0.05)
		.modulate(noise(10))
		.repeat(2), // Shape
		0.1, // Time offset
		0.2 // Scale for coordinates
	)
	//.modulate(src(o0))
	.kaleid(2)
	//.thresh(0.05)
	//.colorama()
    //.saturate(0.5)
    //.posterize()
    //.color(() => Math.sin(time), 0.7, 0.9)
	//.modulate(osc([0.5, 1].smooth().fast(0.005), 0.1))
	.out(o0);

render(o0)
plotParametric = (parametricFunc, numShapes, _shape, timeOffset, scale) => {
	solid()
		.out();
	for (let i = 0; i < numShapes; i++) {
		let offset = i * timeOffset; 
		let getX = () => parametricFunc(time + offset)
			.x * scale; 
		let getY = () => parametricFunc(time + offset)
			.y * scale; 
		return src(o0)
			.luma(0.02)
			.mult(solid(), 0.02)
			.add(
				_shape
				.scroll(getX, getY) 
			)
	}
};
// Lissajous wave function
lissajousWave = (t, A = 1, B = 1, a = 3, b = 2, delta = Math.PI / 2) => {
	let x = A * Math.sin(a * t + delta);
	let y = B * Math.sin(b * t);
	return {
		x,
		y
	}; 
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
	.out(o0);
render(o0)
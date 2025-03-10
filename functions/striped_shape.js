stripedShape = (sides, iterations) => {
	accumulator = solid(1,1,1); 
  	for(i=1; i<iterations; i++){ 
    	accumulator.diff(shape(sides).scale(i * 0.1));
    }
  	return accumulator;
}
stripedShape(3, 10).out()
// Compare it with:
// shape(4)
//   .thresh(0.5)
//   .diff(o0)
//   .scale(0.9)
//   .out()
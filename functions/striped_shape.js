stripedShape = (sides, iterations) => {
	accumulator = solid(1,1,1); // first part of the patch, a source
  	for(i=1; i<iterations; i++){ // i is also called a "counter`
    	accumulator.diff(shape(sides).scale(i * 0.1));
    }
  	return accumulator;
}
stripedShape(3, 10).out()

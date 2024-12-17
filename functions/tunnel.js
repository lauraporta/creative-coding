// from hydra documentation, layering example
screenRatio = () => 1 
square = () => shape(4,.9,.1).scale(1,screenRatio).luma().color(0,0,0)
tunnel = (q=5) => {
    tunnel = square();
    for(i=1; i<q; i++){
        nextCircle = square()
                        .invert(i%2) 
                        .hue(.01*i)
                        .scale(0.85**i);
        tunnel.layer(nextCircle);
    }
    return tunnel;
}
tunnel(30)
    .out(o0)
render(o0)

await loadScript("https://unpkg.com/ml5@latest/dist/ml5.min.js");

p5 = new P5();

let video;
let handPose;
let hands = [];

// Create webcam stream
video = p5.createCapture(p5.VIDEO);
video.size(640, 480);
video.hide();

// Load hand pose model and start detection
handPose = ml5.handPose(() => {
  handPose.detectStart(video, (results) => {
    hands = results;
  });
});

// Setup canvas
p5.setup = () => {
  p5.createCanvas(640, 480);
};
p5.draw = () => {}; // no need to draw

// Send canvas to Hydra
s0.init({ src: p5.canvas });

// Optional: background cam for layering
s1.initCam();

// Variables for Hydra shape
let scrollX = 0;
let scrollY = 0;
let scaleVal = 1;

// Helper to get midpoint and distance between two hands
function updateFromHands() {
  if (hands.length >= 2) {
    const handA = hands[0];
    const handB = hands[1];

    // Use the base of the hand (keypoint 0 = wrist)
    const a = handA.keypoints[0];
    const b = handB.keypoints[0];

    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Normalize for Hydra scroll range [-1, 1]
    scrollX = (midX / 640 - 0.5) * 2;
    scrollY = (midY / 480 - 0.5) * -2;
    scaleVal = Math.min(Math.max(dist / 300, 0.5), 2); // clamp scale between 0.5 and 2
  }
}
setInterval(updateFromHands, 100); // throttle updates

// Hydra shape controlled by hand positions
shape(50)
  .scrollX(() => scrollX)
  .scrollY(() => scrollY)
  .scale(() => Math.tan(scaleVal))
  .color(0.2, 1, 0.8)
  .diff(src(s1).posterize(6).pixelate(100, 100), 0.5)
  .out();

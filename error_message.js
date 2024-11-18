// init p5
p5 = new P5()

// as in setup - static
p5.rect(300, 100, 100, 100)

// you can then draw
p5.draw = () => {

  // Calculate window position based on mouse location
  const x = p5.mouseX - 150; // Center window on the mouse X position
  const y = p5.mouseY - 50;  // Center window on the mouse Y position

  // Draw the main error window
  p5.fill(255);
  p5.stroke(100);
  p5.rect(x, y, 300, 100); // Main window

  // Title bar
  p5.fill(0, 102, 204); // Windows blue color
  p5.rect(x, y, 300, 20);
  p5.fill(255);
  p5.textSize(12);
  p5.textStyle(p5.BOLD);
  p5.text("Error", x + 10, y + 15);

  // Close "X" button
  p5.fill(255, 50, 50);
  p5.rect(x + 270, y + 3, 15, 15); // Red close button
  p5.fill(255);
  p5.textSize(10);
  p5.text("X", x + 274, y + 13);

  // Error icon (Exclamation mark in a triangle)
  p5.fill(255, 255, 0); // Yellow triangle
  p5.triangle(x + 30, y + 50, x + 40, y + 30, x + 50, y + 50);
  p5.fill(0);
  p5.textSize(18);
  p5.text("!", x + 38, y + 45);

  // Error message
  p5.fill(0);
  p5.textSize(12);
  p5.text("An unexpected error has occurred.", x + 70, y + 40);

  // OK button
  p5.fill(240);
  p5.rect(x + 150, y + 70, 60, 20);
  p5.fill(0);
  p5.textSize(12);
  p5.text("OK", x + 170, y + 85);
}
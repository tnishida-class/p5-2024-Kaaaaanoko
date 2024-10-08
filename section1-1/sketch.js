function setup() {
  createCanvas(128,128);
}

function draw() {
  background(0);
  strokeWeight(1);
  fill(178, 100, 162);
  triangle(12,120,116,120,116,10);
  fill(94, 185, 84);
  triangle(0,108,106,108,106,0);
  fill(255);
  textSize(32);
  textFont("serif");
  text("46", 68, 100);
}

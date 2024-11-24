// 最終課題を制作しよう


let starX, starY; // 星の位置を格納する変数
let cheekSize = 50; // ほっぺたの初期サイズ
let count = 0; // サイクルカウント
let cycle = 100; // サイクルの長さ
let increment = 1; // カウントの増加量
let cheekGrowing = true; // ほっぺたが大きくなっているか小さくなっているかを制御

function setup() {
  createCanvas(windowWidth, windowHeight);
  starX = width / 2; // 初期位置：画面中央（x座標）
  starY = height / 2 + 200; // 熊の顔の下、口の位置を避けてさらに下に配置
}

function draw() {
  background(160, 192, 255); // 背景色（青空をイメージ）

  // 格子模様を描画
  drawGrid(50); // 50pxの格子を描画

  // 熊の顔
  drawBearParts(width / 2, height / 2); // 熊の顔を描く

  // 目の中の5種類の円（左目と右目）
  drawCirclesInEye(width / 2 - 60, height / 2 - 30, 40); // 左目
  drawCirclesInEye(width / 2 + 60, height / 2 - 30, 40); // 右目

  // ほっぺを描く
  drawCheeks(width / 2, height / 2); // ほっぺを描く

  // 鼻と口
  drawMouth(width / 2, height / 2); // 熊の口を描く

  // 星を描く
  drawStar(starX, starY, 50, 80, 5); // 星を描く

  // ほっぺたのアニメーション（Enterキーが押された時）
  if (keyIsDown(ENTER)) {
    animateCheeks(); // ほっぺたのアニメーション
  }

  // 星を右に動かす（カーソル右）
  if (keyIsDown(RIGHT_ARROW)) {
    starX += 5; // 右に動かす
  }
  
  // 星を左に動かす（カーソル左）
  if (keyIsDown(LEFT_ARROW)) {
    starX -= 5; // 左に動かす
  }
}

// ほっぺを描く関数
function drawCheeks(x, y) {
  noStroke();
  fill(255, 182, 193); // ピンク
  ellipse(x - 90, y + 50, cheekSize, 20); // 左ほっぺ
  ellipse(x + 90, y + 50, cheekSize, 20); // 右ほっぺ
}

// 顔、耳、内耳、目などのパーツを描く関数
function drawBearParts(x, y) {
  // 顔
  fill(139, 69, 19); // 茶色
  noStroke();
  ellipse(x, y, 300, 300); // 顔の円

  // 耳
  ellipse(x - 150, y - 100, 100, 100); // 左耳
  ellipse(x + 150, y - 100, 100, 100); // 右耳

  // 内耳
  fill(205, 133, 63); // 明るい茶色
  ellipse(x - 150, y - 100, 60, 60); // 左内耳
  ellipse(x + 150, y - 100, 60, 60); // 右内耳
}

// 目の中に5つの円を描く関数
function drawCirclesInEye(eyeX, eyeY, initialRadius) {
  let radius = initialRadius; // 初期の円の半径（40に倍増）
  let decrement = 8; // 円を縮小する量（倍増）
  let count = 0; // 描画した円の数

  while (count < 5) { // 5つの円を描く
    fill(255, 255 - count * 50, 255 - count * 50); // 白から薄いピンクへ
    ellipse(eyeX, eyeY, radius, radius); // 円を描画
    radius -= decrement; // 半径を縮小
    count++; // カウントを増やす
  }
}

// 格子模様を描く関数
function drawGrid(gridSize) {
  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
      if ((x / gridSize + y / gridSize) % 2 === 0) {
        fill(173, 216, 230); // 水色
      } else {
        fill(255); // 白
      }
      noStroke();
      rect(x, y, gridSize, gridSize);
    }
  }
}

// 鼻と口を描く関数
function drawMouth(x, y) {
  // 鼻
  fill(0); // 黒
  ellipse(x, y + 50, 50, 30); // 鼻

  // 口の線
  stroke(0); // 線の色
  strokeWeight(5);
  line(x, y + 65, x, y + 100); // 鼻から口への線
  line(x, y + 100, x - 30, y + 120); // 左口
  line(x, y + 100, x + 30, y + 120); // 右口
}

// 星を描く関数（黒い線なし）
function drawStar(x, y, radius1, radius2, npoints) {
  fill(255, 223, 0); // 完全に黄色に設定
  noStroke(); // 線を消す
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// ほっぺたのアニメーションを制御する関数
function animateCheeks() {
  count = (count + increment) % cycle; // サイクルに合わせてカウントを進める
  if (keyIsPressed) {
    increment = 2; // キーが押されていればアニメーションを速くする
  } else {
    increment = 1; // 押されていなければ通常速度
  }

  // ほっぺたのサイズを変更
  if (count < cycle / 2) {
    cheekSize = count + 50; // サイズを大きくする
  } else {
    cheekSize = (cycle - count) + 50; // サイズを小さくする
  }
}
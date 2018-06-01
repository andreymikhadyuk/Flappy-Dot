var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;

var blob;
var pipes = [];
var score = 0;
var dead = false;

var scoreAudio = new Audio();
var lostAudio = new Audio();
scoreAudio.src = './audio/score.mp3';
lostAudio.src = './audio/lost.mp3';

function setup() {
  document.addEventListener('keydown', keyPressed);
  blob = new Blob();
  pipes.push(new Pipe());

  draw();
}

setup();

function draw() {
  drawBackground();

  blob.update();
  blob.draw();

  for (var i = pipes.length - 1; i >= 0; i--) {
    if (pipes[i].hits(blob)) {
      context.fillStyle = 'red';
      dead = true;
    } else {
      context.fillStyle = 'white';
    }

    if (pipes[i].x + pipes[i].w < 0) {
      pipes.splice(i, 1);
    }

    if (pipes[i].x === width * 0.6) {
      pipes.push(new Pipe());
    }

    if (!pipes[i].scored && pipes[i].x + pipes[i].w < blob.x - blob.r) {
      scoreAudio.play();
      pipes[i].scored = true;
      score++;
    }

    pipes[i].update();
    pipes[i].draw();
  }

  context.font = 'bold 20px Arial';
  context.fillStyle = 'red';
  context.fillText('Score: ' + score, 20, 25);

  if (dead) {
    showLostInfo();
    lostAudio.play();
    return lostAudio.onended = function() {
      location.reload();
    };
  }

  requestAnimationFrame(draw);
}

function drawBackground() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);
}

function drawCircle(x, y, r) {
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.fill();
}

function keyPressed(event) {
  // UP arrow pressed
  if (event.keyCode === 38) {
    blob.fly();
  }
}

function showLostInfo() {
  var fontSize = 0.1 * height;
  context.font = 'bold ' + fontSize + 'px Arial';
  context.fillStyle = '#ffa500';
  context.textAlign = 'center';
  context.fillText('You are lost', width / 2, height / 2 - fontSize / 2);
  context.fillText('Score is ' + score, width / 2, height / 2 + fontSize / 2);
}

var scl=20;
var b;
var grid;
var counter=0;
var updateSpeed=20;
var score=0;
var cnv;

function setup() {
  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);
  canvas.width=320;
  canvas.height=500;
  var cnv = createCanvas(canvas.width,canvas.height);
  cnv.parent('tetris');

  frameRate(50);

  b = new Brick();
  grid=new Grid();

  grid.createGrid();

  b.reset();
}

function draw() {
  background(51);

  fill(255, 255, 255);
  textSize(20);
  text("Score: " +score, 10, 20);
  text("Next: " , width-150, 20);

  b.update();

  b.show();

  grid.showGrid();
  grid.findFullLines();
  grid.checkTopLine();
  b.setBlocksXSpeed(0);
  counter=(counter+1)%updateSpeed;
}

function keyPressed(){
  if ( keyCode===LEFT_ARROW ){
    b.setBlocksXSpeed(-1);
  }
  else if( keyCode===RIGHT_ARROW ){
    b.setBlocksXSpeed(1);
  }
  else if( keyCode===UP_ARROW ){
    b.rotate();
  }
  else if(keyCode===DOWN_ARROW ){
    updateSpeed=4;
  }

}
function keyReleased(){
  if(keyCode===DOWN_ARROW ){
    updateSpeed=20;
  }
}

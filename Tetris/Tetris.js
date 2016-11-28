var scl=20;
var b;
var grid;
var counter=0;
var updateSpeed=20;
var score=0;
var cnv;

function setup() {
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

  b.update();

  b.show();

  grid.showGrid();
  grid.findFullLines();
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

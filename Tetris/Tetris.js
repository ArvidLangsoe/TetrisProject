var scl=20;
var b;
var grid;
var counter=0;
var score=0;

function setup() {
  canvas.width=320;
  canvas.height=500;
  createCanvas(canvas.width,canvas.height);
  frameRate(10);

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
  b.setBlocksXSpeed(0);
  counter=(counter+1)%4;
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
    
  }

}

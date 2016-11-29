function Block(x_new,y_new,rgb){
  this.x=x_new;
  this.y=y_new;
  this.xspeed=0;
  this.yspeed=1;
  this.color=rgb;



  this.updateY=function(){

    this.y=this.y+this.yspeed;
  }

  this.updateX=function(){
    this.x=this.x+this.xspeed;
  }

  this.show=function(){
    fill(rgb[0],rgb[1],rgb[2]);
    rect(this.x*scl,this.y*scl,20,20)
  }

  this.lockToGrid=function(){
    grid.gridArray[this.y][this.x]=new Block(this.x,this.y,this.color);
  }
  this.setXSpeed=function(direction){
    this.xspeed=direction;
  }

}


function Brick(){
  this.blockArray=new Array(4);
  this.x=0;
  this.y=5;
  this.type=Math.floor(random(0,7));


  this.show=function(){
    for(var i=0;i<4;i++){
      this.blockArray[i].show();
    }
  }


  this.update=function(){
    for(var i=0;i<4;i++){
      this.blockArray[i].updateX();
    }
    if(counter==0){
      for(var i=0;i<4;i++){

        if(this.blockArray[i].y==(height/scl)-1){
          this.lockAndReset();
          return;
        }
        else if(grid.gridArray[this.blockArray[i].y+1][this.blockArray[i].x]!=false){
          this.lockAndReset();
          return;
        }

      }
      for(var i=0;i<4;i++){
        this.blockArray[i].updateY();
      }
    }
  }


  this.lockAndReset=function(){
    this.lockBlocks()
    this.reset();
    nextb.type=this.type;
    nextb.reset();
    for(var i= 0; i<nextb.blockArray.length;i++){
      nextb.blockArray[i].x+=3;
      nextb.blockArray[i].y-=4;
    }

  }

  this.lockBlocks=function(){
    for(var j=0;j<4;j++){
      this.blockArray[j].lockToGrid();
    }

  }


  this.setBlocksXSpeed=function(direction){
    for(var i=0;i<4;i++){
      if(this.blockArray[i].x+direction<0||this.blockArray[i].x+direction>(width/scl)-1){
        return;
      }
      if(grid.gridArray[this.blockArray[i].y][this.blockArray[i].x+direction]){
        return;
      }
    }
    for(var i=0;i<4;i++){
      this.blockArray[i].setXSpeed(direction);
    }
  }


  this.rotate=function(){
    var overlapflag=false;

    var copyx=[];
    var copyy=[];
    for(var i = 0;i<4;i++){
      copyx.push(this.blockArray[i].x);
      copyy.push(this.blockArray[i].y);
    }

    //Find a better way to get the center.###############################################
    var xcenter=0,ycenter=0;

    for(var i=0;i<4;i++){
      xcenter+=this.blockArray[i].x;
      ycenter+=this.blockArray[i].y;

    }
    xcenter=floor(xcenter/4);
    ycenter=floor(ycenter/4);
    var border =this.bordervalues();
    var  angle;
    for(var i=0;i<4;i++){
      var diffx=this.blockArray[i].x-xcenter;
      var diffy=(this.blockArray[i].y-ycenter);
      this.blockArray[i].x=diffy*-1+xcenter;
      this.blockArray[i].y=diffx+ycenter;
    }
    var newBorder=this.bordervalues();

    for(var i=0;i<4;i++){
      this.blockArray[i].x+=border[0]-newBorder[0];
      this.blockArray[i].y+=border[3]-newBorder[3];
    }

    if(this.checkPosition()){
      for(var i=0;i<4;i++){
        this.blockArray[i].x+=1;
      }
    }

    if(this.checkPosition()){
      for(var i=0;i<4;i++){
        this.blockArray[i].x-=2;
      }
    }
    if(this.checkPosition()){
      for(var i=0;i<4;i++){
        this.blockArray[i].x+=1;
        this.blockArray[i].y-=1;
      }
    }
    if(this.checkPosition()){
      for(var i=0;i<4;i++){
        this.blockArray[i].x=copyx[i];
        this.blockArray[i].y=copyy[i];
      }
    }
  }

  this.checkPosition=function(){
    for(var i=0;i<4;i++){
      if(grid.gridArray[this.blockArray[i].y][this.blockArray[i].x]!=false){
        return true;
      }
    }
    return false;

  }

  this.bordervalues=function(){
    var xmin=width,ymin=height;
    var xmax=0,ymax=0;
    for(var i=0;i<4;i++){
      xmin=Math.min(xmin,this.blockArray[i].x);
      xmax=Math.max(xmax,this.blockArray[i].x);

      ymin=Math.min(ymin,this.blockArray[i].y);
      ymax=Math.max(ymax,this.blockArray[i].y);
    }
    return [xmin,xmax,ymin,ymax];
  }

  this.reset=function(){

    this.x=floor((width/scl)/2);
    switch(this.type){
      case 0:
      var rgb=[0,255,255];
      this.blockArray[0]=new Block(this.x,this.y,rgb);
      this.blockArray[1]=new Block(this.x+1,this.y,rgb);
      this.blockArray[2]=new Block(this.x+2,this.y,rgb);
      this.blockArray[3]=new Block(this.x+3,this.y,rgb);
      break;
      case 1:
      var rgb=[0,0,255];
      this.blockArray[0]=new Block(this.x,this.y,rgb);
      this.blockArray[1]=new Block(this.x+1,this.y,rgb);
      this.blockArray[2]=new Block(this.x+2,this.y,rgb);
      this.blockArray[3]=new Block(this.x,this.y-1,rgb);
      break;
      case 2:
      var rgb=[255,165,0];
      this.blockArray[0]=new Block(this.x,this.y,rgb);
      this.blockArray[1]=new Block(this.x+1,this.y,rgb);
      this.blockArray[2]=new Block(this.x+2,this.y,rgb);
      this.blockArray[3]=new Block(this.x+2,this.y-1,rgb);
      break;
      case 3:
      var rgb=[255,255,0];
      this.blockArray[0]=new Block(this.x,this.y,rgb);
      this.blockArray[1]=new Block(this.x+1,this.y,rgb);
      this.blockArray[2]=new Block(this.x,this.y-1,rgb);
      this.blockArray[3]=new Block(this.x+1,this.y-1,rgb);
      break;
      case 4:
      var rgb=[0,255,0];
      this.blockArray[0]=new Block(this.x,this.y,rgb);
      this.blockArray[1]=new Block(this.x+1,this.y,rgb);
      this.blockArray[2]=new Block(this.x+1,this.y-1,rgb);
      this.blockArray[3]=new Block(this.x+2,this.y-1,rgb);
      break;
      case 5:
      var rgb=[128,0,128];
      this.blockArray[0]=new Block(this.x,this.y,rgb);
      this.blockArray[1]=new Block(this.x+1,this.y,rgb);
      this.blockArray[2]=new Block(this.x+2,this.y,rgb);
      this.blockArray[3]=new Block(this.x+1,this.y-1,rgb);
      break;
      case 6:
      var rgb=[255,0,0];
      this.blockArray[0]=new Block(this.x,this.y-1,rgb);
      this.blockArray[1]=new Block(this.x+1,this.y-1,rgb);
      this.blockArray[2]=new Block(this.x+1,this.y,rgb);
      this.blockArray[3]=new Block(this.x+2,this.y,rgb);
      break;

    }
    this.type=Math.floor(random(0,7));
  }


}

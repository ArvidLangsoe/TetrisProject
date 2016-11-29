function Grid(){
  this.gridArray;

  this.createGrid=function(){
    this.gridArray=new Array((height/scl));
    for(var i=0;i<this.gridArray.length;i++){
      this.gridArray[i]=new Array((width/scl));
    }

    for(var i=0;i<this.gridArray.length;i++){
      for(var j=0;j<this.gridArray[0].length;j++){
        this.gridArray[i][j]=false;
      }
    }
  }



  this.deleteGrid=function(){
    for(var i=0;i<this.gridArray.length;i++){
      for(var j=0;j<this.gridArray[0].length;j++){
        this.gridArray[i][j]=false;
      }
    }
    score=0;
  }




  this.removeLineAndMove=function(row){
    for(var i=row;i>0;i--){
      for(var j=0;j<this.gridArray[0].length;j++){
        copyblock=this.gridArray[i-1][j];
        if(copyblock==false){
          this.gridArray[i][j]=false;
        }
        else{
          this.gridArray[i][j]= new Block(copyblock.x,copyblock.y+1,copyblock.color);
        }
      }

    }
  }


  this.checkTopLine=function(){
    for(var j=0;j<this.gridArray[0].length;j++){
      if(this.gridArray[5][j]!=false){
          this.deleteGrid();
          break;
      }
    }
  }
  this.findFullLines=function(){
    var breakFlag;

    for(var i=0;i<this.gridArray.length;i++){
      breakFlag=false;

      for(var j=0;j<this.gridArray[0].length;j++){
        if(this.gridArray[i][j]==false){
          breakFlag=true;
          break;
        }
      }
      if(breakFlag){
        continue;
      }
      score++;
      this.removeLineAndMove(i);

    }

  }

  this.showGrid=function(){

    for(var i=0;i<this.gridArray.length;i++){
      for(var j=0;j<this.gridArray[0].length;j++){
        if(this.gridArray[i][j]!=false){
          this.gridArray[i][j].show();
        }
      }
    }
  }



}

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

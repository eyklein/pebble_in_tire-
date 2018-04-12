var wheel;
var traceGraphic;
var isTranslating=false;
function setup() {
  
  createCanvas(windowWidth,windowHeight);
  wheel=new Wheel(50,250)
  traceGraphic=createGraphics(width,height)
  traceGraphic.pixelDensity(1);
  
}

function draw() {
  background(0);
  traceGraphic.background(0,.6);
  wheel.update();
  wheel.display();
  if(isTranslating){
    fill(100,50)
    noStroke()
    rect(0,250+wheel.diam/2,width,height)
    
    stroke(100,50)
    for(var i=0;i*wheel.diam/2*PI/wheel.spokes<width;i++){
      line(i*wheel.diam/2*PI/wheel.spokes,250+wheel.diam/2+wheel.extentions/2,i*wheel.diam/2*PI/wheel.spokes,250+wheel.diam/2+wheel.extentions)
    }
  }
  
  
  
  image(traceGraphic,0,0)
}
function keyPressed(){
  
  isTranslating=!isTranslating;
  traceGraphic.clear();
  
}
function Wheel(_x,_y){
  this.pPos=createVector(_x,_y);;
  this.pos=createVector(_x,_y);
  this.diam=80;
  this.extentions=1
  this.spokes=5;
  this.rotation=0;
  // this.speed=createVector(1,0);
  this.rotationalSpeed=.01;
  this.pTracerPos=createVector(this.pos.x-this.diam/2,this.pos.y);
  this.tracerPos=createVector(this.pos.x-this.diam/2,this.pos.y);
  this.tracerVel=createVector(0,0);
  this.vel;
  this.update=function(){
    //this.pos.x+=this.speed.x;
    this.spinUpdate();
    this.pPos=createVector(this.pos.x,this.pos.y);
    if(isTranslating){
      this.pos.x+=this.rotationalSpeed*this.diam/2;
    }
    this.vel=createVector(this.pos.x-this.pPos.x,this.pos.y-this.pPos.y)
    
    this.pTracerPos=this.tracerPos
    this.tracerPos=createVector(this.pos.x-cos(this.rotation)*this.diam/2,this.pos.y-sin(this.rotation)*this.diam/2);
    
    this.tracerVel=createVector(this.tracerPos.x-this.pTracerPos.x,this.tracerPos.y-this.pTracerPos.y);
    
    
    if(this.pos.x>width){
      traceGraphic.clear();
      this.pos.x=0;
    }
    //tracerPos=createVector(this.pos.x,this.pos.y);
    //console.log(this.tracerPos.x+ " , "+ this.tracerPos.y)
  }
  this.spinUpdate=function(){
    
    this.rotation+=this.rotationalSpeed;
    //this.rotation+=this.speed.mag()/(this.diam/2)//*(PI*this.diam);
  }
  this.display=function(){
    
    push()
    traceGraphic.push();
    noFill()
    stroke(250)
    translate(this.pos.x,this.pos.y)
    traceGraphic.translate(this.pos.x,this.pos.y)
    rotate(this.rotation)
    traceGraphic.rotate(this.rotation)
    traceGraphic.strokeWeight(3);
    traceGraphic.stroke(255,0,0,50);
    traceGraphic.point(this.diam/(-2),0)
    //traceGraphic.ellipse(this.diam/(-2),0,5,5)
    push()
    
    for(var i=0;i<this.spokes;i++){
      line(this.diam/-2-this.extentions,0,this.diam/2+this.extentions,0)
      rotate(PI/this.spokes)
    }
    pop()
    strokeWeight(3)
    stroke(200,200,250)
    ellipse(0,0,this.diam,this.diam)
    pop()
    //traceGraphic.point(0,0)
    traceGraphic.pop()
    traceGraphic.strokeWeight(2);
    traceGraphic.stroke(0,0,255)
    //traceGraphic.point(this.tracerPos.x,this.tracerPos.y)
    traceGraphic.stroke(0,255,0)
    
    
    strokeWeight(6);
    stroke(100,255,100,80)
    fill(100,255,100,80)
    
    
    
    arrow(this.pos.x,this.pos.y,
    this.pos.x+this.vel.x*100,
    this.pos.y+this.vel.y*100)
    
    noStroke()
    fill(250)
     text(round(this.vel.mag()*10)/10+" m/s",
     this.pos.x+this.vel.x*100,
    this.pos.y+this.vel.y*100)
    // arrow(this.pos.x,this.pos.y,
    // this.pos.x+this.vel.x*100,
    // this.pos.y+this.vel.y*100)
    
    stroke(100,100,255)
    fill(100,100,255)
    
    // line(this.tracerPos.x,this.tracerPos.y,
    // this.tracerPos.x+this.tracerPVel.x*100,
    // this.tracerPos.y+this.tracerPVel.y*100)
    // line(this.tracerPos.x,this.tracerPos.y,
    // this.tracerPos.x+this.tracerPVel.x*100,
    // this.tracerPos.y)
    
    
    arrow(this.tracerPos.x,this.tracerPos.y,
    this.tracerPos.x+this.tracerVel.x*100,
    this.tracerPos.y+this.tracerVel.y*100)
    noStroke();
    fill(250)
    text(round(this.tracerVel.mag()*10)/10+" m/s",this.tracerPos.x+this.tracerVel.x*100,
    this.tracerPos.y+this.tracerVel.y*100)
    
    strokeWeight(2)
    stroke(255,150,150,80)
    fill(255,150,150,80)
    arrow(this.tracerPos.x,this.tracerPos.y,
    this.tracerPos.x+this.tracerVel.x*100,
    this.tracerPos.y)
    
    // stroke(0,255,0,50)
    // arrow(this.tracerPos.x,this.tracerPos.y,
    // this.tracerPos.x,
    // this.tracerPos.y+this.tracerPVel.y*100)
    
    stroke(150,255,150,80)
    fill(150,255,150,80)
    arrow(this.tracerPos.x+this.tracerVel.x*100,this.tracerPos.y,
    this.tracerPos.x+this.tracerVel.x*100,
    this.tracerPos.y+this.tracerVel.y*100)
    
    
    
    
  }
}

function arrow(_x,_y,_x2,_y2,_graphics){
  if(_graphics){
    
    
  }else{
    
    line(_x,_y,_x2,_y2);
    var direction=createVector(_x-_x2,_y-_y2);
    direction.normalize();
    //if(dist(_x,_y,_x2,_y2)>5){
      triangle(_x2,_y2,
      _x2+direction.y*5+direction.x*10,_y2+direction.x*-5+direction.y*10,
      _x2+direction.y*-5+direction.x*10,_y2+direction.x*5+direction.y*10)
    //}
    
  }
  

}
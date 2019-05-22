let figure;
let yaw, pitch, roll;
let yawText, pitchText, rollText;
let config = 'yxz';
let container;

var sketch = function( p ){
  p.setup = function(){
    container = document.getElementById('control-buttons');
    /*container.innerHTML = `
      <input type="radio" name="config" value="yxz" onclick="handleClick(this.value)">Yaw->Pitch->Roll<br>
      <input type="radio" name="config" value="xyz" onclick="handleClick(this.value)">Pitch->Yaw->Roll<br>
      <input type="radio" name="config" value="xzy" onclick="handleClick(this.value)">Pitch->Roll->Yaw<br>  
      <p id="yaw">Yaw (Y): <span id="yaw-text"></span></p>
      <input id="yaw-range" type="range" min="-360" max="360" step="15" value = 0 oninput="degreesChange('Y', this.value)">
      <p id="pitch">Pitch (X): <span id="pitch-text"></span></p>
      <input id="pitch-range" type="range" min="-360" max="360" step="15" value = 0 oninput="degreesChange('X', this.value)">
      <p id="roll">Roll (Z): <span id="roll-text"></span></></p>
      <input id="roll-range" type="range" min="-360" max="360" step="15" value = 0 oninput="degreesChange('Z', this.value)">
    `;*/
    figure = p.loadModel('assets/x-wing/xwing.obj');
    image_1 = p.loadImage('assets/x-wing/xwing.jpg');
    yaw = 0;
    yawText = document.getElementById('yaw-text');
    yawRange = document.getElementById('yaw-range');

    pitch = 0;
    pitchText = document.getElementById('pitch-text');
    pitchRange = document.getElementById('pitch-range');

    roll = 0;
    rollText = document.getElementById('roll-text');
    rollRange = document.getElementById('roll-range');

    p.angleMode(p.DEGREES);
    p.createCanvas(600, 600, p.WEBGL);
  }

  p.draw = function() {

    p.background(0);
    p.noStroke();

    p.camera(-200, -200, 600, 0, 0, 0, 0, 1, 0);

    switch(config){
      case 'yxz':
        yxz();
        break;
      case 'zyx':
        zyx();
        break;
      case 'xzy':
        xzy();
        break;
    }
  }

  function drawXWing(){
    p.push();
    p.translate(0, 45, -60);
    p.rotateY(180);
    p.texture(image_1);
    p.model(figure);
    p.pop();
  }

  function drawGimbal(pos, axis){
    p.push();
    switch(axis){
      case 'x':
        p.rotateY(90);
        p.fill(255, 0, 0);
        break;
      case 'y':
        p.rotateX(90);
        p.fill(0, 255, 0);
        break;
      case 'z':
        p.fill(0, 0, 255);
        break;
    }
    switch(pos){
      case 'inner':
        p.torus(220, 5);
        break;
      case 'middle':
        p.torus(230, 5);
        break;
      case 'outer':
        p.torus(240, 5);
        break;
    }
    p.pop();
  }

  function degreesChange(axis, value){
    switch(axis){
      case 'Y':
        yaw = value;
        yawText.innerHTML = value;
        break;
      case 'X':
        pitch = value;
        pitchText.innerHTML = value;
        break;
      case 'Z':
        roll = value;
        rollText.innerHTML = value;
        break;
    }
  }

  function handleClick(value){
    config = value;
  }

  function yxz(){
    p.push();
    // Y - Axis
    p.rotateY(yaw);
    drawGimbal('outer', 'y');
    p.push();
    // X - Axis
    p.rotateX(pitch);
    drawGimbal('middle', 'x');
    p.push();
    // Z - Axis
    p.rotateZ(roll);
    drawGimbal('inner', 'z');
    drawXWing();
    p.pop();
    p.pop();
    p.pop();
  }

  function zyx(){
    p.push();
    // Z - Axis
    p.rotateZ(pitch);
    drawGimbal('outer', 'z');
    p.push();
    // Y - Axis
    p.rotateY(yaw);
    drawGimbal('middle', 'y');
    p.push();
    // X - Axis
    p.rotateX(roll);
    drawGimbal('inner', 'x');
    drawXWing();
    p.pop();
    p.pop();
    p.pop();
  }

  function xzy(){
    p.push();
    // X - Axis
    p.rotateX(pitch);
    drawGimbal('outer', 'x');
    p.push();
    // Z - Axis
    p.rotateZ(roll);
    drawGimbal('middle', 'z');
    p.push();
    // Y - Axis
    p.rotateY(yaw);
    drawGimbal('inner', 'y');
    drawXWing();
    p.pop();
    p.pop();
    p.pop();
  }
}

var p5 = new p5(sketch, 'gimbal_lock_id');
//Author Chrinovic Raya Tshiwaya
//Student ID: 222170972

const canvas = document.getElementById('myCanvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    throw new Error('webgl not supported');
}

const vertexData = [
    0, 0.75, 0,
    -0.75, 0, 0,
    0.75, 0, 0,
];

// Buffer
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

// Vertex shader
const vsSource = `
    precision mediump float;
    attribute vec3 pos;
    uniform float shiftX;
    uniform float shiftY;

    void main(){
        gl_Position = vec4(pos.x*0.2 + shiftX, pos.y*0.2 + shiftY, pos.z, 1.0) + vec4(-0.75, 0, 0, 0);
        gl_PointSize = 50.0;
    }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

// Check for vertex shader compilation errors
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(`Vertex shader compilation error: ${gl.getShaderInfoLog(vertexShader)}`);
}

// Fragment shader
const fsSource = `
precision mediump float;

void main() {
    gl_FragColor = vec4(0.8, 0.6, 0.3, 1.0);
}
`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);

// Check for fragment shader compilation errors
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(`Fragment shader compilation error: ${gl.getShaderInfoLog(fragmentShader)}`);
}

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// Check for linking error
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(`Shader program linking error: ${gl.getProgramInfoLog(program)}`);
}

//get attribute for position
const positionLocation = gl.getAttribLocation(program, 'pos');
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

//get attribute for shift
const uniformLocationX = gl.getUniformLocation(program, 'shiftX');
const uniformLocationY = gl.getUniformLocation(program, 'shiftY');

let myShiftX = 0;
let shiftX = 0.001;// speed
//let start = 1;

let myShiftY = 0;
let shiftY = 0.001;//speed
//let start2 = 1;

gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

/*draw();

/function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (start == 1) {
        myShiftX += shiftX;
    }

    if (start2 == 1) {
        myShiftY += shiftY;
    }

    gl.uniform1f(uniformLocationX, myShiftX);
    gl.uniform1f(uniformLocationY, myShiftY);

    
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

    window.requestAnimationFrame(draw);
}*/

function toggleMovementDown() {
    draw();
    function draw(){
        myShiftY -= shiftY;

        
    gl.uniform1f(uniformLocationX, myShiftX);
    gl.uniform1f(uniformLocationY, myShiftY);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

    window.requestAnimationFrame(draw);
    }
}
    

// MOVE ITEM LEFT
function toggleMovementLeft() {
    draw();
    function draw(){
        myShiftX -= shiftX;

    gl.uniform1f(uniformLocationX, myShiftX);
    gl.uniform1f(uniformLocationY, myShiftY);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

    window.requestAnimationFrame(draw);
    }
}
//MOVE ITEM DOWN
function toggleMovementDown() {
    draw();
    function draw(){
        myShiftY -= shiftY;

        
    gl.uniform1f(uniformLocationX, myShiftX);
    gl.uniform1f(uniformLocationY, myShiftY);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

    window.requestAnimationFrame(draw);
    }
}

//MOVE ITEM UP
function toggleMovementUp() {
    draw();
    function draw(){
        myShiftY += shiftY;

        
    gl.uniform1f(uniformLocationX, myShiftX);
    gl.uniform1f(uniformLocationY, myShiftY);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

    window.requestAnimationFrame(draw);
    }
}

//MOVE ITEM RIGHT
function toggleMovementRight() {
    draw();
    function draw(){
        myShiftX += shiftX;

        
    gl.uniform1f(uniformLocationX, myShiftX);
    gl.uniform1f(uniformLocationY, myShiftY);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

    window.requestAnimationFrame(draw);
    }
}
 //button.addEventListener ("onclick", toggleMovementX);
 //button.addEventListener ("onclick", toggleMovementY);
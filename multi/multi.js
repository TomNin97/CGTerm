// render multiple objects

var xCam = 65;
var yCam = 65;
var zCam = 250;

function main() {
canvas = document.getElementById( "multi-canvas" );

var gl = canvas.getContext("webgl")
|| canvas.getContext("experimental-webgl");
if ( !gl ) { alert( "WebGL isn't available" ); }

cube1BufferInfo = primitives.createCubeWithVertexColorsBufferInfo(gl, 30);
tower1BufferInfo = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 20, 20, 80, 10, 1, true, true);
tower2BufferInfo = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 15, 15, 70, 8, 1, true, true);
cone1BufferInfo = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 25, 0, 20, 10, 1, true, false);
cone2BufferInfo = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 45, 0, 30, 10, 1, true, false);
mountain1BufferInfo = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 200, 50 , 150, 20, 1, true, true);
mountainTopBufferInfo = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 50, 0 , 50, 20, 1, true, false);
doorBufferInfo = primitives.createPlaneWithVertexColorsBufferInfo(gl, 30, 20, 1, 1);
door2BufferInfo = primitives.createPlaneWithVertexColorsBufferInfo(gl, 2, 20, 1, 1);
window1BufferInfo = primitives.createPlaneWithVertexColorsBufferInfo(gl, 20, 20, 1, 1);
windowFrame1BufferInfo = primitives.createPlaneWithVertexColorsBufferInfo(gl, 26, 1, 1, 1);
mountain2BufferInfo = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 140, 30 , 100, 20, 1, true, true);
mountainTop2BufferInfo = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 30, 0 , 30, 20, 1, true, false);
treeBufferInfo = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 2, 2, 20, 10, 1, true, true);
treeTopBufferInfo = primitives.createSphereWithVertexColorsBufferInfo(gl, 10, 5, 5);

// program set up
var programInfo = webglUtils.createProgramInfo(gl, ["vertex-shader", "fragment-shader"]);

// Uniforms for objects
var cube1Uniforms = {
    u_colorMult: [0.5, 0.5, 0.5, 1],
    u_matrix: m4.identity(),
};

var tower1Uniforms = {
    u_colorMult: [0.5, 0.5, 0.5, 1],
    u_matrix: m4.identity(),
};

var cone1Uniforms = {
    u_colorMult: [1, 0.5, 0.5, 1],
    u_matrix: m4.identity(),
};

var mountain1Uniforms = {
    u_colorMult: [0, 1, 0.5, 1],
    u_matrix: m4.identity(),
};

var mountainTopUniforms = {
    u_colorMult: [1, 1, 1, 1],
    u_matrix: m4.identity(),
};

var doorUniforms = {
    u_colorMult: [0.7, 0.4, 0.1, 1],
    u_matrix: m4.identity(),
};

var frameUniforms = {
    u_colorMult: [0, 0, 0, 1],
    u_matrix: m4.identity(),
};

var window1Uniforms = {
    u_colorMult: [0.4, 0.4, 1, 1],
    u_matrix: m4.identity(),
};

var treeUniforms = {
    u_colorMult: [0.7, 0.4, 0.2, 1],
    u_matrix: m4.identity(),
};

var treeTopUniforms = {
    u_colorMult: [0.4, 0.4, 1, 1],
    u_matrix: m4.identity(),
};

var treeTopUniforms = {
    u_colorMult: [0, 1, 0.2, 1],
    u_matrix: m4.identity(),
};


// translation coordinates
// castle base
var cube1Translation = [0, 0, 0];
var cube2Translation = [30, 0, 0];
var cube3Translation = [-30, 0, 0];
var cube4Translation = [0, 25, 0];
var cube5Translation = [30, 25, 0];
var cube6Translation = [-30, 25, 0];
var cube7Translation = [0, 0, 25];
var cube8Translation = [30, 0, 25];
var cube9Translation = [-30, 0, 25];
var cube10Translation = [0, 25, 25];
var cube11Translation = [30, 25, 25];
var cube12Translation = [-30, 25, 25];

// towers
var tower1Translation = [0, 50, 12];
var tower2Translation = [60, 20, 40];
var tower3Translation = [-60, 20, 40];
var tower4Translation = [55, 20, -25];
var tower5Translation = [-55, 20, -25];

// tower caps
var cone1Translation = [60, 65, 40];
var cone2Translation = [-60, 65, 40];
var cone3Translation = [-55, 65, -25];
var cone4Translation = [55, 65, -25];
var cone5Translation = [0, 100, 12];

// background mountains
var mountain1Translation = [70, 65, -500];
var mountainTopTranslation = [70, 165, -500];
var mountain2Translation = [-300, 75, -500];
var mountainTop2Translation = [-300, 140, -500];

// doors and windows
var doorTranslation = [0, -2, 45];
var door2Translation = [0, -2, 46];
var window1Translation = [0, 25, 45]; 
var windowFrame1Translation = [0, 25, 46];

// trees
var tree1Translation = [90, 0, 65];
var treeTop1Translation = [90, 20, 65];
var tree2Translation = [-90, 0, 65];
var treeTop2Translation = [-90, 20, 65];

// rotation matrix
function computeMatrix(viewProjectionMatrix, translation, xRotation, yRotation, zRotation) {
  var matrix = m4.translate(viewProjectionMatrix,
    translation[0],
    translation[1],
    translation[2]);
  matrix = m4.zRotate(matrix, zRotation);
  matrix = m4.xRotate(matrix, xRotation);
  return m4.yRotate(matrix, yRotation);
}

requestAnimationFrame(drawScene);

// Draw scene
function drawScene() {
  
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  // Clear canvas and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // camera projection matrix
  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  var projectionMatrix = m4.perspective(45, aspect, 1, 2000);

  // Camera view coordinates
  var cameraPosition = [xCam, yCam, zCam];
  var target = [0, 0, 0];
  var up = [0, 1, 0];
  var cameraMatrix = m4.lookAt(cameraPosition, target, up);
  var viewMatrix = m4.inverse(cameraMatrix);
  var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

  gl.useProgram(programInfo.program);

  // ----------------------------
  //       Draw castle form
  //-----------------------------

  webglUtils.setBuffersAndAttributes(gl, programInfo, cube1BufferInfo);
  cube1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cube1Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cube1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cube1BufferInfo.numElements);

  
  webglUtils.setBuffersAndAttributes(gl, programInfo, cube1BufferInfo);
  cube1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cube2Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cube1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cube1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, cube1BufferInfo);
  cube1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cube3Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cube1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cube1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, cube1BufferInfo);
  cube1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cube4Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cube1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cube1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, cube1BufferInfo);
  cube1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cube5Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cube1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cube1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, cube1BufferInfo);
  cube1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cube6Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cube1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cube1BufferInfo.numElements);

  
  webglUtils.setBuffersAndAttributes(gl, programInfo, cube1BufferInfo);
  cube1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cube7Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cube1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cube1BufferInfo.numElements);

  
  webglUtils.setBuffersAndAttributes(gl, programInfo, cube1BufferInfo);
  cube1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cube8Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cube1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cube1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, cube1BufferInfo);
  cube1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cube9Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cube1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cube1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, cube1BufferInfo);
  cube1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cube10Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cube1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cube1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, cube1BufferInfo);
  cube1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cube11Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cube1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cube1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, cube1BufferInfo);
  cube1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cube12Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cube1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cube1BufferInfo.numElements);

  // ----------------------------
  //       Draw castle tower
  //-----------------------------

  webglUtils.setBuffersAndAttributes(gl, programInfo, tower1BufferInfo);
  tower1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, tower1Translation,
    0,0.2,0);

  webglUtils.setUniforms(programInfo, tower1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, tower1BufferInfo.numElements);

  // ----------------------------
  //       Draw border towers
  //-----------------------------

  webglUtils.setBuffersAndAttributes(gl, programInfo, tower2BufferInfo);
  tower1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, tower2Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, tower1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, tower2BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, tower2BufferInfo);
  tower1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, tower3Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, tower1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, tower2BufferInfo.numElements);

  
  webglUtils.setBuffersAndAttributes(gl, programInfo, tower2BufferInfo);
  tower1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, tower4Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, tower1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, tower2BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, tower2BufferInfo);
  tower1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, tower5Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, tower1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, tower2BufferInfo.numElements);

  // ----------------------------
  //       Draw tower caps
  //-----------------------------

  webglUtils.setBuffersAndAttributes(gl, programInfo, cone1BufferInfo);
  cone1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cone1Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cone1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cone1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, cone1BufferInfo);
  cone1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cone2Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cone1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cone1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, cone1BufferInfo);
  cone1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cone3Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cone1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cone1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, cone1BufferInfo);
  cone1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cone4Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cone1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cone1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, cone2BufferInfo);
  cone1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, cone5Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, cone1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, cone2BufferInfo.numElements);

  // ----------------------------
  //       Draw mountains
  //-----------------------------

  webglUtils.setBuffersAndAttributes(gl, programInfo, mountain1BufferInfo);
  mountain1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, mountain1Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, mountain1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, mountain1BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, mountainTopBufferInfo);
  mountainTopUniforms.u_matrix = computeMatrix(viewProjectionMatrix, mountainTopTranslation,
    0,0,0);

  webglUtils.setUniforms(programInfo, mountainTopUniforms);
  gl.drawArrays(gl.TRIANGLES, 0, mountainTopBufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, mountain2BufferInfo);
  mountain1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, mountain2Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, mountain1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, mountain2BufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, mountainTop2BufferInfo);
  mountainTopUniforms.u_matrix = computeMatrix(viewProjectionMatrix, mountainTop2Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, mountainTopUniforms);
  gl.drawArrays(gl.TRIANGLES, 0, mountainTop2BufferInfo.numElements);

  // ----------------------------
  //       Door and windows
  //-----------------------------

  webglUtils.setBuffersAndAttributes(gl, programInfo, doorBufferInfo);
  doorUniforms.u_matrix = computeMatrix(viewProjectionMatrix, doorTranslation,
    1.5,0,0);

  webglUtils.setUniforms(programInfo, doorUniforms);
  gl.drawArrays(gl.TRIANGLES, 0, doorBufferInfo.numElements);
  
  webglUtils.setBuffersAndAttributes(gl, programInfo, door2BufferInfo);
  frameUniforms.u_matrix = computeMatrix(viewProjectionMatrix, door2Translation,
    1.5,0,0);

  webglUtils.setUniforms(programInfo, frameUniforms);
  gl.drawArrays(gl.TRIANGLES, 0, door2BufferInfo.numElements);
  
  webglUtils.setBuffersAndAttributes(gl, programInfo, window1BufferInfo);
  window1Uniforms.u_matrix = computeMatrix(viewProjectionMatrix, window1Translation,
    1.5,2.4,0);

  webglUtils.setUniforms(programInfo, window1Uniforms);
  gl.drawArrays(gl.TRIANGLES, 0, window1BufferInfo.numElements);
  
  webglUtils.setBuffersAndAttributes(gl, programInfo, windowFrame1BufferInfo);
  frameUniforms.u_matrix = computeMatrix(viewProjectionMatrix, windowFrame1Translation,
    1.5,0,0);

  webglUtils.setUniforms(programInfo, frameUniforms);
  gl.drawArrays(gl.TRIANGLES, 0, windowFrame1BufferInfo.numElements);
  
  webglUtils.setBuffersAndAttributes(gl, programInfo, windowFrame1BufferInfo);
  frameUniforms.u_matrix = computeMatrix(viewProjectionMatrix, windowFrame1Translation,
    1.5,1.6,0);

  webglUtils.setUniforms(programInfo, frameUniforms);
  gl.drawArrays(gl.TRIANGLES, 0, windowFrame1BufferInfo.numElements);
  
  // ----------------------------
  //       Trees
  //-----------------------------

  webglUtils.setBuffersAndAttributes(gl, programInfo, treeBufferInfo);
  treeUniforms.u_matrix = computeMatrix(viewProjectionMatrix, tree1Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, treeUniforms);
  gl.drawArrays(gl.TRIANGLES, 0, treeBufferInfo.numElements);
  
  webglUtils.setBuffersAndAttributes(gl, programInfo, treeTopBufferInfo);
  treeTopUniforms.u_matrix = computeMatrix(viewProjectionMatrix, treeTop1Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, treeTopUniforms);
  gl.drawArrays(gl.TRIANGLES, 0, treeTopBufferInfo.numElements);

  webglUtils.setBuffersAndAttributes(gl, programInfo, treeBufferInfo);
  treeUniforms.u_matrix = computeMatrix(viewProjectionMatrix, tree2Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, treeUniforms);
  gl.drawArrays(gl.TRIANGLES, 0, treeBufferInfo.numElements);
  
  webglUtils.setBuffersAndAttributes(gl, programInfo, treeTopBufferInfo);
  treeTopUniforms.u_matrix = computeMatrix(viewProjectionMatrix, treeTop2Translation,
    0,0,0);

  webglUtils.setUniforms(programInfo, treeTopUniforms);
  gl.drawArrays(gl.TRIANGLES, 0, treeTopBufferInfo.numElements);

// draw the scene
requestAnimationFrame(drawScene);
  }
}

main();

// camera sliders
document.getElementById("sliderX").onchange = function(event) {
    xCam = event.target.value;
    main();
  };
  document.getElementById("sliderY").onchange = function(event) {
     yCam = event.target.value;
     main();
  };
  document.getElementById("sliderZ").onchange = function(event) {
     zCam =  event.target.value;
     main();
  };
  
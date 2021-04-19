// Render a cone

var xCam = 45;
var yCam = 30;
var zCam = 50;

var tRad = 0;
var topBool = 0;
var bottomBool = 1;
var hRad = 20
function main() {

// declare the canvas, check for webgl  
canvas = document.getElementById( "cone-canvas" );

var gl = canvas.getContext("webgl")
|| canvas.getContext("experimental-webgl");
if ( !gl ) { alert( "WebGL isn't available" ); }

// declare the buffer using the library class function
coneBufferInfo = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 15, tRad, hRad, 25, 15, bottomBool, topBool);

// program set up
var programInfo = webglUtils.createProgramInfo(gl, ["vertex-shader-3d", "fragment-shader-3d"]);

// declare cone colors
var coneUniforms = {
    u_colorMult: [1, 0.5, 1, 1],
    u_matrix: m4.identity(),
  };

// set cone position relative to canvas origin
var coneTranslation  = [0, 0, 0];

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

  // draw the cone
  webglUtils.setBuffersAndAttributes(gl, programInfo, coneBufferInfo);
  coneUniforms.u_matrix = computeMatrix(viewProjectionMatrix, coneTranslation,
  0,0,0);

  webglUtils.setUniforms(programInfo, coneUniforms);
  gl.drawArrays(gl.TRIANGLES, 0, coneBufferInfo.numElements);

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

function changeCone() {
  tRad = document.getElementById("tRad").value;
  hRad = document.getElementById("hRad").value;
  
  var topBoolElements = document.getElementsByName('topRadio');

  // change bool for top 
  if (topBoolElements[0].checked) {
    topBool = true;
  }
  else if (topBoolElements[1].checked) {
    topBool = false;
  }

  // change bool for bottom 
  var bottomBoolElements = document.getElementsByName('bottomRadio');

  if (bottomBoolElements[0].checked) {
    bottomBool = true;
  }
  else if (bottomBoolElements[1].checked) {
    bottomBool = false;
  }
    main();
};

// Render a cone in the page
function main() {
canvas = document.getElementById( "cone-canvas" );

var gl = canvas.getContext("webgl")
|| canvas.getContext("experimental-webgl");
if ( !gl ) { alert( "WebGL isn't available" ); }

const coneBufferInfo = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 15, 0, 20, 25, 15, true, false);

// program set up
var programInfo = webglUtils.createProgramInfo(gl, ["vertex-shader", "fragment-shader"]);

var coneUniforms = {
    u_colorMult: [1, 0.5, 1, 1],
    u_matrix: m4.identity(),
  };

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
  var cameraPosition = [45, 30, 50];
  var target = [0, 0, 0];
  var up = [0, 1, 0];
  var cameraMatrix = m4.lookAt(cameraPosition, target, up);
  var viewMatrix = m4.inverse(cameraMatrix);
  var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

  gl.useProgram(programInfo.program);

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
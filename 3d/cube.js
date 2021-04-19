// Render a Cube
var xCam = 45;
var yCam = 30;
var zCam = 50;
var cubeSize = 30;

function main() {
	// Declare the Canvas and Check for WebGL
	canvas = document.getElementById( "cube-canvas" );
	
	var gl = canvas.getContext("webgl")
	|| canvas.getContext("experimental-webgl");
	if ( !gl ) { alert( "WebGL isn't available" ); }
	
	// Delcare the Buffer from the Library Class Function
	const cubeBufferInfo = primitives.createCubeWithVertexColorsBufferInfo(gl, cubeSize);
	
	// Set the Program Up
	var programInfo = webglUtils.createProgramInfo(gl, ["vertex-shader", "fragment-shader"]);
	
	// Set the Cube Colors
	var cubeUniforms = {
		u_colorMult: [1, 0, 1, 1],
		u_matrix: m4.identity(),
	};
	
	// Set the Cube's Position Relative to the Origin of the Canvas
	var cubeTranslation = [0, 0, 0];
	
	// Set the Rotation Matrix
	function computeMatrix(viewProjectionMatrix, translation, xRotation, yRotation, zRotation) {
		var matrix = m4.translate(viewProjectionMatrix, translation[0],	translation[1], translation[2]);
		matrix = m4.zRotate(matrix, zRotation);
		matrix = m4.xRotate(matrix, xRotation);
		return m4.yRotate(matrix, yRotation);
	}
	
	requestAnimationFrame(drawScene);
	
	// Draw the Scene
	function drawScene() {
	
		webglUtils.resizeCanvasToDisplaySize(gl.canvas);
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.enable(gl.CULL_FACE);
		gl.enable(gl.DEPTH_TEST);
	
		// Clear the Canvas and Depth Buffer
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
		// Camera Projection Matrix
		var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
		var projectionMatrix = m4.perspective(45, aspect, 1, 2000);
	
		// Camera View Coordinates
		var cameraPosition = [xCam, yCam, zCam];
		var target = [0, 0, 0];
		var up = [0, 1, 0];
		var cameraMatrix = m4.lookAt(cameraPosition, target, up);
		var viewMatrix = m4.inverse(cameraMatrix);
		var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

		gl.useProgram(programInfo.program);
		
		// Draw the Cube
		webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBufferInfo);
		cubeUniforms.u_matrix = computeMatrix(viewProjectionMatrix, cubeTranslation, 0, 0, 0);
		
		webglUtils.setUniforms(programInfo, cubeUniforms);
		gl.drawArrays(gl.TRIANGLES, 0, cubeBufferInfo.numElements);
		
		requestAnimationFrame(drawScene);
	}
}

main();

// Camera Sliders
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
	
function changeCube() {
	cubeSize = document.getElementById("cubeSize").value;
	main();
};	
		
		
	
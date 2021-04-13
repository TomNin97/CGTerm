canvas = document.getElementById( "triangle-canvas" );

var gl = canvas.getContext("webgl")
|| canvas.getContext("experimental-webgl");
if ( !gl ) { alert( "WebGL isn't available" ); }

gl.viewport(0, 0,
gl.drawingBufferWidth, gl.drawingBufferHeight);
gl.clearColor(0.0, 0.5, 0.0, 0.25);
gl.clear(gl.COLOR_BUFFER_BIT);
var gl;
var points;

var xPos = 20;
var yPos = 20;

window.onload = function init(){
    var canvas = document.getElementById( "triangle-canvas" );
    gl = canvas.getContext("webgl")
    || canvas.getContext("experimental-webgl");
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var vertices = [
        vec2( -0.5, -0.5 ),
        vec2(  0,  0.5 ),
        vec2(  0.5, -0.5 )    
        ];    

    gl.viewport( 0, 0, canvas.width, canvas.height );

    var program = initShaders( gl, "vertex-shader-tri", "fragment-shader-tri" );
    gl.useProgram( program );

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
}

document.getElementById("sliderX").onchange = function(event) {
    xPos = event.target.value;
    main();
  };
  document.getElementById("sliderY").onchange = function(event) {
     yPos = event.target.value;
     main();
  };

  






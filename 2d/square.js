
//gl.drawingBufferWidth, gl.drawingBufferHeight);
//gl.clearColor(0.0, 0.5, 0.0, 0.25);
//gl.clear(gl.COLOR_BUFFER_BIT);

function main() {
    canvas = document.getElementById( "square-canvas" );

    var gl = canvas.getContext("webgl")
    || canvas.getContext("experimental-webgl");
    if ( !gl ) { alert( "WebGL isn't available" ); }
   
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var v = document.getElementById("vertex-shader-2d").firstChild.nodeValue;
    var f = document.getElementById("fragment-shader-2d").firstChild.nodeValue;

    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, v);
    gl.compileShader(vs);

    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, f);
    gl.compileShader(fs);

    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    var aspect = canvas.width / canvas.height;

    var vertices = new Float32Array([
    -0.5, 0.5*aspect, 0.5, 0.5*aspect, 0.5,-0.5*aspect, // Triangle 1
    -0.5, 0.5*aspect, 0.5,-0.5*aspect, -0.5,-0.5*aspect // Triangle 2
    ]);

    vbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    itemSize = 2;
    numItems = vertices.length / itemSize;

    gl.useProgram(program);

    program.u_color = gl.getUniformLocation(program, "u_color");
    gl.uniform4fv(program.u_color, [0, 0, 1, 0.3]);

    program.a_position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(program.a_position);
    gl.vertexAttribPointer(program.a_position, itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, numItems);

}
main();

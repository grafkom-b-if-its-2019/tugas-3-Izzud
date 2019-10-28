(function (global) {

  glUtils.SL.init({ callback: function() { main(); } });
  let cubeVertices;

  function main() {
    
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    
    console.log("\nVERTEX SOURCE CODE:\n" + glUtils.SL.Shaders.v1.vertex);
    console.log("\nFRAGMENT SOURCE CODE:\n" + glUtils.SL.Shaders.v1.fragment);

    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);

    var vertexShaderCube = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShaderCube = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);

    var cubeProgram = glUtils.createProgram(gl, vertexShaderCube, fragmentShaderCube);

    program = glUtils.createProgram(gl,vertexShader, fragmentShader);

    initGlSize();
    let n1, letterVertices;

    cubeVertices = [
      // x, y       r, g, b
      -0.5, -0.5, 0.5,    1.0, 0.0, 0.0,
      -0.5, 0.5, 0.5,     1.0, 0.0, 0.0,
      -0.5, 0.5, 0.5,     1.0, 0.0, 0.0,
      0.5, 0.5, 0.5,      1.0, 0.0, 0.0,
      0.5, 0.5, 0.5,      1.0, 0.0, 0.0,
      0.5, -0.5, 0.5,     1.0, 0.0, 0.0,
      0.5, -0.5, 0.5,     1.0, 0.0, 0.0,
      -0.5, -0.5, 0.5,    1.0, 0.0, 0.0,

      0.5, 0.5, 0.5,      1.0, 0.0, 1.0,    
      0.5, 0.5, -0.5,     1.0, 0.0, 1.0,    
      0.5, -0.5, 0.5,     1.0, 0.0, 1.0,    
      0.5, -0.5, -0.5,    1.0, 0.0, 1.0,    

      -0.5, -0.5, 0.5,    1.0, 1.0, 0.0,    
      -0.5, -0.5, -0.5,   1.0, 1.0, 0.0,   
      -0.5, 0.5, 0.5,     1.0, 1.0, 0.0,   
      -0.5, 0.5, -0.5,    1.0, 1.0, 0.0,    

      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,   
      -0.5, 0.5, -0.5,    0.0, 1.0, 1.0,

      -0.5, 0.5, -0.5,    0.0, 1.0, 1.0,   
      0.5, 0.5, -0.5,     0.0, 1.0, 1.0,

      0.5, 0.5, -0.5,     0.0, 1.0, 1.0,    
      0.5, -0.5, -0.5,    0.0, 1.0, 1.0,

      0.5, -0.5, -0.5,    0.0, 1.0, 1.0,    
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,    
    ];

    let thetaLoc, transLoc , scaleLoc, theta;

    var scale = 0.32;
    var vec = [0, 0, 0];
    var thetas = [0,0,0];

    var trX = 0.0035;
    var trY = 0.0046;
    var trZ = 0.012;

    function drawCube(){
      gl.useProgram(cubeProgram);

      var cubeVBO = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);
  
      var vPosition = gl.getAttribLocation(cubeProgram, 'vPosition');
      var vColor = gl.getAttribLocation(cubeProgram, 'vColor');
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
        6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
  
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);
  
      var thetaLocCube = gl.getUniformLocation(cubeProgram, 'theta');
      var thetaCube = [30, 60, 0];

      gl.uniform3fv(thetaLocCube, thetaCube);
  
      // // model view & projection
      // var mvmLoc = gl.getUniformLocation(program, "modelview");
      // var pmLoc = gl.getUniformLocation(program, "projection");
      // var modelviewMat = glMatrix.mat4.create();
      // var projectionMat = glMatrix.mat4.create();
  
      // modelviewMat = glMatrix.mat4.lookAt( modelviewMat,
      //     glMatrix.vec3.fromValues(0.0, 0.0, 1.0),            //camera pos
      //     glMatrix.vec3.fromValues(0.0, 0.0, 0.0),            //titik yang dilihat
      //     glMatrix.vec3.fromValues(0.0, 1.0, 0.0)             //arah atas kamera
      // );
      // gl.uniformMatrix4fv(mvmLoc, false, modelviewMat); 
  
      // var fovy = 90.0;
      // var aspect = canvas.width / canvas.height;
      // var near = 0.0;
      // var far = 10.0;
  
      // projectionMat = glMatrix.mat4.perspective(projectionMat, fovy, aspect, near, far);
  
      // gl.uniformMatrix4fv(pmLoc, false, projectionMat);

    }

    function drawLetter() {

      gl.useProgram(program);

      //TRIANGLE
      letterVertices = [
        //I TRIANGLES: 18 vertices
        +0.3666-0.3054, -0.3332,  
        +0.3666-0.3054, 0.3332,  
        +0.2444-0.3054, 0.3332,
        
        +0.2444-0.3054, +0.3332,  
        +0.2444-0.3054, -0.3332,  
        +0.3666-0.3054, -0.3332,
        
        +0.2444-0.3054, +0.3332,  
        +0.2110-0.3054, +0.3332,  
        +0.2444-0.3054, +0.2,
        
        +0.3666-0.3054, +0.3332,  
        +0.40-0.3054, +0.3332,  
        +0.3666-0.3054, +0.2,
        
        +0.2444-0.3054, -0.3332,  
        +0.2110-0.3054, -0.3332,  
        +0.2444-0.3054, -0.2,
        
        +0.3666-0.3054, -0.3332,  
        +0.40-0.3054, -0.3332,  
        +0.3666-0.3054, -0.2
      ];

      var circleW = circle(+0.0, +0.45, 0.05, false);
      n1 = circleW.length/2;
      console.log(n1)
      letterVertices = letterVertices.concat(circleW);

          // //LINE
    // var line_strip = [      
    //   //I LINESTRIP: 9 vertices
    //   -0.1944, -0.2,  
    //   -0.1944, 0.2,
    //   -0.1610, +0.3332,
    //   -0.35, +0.3332,
    //   -0.3166, +0.2,
    //   -0.3166, -0.2,  
    //   -0.35, -0.3332,
    //   -0.1610, -0.3332,
    //   -0.1944, -0.2
    // ];

    // var circleH = circle(-0.2555, +0.45, 0.05, true);
    // var n2 = circleH.length/2;
    // vertices = vertices.concat(line_strip);
    // vertices = vertices.concat(circleH);
      
      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(letterVertices), gl.STATIC_DRAW);
      
      var vPosition = gl.getAttribLocation(program, 'vPosition');
      
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.enableVertexAttribArray(vPosition);


      thetaLoc = gl.getUniformLocation(program, 'theta');
      theta = 0.35;

      scaleLoc = gl.getUniformLocation(program, 'scale');

      transLoc = gl.getUniformLocation(program, 'vec');

      gl.uniform1f(scaleLoc, scale);

      if(vec[0] > 0.5*(1-scale) || vec[0] < -0.5*(1-scale) ){
        trX = trX * -1;
      }
      vec[0] += trX;

      if(vec[1] > 0.5*(1-scale) || vec[1] < -0.5*(1-scale) ){
        trY = trY * -1;
      }
      vec[1] += trY;

      if(vec[2] > 0.5*(1-scale) || vec[2] < -0.5*(1-scale) ){
        trZ = trZ * -1;
      }
      vec[2] += trZ;

      // scale = 0.2 * (1.1 + 0.3 * vec[2])

      gl.uniform3fv(transLoc, vec);

      thetas[1] += 2 * theta;
 
      gl.uniform3fv(thetaLoc, thetas);
    }

    render();
    
    
    function circle(centerX, centerY, radius, hollow){
      var vertices = []
      
      for (var i=0.0; i<=360; i+=1) {
        // degrees to radians
        var j = i * Math.PI / 180;
        
        var vert1 = [
          radius * Math.sin(j) + centerX,
          radius * Math.cos(j) + centerY,
        ];
        
        var vert2 = [
          centerX,  
          centerY,
        ];
        
        vertices = vertices.concat(vert1);
        if (hollow == false)
        vertices = vertices.concat(vert2);
      }
      return vertices;
    }
    
    
    function initGlSize() {
      var width = canvas.getAttribute("width"), height = canvas.getAttribute("height");
      // Fullscreen if not set
      if (width) {
        gl.maxWidth = width;
      }
      if (height) {
        gl.maxHeight = height;
      }
    }

    function render() {
      //angular velocity in radian
      //Note: 1° × π/180 = 0.01745rad
      // theta -= 0.0035;
      // gl.uniform1f(thetaLoc,theta);
      // gl.uniform1f(transALoc, 0.2555);
      // gl.uniform1f(transBLoc, -0.4);
      // gl.uniform1f(scaleLoc, 1.0);
    
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      
      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      
      // gl.drawArrays(gl.LINE_STRIP, 18 + n1, 9);
      // gl.drawArrays(gl.LINE_STRIP, 27 + n1, n2);
    
    
      // if(scale >= 1)
      //   flag = -1.0;
      // else if(scale <= -1)
      //   flag = 1.0;
    
      // scale += flag * 0.0035;
      // gl.uniform1f(thetaLoc, 0.0);
      // gl.uniform1f(transALoc, 0.5);
      // gl.uniform1f(transBLoc, 0.0);
      // gl.uniform1f(scaleLoc, scale);
    
      drawLetter();
      gl.drawArrays(gl.TRIANGLES, 0, 18);
      gl.drawArrays(gl.TRIANGLE_STRIP, 18, n1);

      drawCube();
      gl.drawArrays(gl.LINES, 0, 24);
    
      requestAnimationFrame(render);
    }    

  }
})(window || this);
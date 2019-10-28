precision mediump float;

attribute vec2 vPosition;

uniform vec3 vec;
uniform vec3 theta;
uniform float scale;

void main() {
  //float theta = 0.0 - 2.0 * atan(1.0, 1.0);

  vec3 angle = radians(theta);
  vec3 c = cos(angle);
  vec3 s = sin(angle);
  
  mat4 rotX = mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, c.x, s.x, 0.0,
      0.0, -s.x, c.x, 0.0,
      0.0, 0.0, 0.0, 1.0
  );

    mat4 rotY = mat4(
      c.y, 0.0, -s.y, 0.0,
      0.0, 1.0, 0.0, 0.0,
      s.y, 0.0, c.y, 0.0,
      0.0, 0.0, 0.0, 1.0
  );

  mat4 rotZ = mat4(
      c.z, s.z, 0.0, 0.0,
      -s.z, c.z, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
  );


  mat4 scaling = mat4(
        scale, 0.0, 0.0, 0.0,
        0.0, scale, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
  );

  mat4 transA = mat4(
    1.0, 0.0, 0.0, vec.x,
    0.0, 1.0, 0.0, vec.y,
    0.0, 0.0, 1.0, vec.z,
    0.0, 0.0, 0.0, 1.0
  );

//   mat4 transB = mat4(
//         1.0, 0.0, 0.0, translateB,
//         0.0, 1.0, 0.0, 0.0,
//         0.0, 0.0, 1.0, 0.0,
//         0.0, 0.0, 0.0, 1.0
//   );

  gl_Position = vec4(vPosition, 0.0, 1.0) * rotZ * rotY * rotX * scaling * transA;
}
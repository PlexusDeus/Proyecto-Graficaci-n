class BlinnPhongMaterial extends Material {

  constructor(
    gl,
    ka = [0, 0, 0],
    kd = [0, 0, 0],
    ks = [0, 0, 0],
    alpha = 1,
    color = [1, 1, 1, 1]
  ) {
    let vertexShaderSource = 
    `#version 300 es
    in vec4 a_position;
    in vec3 a_normal;
    uniform mat4 u_VM_matrix;
    uniform mat4 u_PVM_matrix;
    out vec3 v_position;
    out vec3 v_normal;
    void main() {
      v_position = vec3( u_VM_matrix * a_position );
      v_normal = vec3( u_VM_matrix * vec4(a_normal, 0) );
      gl_Position = u_PVM_matrix * a_position;
    }`;

    let fragmentShaderSource = 
    `#version 300 es
    precision mediump float;
    in vec3 v_position;
    in vec3 v_normal;
    // posición de una luz
    uniform vec3 u_light_position;
    // color ambiental de la luz
    uniform vec3 u_La;
    // coeficiente de reflexión ambiental del material
    uniform vec3 u_Ka;
    // color difuso de la luz
    uniform vec3 u_Ld;
    // coeficiente de reflexión difusa del material
    uniform vec3 u_Kd;
    // color especular de la luz
    uniform vec3 u_Ls; 
    // coeficiente de reflexión especular del material
    uniform vec3 u_Ks;
    // intensidad del brillo especular del material
    uniform float u_alpha;
    // color del material
    uniform vec4 u_color;
    // salida
    out vec4 pixelColor;

    // Función que devuelve el componente ambiental
    vec3 ambiental() {
      return u_Ka * u_La;
    }

    // Función que devuelve el componente difuso
    vec3 difuso(vec3 L, vec3 N) {
    // El coseno del ángulo entre la dirección de la luz y la normal del fragmento
    float cos_theta = max(dot(N, L), 0.0);
      return u_Kd * u_Ld * cos_theta;
    }

    // Función que devuelve el componente especular
    vec3 especular(vec3 L, vec3 N) {
    vec3 V = normalize(vec3(0,0,0) - v_position);
    vec3 H = (L + V) / 2.0;
    float cos_phi = max(dot(N, H), 0.0);
    cos_phi = pow(cos_phi, u_alpha);
      return u_Ks * u_Ls * cos_phi;
    }

    void main() {
      // El vector de dirección de la luz hacia el fragmento
      vec3 L = normalize( u_light_position - v_position );
      // La normal del fragmento
      vec3 N = normalize( v_normal );

      vec3 ambient_color = ambiental();
      vec3 diffuse_color = difuso(L, N);
      vec3 specular_color = especular(L, N);

      pixelColor = vec4(ambient_color + vec3(u_color) * diffuse_color + specular_color, u_color.a);
    }`;

    super(gl, color, vertexShaderSource, fragmentShaderSource);
    this.ka = ka;
    this.kd = kd;
    this.ks = ks;
    this.alpha = alpha;
  }
}

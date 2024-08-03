class BlinnPhongTextureMaterial extends Material {
  constructor(gl, ka, kd, ks, alpha, image) {
    let vertexShaderSource = 
    `#version 300 es
    in vec4 a_position;
    in vec3 a_normal;
    in vec2 a_texcoord;

    uniform mat4 u_VM_matrix;
    uniform mat4 u_PVM_matrix;

    out vec2 v_texcoord;
    out vec3 v_position;
    out vec3 v_normal;

    void main() {
      v_texcoord = a_texcoord;
      v_position = vec3( u_VM_matrix * a_position );
      v_normal = vec3( u_VM_matrix * vec4(a_normal, 0) );

      gl_Position = u_PVM_matrix * a_position;
    }`;

    let fragmentShaderSource = 
    `#version 300 es
    precision mediump float;

    in vec3 v_position;
    in vec3 v_normal;
    in vec2 v_texcoord;

    // posición de una luz
    uniform vec3 u_light_position;

    // color ambiental de la luz
    uniform vec3 u_La;
    // color difuso de la luz
    uniform vec3 u_Ld;
    // color especular de la luz
    uniform vec3 u_Ls; 

    // coeficiente de reflexión ambiental del material
    uniform vec3 u_Ka;
    // coeficiente de reflexión difusa del material
    uniform vec3 u_Kd;
    // coeficiente de reflexión especular del material
    uniform vec3 u_Ks;
    // intensidad del brillo especular del material
    uniform float u_alpha;
    // color del material
    uniform vec4 u_color;

    uniform sampler2D u_texture;

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

      vec4 color = texture(u_texture, v_texcoord);
      pixelColor = vec4(ambient_color + vec3(color) * diffuse_color + specular_color, color.a);
    }`;

    super(gl, [1,1,1,1], vertexShaderSource, fragmentShaderSource);

    this.texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this.ka = ka;
    this.kd = kd;
    this.ks = ks;
    this.alpha = alpha;
  }
}
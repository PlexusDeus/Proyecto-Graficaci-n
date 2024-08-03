class Disco extends GenericGeometry {

  /**
   * Disco
   * @param gl referencia al contexto de render de WebGL
   * @param {Number} width el ancho corresponde a la dimensión en el eje X
   * @param {Number} height el alto corgl.getUniformLocation(responde a la dimensión en el eje Y
   * @param {Number} length la profundidad corresponde a la dimensión en el eje Z
   * @param material el material del Disco
   */
  constructor(gl, width = 1, height = 1, length = 1, material, transform, animation = 1) {
    super(gl, material, transform, animation);
    this.w = width;
    this.h = height;
    this.l = length;
    this.vertices = this.getVertices();
    this.faces = this.getFaces();
    this.init(gl);
  }
  
  getVertices() {
    return [
      this.w / 2,  this.h / 2,  this.l / 2, // 0 Frente, Superior Derecha
      this.w / 2, -this.h / 2,  this.l / 2, // 1 Frente, Inferior Derecha
      this.w / 2,  this.h / 2, -this.l / 2, // 2 Detrás, Superior Derecha
      this.w / 2, -this.h / 2, -this.l / 2, // 3 Detrás, Inferior Derecha
     -this.w / 2,  this.h / 2,  this.l / 2, // 4 Frente, Superior Izquierda
     -this.w / 2, -this.h / 2,  this.l / 2, // 5 Frente, Inferior Izquierda
     -this.w / 2,  this.h / 2, -this.l / 2, // 6 Detrás, Superior Izquierda
     -this.w / 2, -this.h / 2, -this.l / 2  // 7 Detrás, Infeiror Izquierda
    ];
  }

  getFaces() {
    return [
      // Lateral Derecho
      2, 1, 3,
      2, 0, 1,
      // Cara Frontal
      1, 4, 5,
      1, 0, 4,
      // Lateral Izquierdo
      5, 6, 7,
      5, 4, 6,
      // Cara Trasera
      6, 3, 7,
      6, 2, 3,
      // Lateral Superior
      4, 2, 6,
      4, 0, 2,
      // Lateral Inferior
      3, 5, 7,
      3, 1, 5
    ];
  }

  /*
  0.476, 0.954,  //0
  0.476, 0.045,  //1
  0.5, 0.954,    //2
  0.5, 0.045,    //3
  0, 0.954,      //4
  0, 0.045,      //5
  0.976, 0.954,  //6
  0.976, 0.045,  //7
  */

  getUVCoordinates(){
    return [
      0.5, 0.954, 0.476, 0.045, 0.5, 0.045,
      0.5, 0.954, 0.476, 0.954, 0.476, 0.045,

      0.476, 0.045, 0, 0.954, 0, 0.045,
      0.476, 0.045, 0.476, 0.954, 0, 0.954,

      1, 0.045, 0.976, 0.954, 0.976, 0.045,
      1, 0.045, 1, 0.954, 0.976, 0.954,

      0.976, 0.954, 0.5, 0.045, 0.976, 0.045,
      0.976, 0.954, 0.5, 0.954, 0.5, 0.045,

      0.976, 1, 0.5, 0.954, 0.976, 0.954,
      0.976, 1, 0.5, 1, 0.5, 0.954,

      0.5, 0.045, 0.976, 0, 0.976, 0.045,
      0.5, 0.045, 0.5, 0, 0.976, 0
    ];
  }
}
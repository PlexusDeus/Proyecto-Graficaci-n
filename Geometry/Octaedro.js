class Octaedro extends GenericGeometry {

  /**
   * Octaedro
   * @param gl referencia al contexto de render de WebGL
   * @param {Number} width el tamaño del octaedro
   * @param material el material del octaedro
   */
  constructor(gl, width = 1,  material, transform, animation = 1) {
    super(gl, material, transform, animation);
    this.w = width;
    this.vertices = this.getVertices();
    this.faces = this.getFaces();
    this.init(gl);
  }

  getVertices() {
    return [
      0, 0, this.w,   // 0
      this.w, 0, 0,   // 1
     -this.w, 0, 0,   // 2
      0,  this.w, 0,  // 3
      0, -this.w, 0,  // 4
      0, 0, -this.w   // 5
    ];
  }

  getFaces() {
    return [
      0, 1, 3, // Superior Frente Derecha
      0, 3, 2, // Superior Frente Izquierda
      0, 4, 1, // Inferior Frente Derecha
      0, 2, 4, // Inferior Frente Izquierda
      5, 3, 1, // Superior Trasera Derecha
      5, 2, 3, // Superior Trasera Izquierda
      5, 1, 4, // Inferior Trasera Derecha
      5, 4, 2  // Inferior Trasera Izquierda
    ]
  }
}
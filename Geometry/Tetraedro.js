class Tetraedro extends GenericGeometry {

  /**
   * Tetraedro
   * @param gl referencia al contexto de render de WebGL
   * @param {Number} width el tamaño del tetraedro
   * @param material el material del tetraedro
   */
  constructor(gl, width = 1, material, transform, animation = 0) {
    super(gl, material, transform, animation);
    this.w = width;
    this.vertices = this.getVertices();
    this.faces = this.getFaces();
    this.init(gl);
  }

  getVertices() {
    let angle = (2 * Math.PI) / 3;
    let x = (this.w * 2 * Math.sqrt(2)) / 3;
    let y = -this.w / 3;
    let z = 0;
    let x0 = x * Math.cos(angle);
    let z0 = -x * Math.sin(angle);

    return [
      0, this.w, 0, // 0
      x0, y,  z0,   // 1
      x0, y, -z0,   // 2
      x, y, z       // 3
    ];
  }

  getFaces() {
    return [
      1, 3, 2, // Base
      0, 1, 2, // Izquierda
      0, 2, 3, // Derecha
      0, 3, 1  // Trasera
    ]
  }
}

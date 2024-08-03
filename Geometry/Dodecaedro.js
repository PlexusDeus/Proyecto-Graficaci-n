class Dodecaedro extends GenericGeometry {

  /**
   * Dodecaedro
   * @param gl referencia al contexto de render de WebGL
   * @param {Number} width el tamaño del dodecaedro
   * @param material el material del dodecaedro
   */
  constructor(gl, width = 1, material, transform, animation = 1) {
    super(gl, material, transform, animation);
    this.w = width;
    this.vertices = this.getVertices();
    this.faces = this.getFaces();
    this.init(gl);
  }

  getVertices() {
    const goldenRatio = 1.6180339887;
    let width_d_goldenRatio = this.w / goldenRatio;
    let width_m_goldenRatio = this.w * goldenRatio;

    return [
      this.w,  this.w,  this.w,
      this.w,  this.w, -this.w,
      this.w, -this.w,  this.w,
      this.w, -this.w, -this.w,
     -this.w,  this.w,  this.w,
     -this.w,  this.w, -this.w,
     -this.w, -this.w,  this.w,
     -this.w, -this.w, -this.w,
      0,  width_d_goldenRatio,  width_m_goldenRatio,
      0,  width_d_goldenRatio, -width_m_goldenRatio,
      0, -width_d_goldenRatio,  width_m_goldenRatio,
      0, -width_d_goldenRatio, -width_m_goldenRatio,
      width_d_goldenRatio,  width_m_goldenRatio, 0,
      width_d_goldenRatio, -width_m_goldenRatio, 0,
     -width_d_goldenRatio,  width_m_goldenRatio, 0,
     -width_d_goldenRatio, -width_m_goldenRatio, 0,
      width_m_goldenRatio, 0,  width_d_goldenRatio,
      width_m_goldenRatio, 0, -width_d_goldenRatio,
     -width_m_goldenRatio, 0,  width_d_goldenRatio,
     -width_m_goldenRatio, 0, -width_d_goldenRatio
    ];
  }

  getFaces() {
    return [
      17, 1, 12,
      17, 12, 0,
      17, 0, 16,
      17, 16, 2,
      17, 2, 13,
      17, 13, 3,
      14, 4, 8,
      14, 8, 0,
      14, 0, 12,
      14, 12, 1,
      14, 1, 9,
      14, 9, 5,
      4, 14, 5,
      4, 5, 19,
      4, 19, 18,
      4, 18, 6,
      4, 6, 10,
      4, 10, 8,
      11, 3, 13,
      11, 13, 15,
      11, 15, 7,
      7, 15, 6,
      7, 6, 18,
      7, 18, 19,
      6, 15, 13,
      6, 13, 2,
      6, 2, 10,
      5, 9, 11,
      5, 11, 7,
      5, 7, 19,
      2, 16, 0,
      2, 0, 8,
      2, 8, 10,
      1, 17, 3,
      1, 3, 11,
      1, 11, 9      
    ];
  }
}

class Toroide extends GenericGeometry {

  /**
   * Toroide
   * @param gl referencia al contexto de render de WebGL
   * @param {Number} major_radius el radio mayor del toroide
   * @param {Number} major_radius el radio menor del toroide
   * @param {Number} Nu número de particiones en paralelos
   * @param {Number} Nv número de particiones en meridianos
   * @param material el material del toroide
   */
  constructor(gl, major_radius = 1, minor_radius = 1, Nu = 1, Nv = 3, material, transform, animation) {
    super(gl, material, transform, animation);
    this.R = major_radius;
    this.r = minor_radius;
    this.Nu = Nu;
    this.Nv = Nv;
    this.vertices = this.getVertices();
    this.faces = this.getFaces();
    this.init(gl);
  }

  getVertices() {
    let vertices = [];

    for (let i = 0; i < this.Nv + 1; i++) {
      for (let j = 0; j < this.Nu; j++) {
        vertices.push(
          -(this.R + this.r * Math.sin((2 * Math.PI * j) / this.Nu)) * Math.sin((2 * Math.PI * i) / this.Nv),
          this.r * Math.cos((2 * Math.PI * j) / this.Nu),
          (this.R + this.r * Math.sin((2 * Math.PI * j) / this.Nu)) * Math.cos((2 * Math.PI * i) / this.Nv)
        );
      }
    }

    return vertices;
  }

  getFaces() {
    let faces = [];

    for (let i = 0; i < this.Nv; i++) {
      for (let j = 0; j < this.Nu; j++) {
        faces.push(
          j + i * this.Nu, // 1
          j + (i + 1) * this.Nu, // 2
          ((j + 1) % this.Nu) + (i + 1) * this.Nu, // 3

          ((j + 1) % this.Nu) + (i + 1) * this.Nu, // 3
          ((j + 1) % this.Nu) + i * this.Nu, // 4
          j + i * this.Nu // 1
        );
      }
    }
  
    return faces;
  }
}
class Cilindro extends GenericGeometry {

  /**
   * Cilindro
   * @param gl referencia al contexto de render de WebGL
   * @param {Number} radius el tamaño del cilindro
   * @param {Number} Nu número de particiones en paralelos
   * @param {Number} Nv número de particiones en meridianos
   * @param material el material del cilindro
   */
  constructor(gl, radius = 1, height = 1, Nu = 1, Nv = 3, material, transform, animation = 1) {
    super(gl, material, transform, animation);
    this.r = radius;
    this.h = height;
    this.Nu = Nu;
    this.Nv = Nv;
    this.vertices = this.getVertices();
    this.faces = this.getFaces();
    this.init(gl);
  }

  getVertices() {
    let vertices = [];
    let phi;
    let theta;

    for (let i = 0; i < this.Nu + 2; i++) {
      phi = i * (this.h / (this.Nu + 1));
      for (let j = 0; j < this.Nv; j++) {
        theta = j * ((2 * Math.PI) / this.Nv);
        vertices.push(
          this.r * Math.cos(theta),
          this.h / 2 - phi,
          this.r * Math.sin(theta)
        );
      }
    }

    return vertices;
  }

  getFaces() {
    let faces = [];

    for (let i = 0; i < this.Nu + 1; i++) {
      for (let j = 0; j < this.Nv; j++) {
        faces.push(
          j + i * this.Nv, // 1
          ((j + 1) % this.Nv) + i * this.Nv, // 2
          ((j + 1) % this.Nv) + (i + 1) * this.Nv, // 3

          ((j + 1) % this.Nv) + (i + 1) * this.Nv, // 3
          j + (i + 1) * this.Nv, // 4
          j + i * this.Nv // 1
        );
      }
    }
    
    return faces;
  }

}
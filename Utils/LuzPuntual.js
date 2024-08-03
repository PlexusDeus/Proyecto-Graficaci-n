class LuzPuntual {
  constructor(pos, ambient, diffuse, specular) {
    this.position = pos;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.position_transform = new Vector3(0,0,0);
  }

  update(viewMatrix) {
    this.position_transform = viewMatrix.multiplyVector(this.position);
  }

  getPosition() {
    return [this.position_transform.x, this.position_transform.y, this.position_transform.z];
  }
}

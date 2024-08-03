class GenericGeometry {
  
  constructor(gl, material, transform, animation) {
    this.material = material;
    this.transform = transform;
    this.initialtransform = transform;
    this.animation = animation;
    this.theta = 0;
  }

  // Inicializador de Figura
  init(gl) {
    this.vertices = this.getVertices();

    if (this.getFaces) {
      this.faces = this.getFaces();
      this.createSmoothVAO(gl);
    }
    this.createFlatFacesVAO(gl);
  }

  // Animaciones
  update(elapsed, play) {
    if (play == false || this.animation == 0) {
      // Pausa 
    } else if(this.animation == 1) {
      // Rotación negativa sobre el eje Y
      this.transform = Matrix4.multiply(Matrix4.rotateY(this.theta -= elapsed), this.initialtransform);
    } else if(this.animation == 2) {
      // Rotación positiva sobre el eje Y
      this.transform = Matrix4.multiply(Matrix4.rotateY(this.theta += elapsed), this.initialtransform);
    } else if(this.animation == 3) {
      // Rotación negativa sobre el eje X
      this.transform = Matrix4.multiply(Matrix4.rotateX(this.theta -= elapsed), this.initialtransform);
    } else if(this.animation == 4) {
      // Rotación positiva sobre el eje X
      this.transform = Matrix4.multiply(Matrix4.rotateX(this.theta += elapsed), this.initialtransform);
    } else if(this.animation == 5){
      // Rotación negativa sobre el eje Z
      this.transform = Matrix4.multiply(Matrix4.rotateZ(this.theta -= elapsed), this.initialtransform);
    } else if(this.animation == 6) {
      // Rotación positiva sobre el eje Z
      this.transform = Matrix4.multiply(Matrix4.rotateZ(this.theta += elapsed), this.initialtransform);
    } else if(this.animation == 7){
      // Desplazamiento negativo sobre el eje Z
      this.transform = Matrix4.multiply(Matrix4.translate(new Vector3(0,0,this.theta -= elapsed * 5)), this.initialtransform);
    } else if(this.animation == 8){
      // Desplazamiento positivo sobre el eje Z
      this.transform = Matrix4.multiply(Matrix4.translate(new Vector3(0,0,this.theta += elapsed * 5)), this.initialtransform);
    } else if(this.animation == 9){
      // Desplazamiento negativo sobre el eje X
      this.transform = Matrix4.multiply(Matrix4.translate(new Vector3(this.theta -= elapsed * 5,0,0)), this.initialtransform);
    }  else if(this.animation == 10){
      // Desplazamiento positivo sobre el eje X
      this.transform = Matrix4.multiply(Matrix4.translate(new Vector3(this.theta += elapsed * 5,0,0)), this.initialtransform);
    } else if(this.animation == 12) {
      // Rotación de 90 grados en Y y Desplazamiento positivo sobre el eje Y
      this.transform = Matrix4.multiply(Matrix4.multiply(Matrix4.translate(new Vector3(0,0,this.theta += elapsed * 5)), this.initialtransform), Matrix4.rotateX(Math.PI/2));
    } else if(this.animation == 13) {
      // Rotación Progresiva
      this.transform = Matrix4.multiply(Matrix4.rotateY(this.theta -= elapsed), Matrix4.translate(new Vector3(0,0,this.theta -= elapsed * 5)));
    } else if(this.animation == 14) {
      // Rotación Rotativa
      this.transform = Matrix4.multiply(Matrix4.multiply(Matrix4.rotateY(this.theta -= elapsed), this.initialtransform), Matrix4.rotateY(this.theta -= elapsed));
    } else if(this.animation == 15) {
      // Rotación Negativa sobre el mismo punto
      this.transform = Matrix4.multiply(this.initialtransform, Matrix4.rotateY(this.theta -= elapsed));
    } else if(this.animation == 16) {
      // Rotación Postiva sobre el mismo punto
      this.transform = Matrix4.multiply(this.initialtransform, Matrix4.rotateY(this.theta += elapsed));
    } else if(this.animation == 17) {
      // Rotación Negativa sobre el mismo punto (Planeta)
      this.transform = Matrix4.multiply(this.initialtransform, Matrix4.rotateY(this.theta -= elapsed/5));
    } else if(this.animation == 18) {
      //
    }
  }

  // Vertex Array Objects
  createSmoothVAO(gl) {
    this.smoothVAO = gl.createVertexArray();
    gl.bindVertexArray(this.smoothVAO);

    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(this.material.getAttribute("a_position"));
    gl.vertexAttribPointer(this.material.getAttribute("a_position"), 3, gl.FLOAT, false, 0, 0);

    if (this.material.getAttribute("a_normal") != undefined) {
      let normals = this.getSmoothNormals(this.vertices, this.faces);
      let normalBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(this.material.getAttribute("a_normal"));
      gl.vertexAttribPointer(this.material.getAttribute("a_normal"), 3, gl.FLOAT, false, 0, 0);
    }

    if ((this.getUVCoordinates) && (this.material.getAttribute("a_texcoord") != undefined)) {
      let uv = this.getUVCoordinates(this.vertices);
      let uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(this.material.getAttribute("a_texcoord"));
      gl.vertexAttribPointer(this.material.getAttribute("a_texcoord"), 2, gl.FLOAT, false, 0, 0);
    }

    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.faces), gl.STATIC_DRAW);

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    this.num_smooth_elements = this.faces.length;
  }

  createFlatFacesVAO(gl) {
    let vertices = (this.faces) ? this.getFlatVertices(this.vertices, this.faces) : this.vertices;
  
    this.flatVAO = gl.createVertexArray();
    gl.bindVertexArray(this.flatVAO);

    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(this.material.getAttribute("a_position"));
    gl.vertexAttribPointer(this.material.getAttribute("a_position"), 3, gl.FLOAT, false, 0, 0);

    if (this.material.getAttribute("a_normal") != undefined) {
      let normals = this.getFlatNormals(vertices);
      let normalBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(this.material.getAttribute("a_normal"));
      gl.vertexAttribPointer(this.material.getAttribute("a_normal"), 3, gl.FLOAT, false, 0, 0);
    }

    if ((this.getUVCoordinates) && (this.material.getAttribute("a_texcoord") != undefined)) {
      let uv = this.getUVCoordinates(vertices, true);
      let uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(this.material.getAttribute("a_texcoord"));
      gl.vertexAttribPointer(this.material.getAttribute("a_texcoord"), 2, gl.FLOAT, false, 0, 0);
    }

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.num_flat_elements = vertices.length / 3;
  }

  draw(gl, projectionMatrix, viewMatrix, light) {
    let viewModelMatrix = Matrix4.multiply(viewMatrix, this.transform);
    let projectionViewModelMatrix = Matrix4.multiply(projectionMatrix, viewModelMatrix);
    gl.useProgram(this.material.program);

    // ViewModel
    // u_VM_matrix
    if (this.material.getUniform("u_VM_matrix") != undefined) {
      gl.uniformMatrix4fv(this.material.getUniform("u_VM_matrix"), true, viewModelMatrix.toArray());
    }

    // ProjectionMatrix
    // u_PVM_matrix
    if (this.material.getUniform("u_PVM_matrix") != undefined) {
      gl.uniformMatrix4fv(this.material.getUniform("u_PVM_matrix"), true, projectionViewModelMatrix.toArray());
    }

    // Componentes Ambientales
    // u_Ka
    if (this.material.getUniform("u_Ka") != undefined) {
      gl.uniform3fv(this.material.getUniform("u_Ka"), this.material.ka);
    }
    // u_La
    if (this.material.getUniform("u_La") != undefined) {
      gl.uniform3fv(this.material.getUniform("u_La"), light.ambient);
    }

    // Componentes difusos
    // u_Kd
    if (this.material.getUniform("u_Kd") != undefined) {
      gl.uniform3fv(this.material.getUniform("u_Kd"), this.material.kd);
    }
    // u_Ld
    if (this.material.getUniform("u_Ld") != undefined) {
      gl.uniform3fv(this.material.getUniform("u_Ld"), light.diffuse);
    }

    // Componentes especulares
    // u_alpha
    if (this.material.getUniform("u_alpha") != undefined) {
      gl.uniform1f(this.material.getUniform("u_alpha"), this.material.alpha);
    }
    // u_Ks
    if (this.material.getUniform("u_Ks") != undefined) {
      gl.uniform3fv(this.material.getUniform("u_Ks"), this.material.ks);
    }
    // u_Ls
    if (this.material.getUniform("u_Ls") != undefined) {
      gl.uniform3fv(this.material.getUniform("u_Ls"), light.specular);
    }

    // u_color
    if (this.material.getUniform("u_color") != undefined) {
      gl.uniform4fv(this.material.getUniform("u_color"), this.material.color);
    }

    // u_light_position
    if (this.material.getUniform("u_light_position") != undefined) {
      gl.uniform3fv(this.material.getUniform("u_light_position"), light.getPosition());
    }

    // u_texture
    if (this.material.getUniform("u_texture") != undefined) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.material.texture);
      gl.uniform1i(this.material.getUniform("u_texture"), 0);
    }

    // Smooth shading
    if (this.isSmooth && this.getFaces) {
      gl.bindVertexArray(this.smoothVAO);
      gl.drawElements(gl.TRIANGLES, this.num_smooth_elements, gl.UNSIGNED_SHORT, 0);
    }
    // Flat shading
    else {
      gl.bindVertexArray(this.flatVAO);
      gl.drawArrays(gl.TRIANGLES, 0, this.num_flat_elements);
    }
    gl.bindVertexArray(null);
  }

  // Vetices
  getFlatVertices(vertices, faces) {
    let flat_vertices = [];

    for (let i = 0, l = faces.length; i < l; i++) {
      flat_vertices.push(
        vertices[faces[i] * 3],
        vertices[faces[i] * 3 + 1],
        vertices[faces[i] * 3 + 2]
      );
    }

    return flat_vertices;
  }
  
  // Normales
  getSmoothNormals(vertices, faces) {
    let normals = new Array(vertices.length);
    normals.fill(0);

    let v1, v2, v3;
    let i1, i2, i3;
    let tmp;
    let n;

    for (let i=0; i<faces.length; i+=3) {
      i1 = faces[i  ]*3;
      i2 = faces[i+1]*3;
      i3 = faces[i+2]*3;

      v1 = new Vector3(vertices[i1], vertices[i1 + 1], vertices[i1 + 2]);
      v2 = new Vector3(vertices[i2], vertices[i2 + 1], vertices[i2 + 2]); 
      v3 = new Vector3(vertices[i3], vertices[i3 + 1], vertices[i3 + 2]);

      n = Vector3.cross(Vector3.subtract(v1, v2), Vector3.subtract(v2, v3)).normalize();

      tmp = new Vector3(normals[i1], normals[i1+1], normals[i1+2]);
      tmp = Vector3.add(tmp, n);
      normals[i1  ] = tmp.x;
      normals[i1+1] = tmp.y;
      normals[i1+2] = tmp.z;


      tmp = new Vector3(normals[i2], normals[i2+1], normals[i2+2]);
      tmp = Vector3.add(tmp, n);
      normals[i2  ] = tmp.x;
      normals[i2+1] = tmp.y;
      normals[i2+2] = tmp.z;


      tmp = new Vector3(normals[i3], normals[i3+1], normals[i3+2]);
      tmp = Vector3.add(tmp, n);
      normals[i3  ] = tmp.x;
      normals[i3+1] = tmp.y;
      normals[i3+2] = tmp.z;
    }

    for (let i=0; i<normals.length; i+=3) {
      tmp = new Vector3(normals[i], normals[i+1], normals[i+2]).normalize();
      normals[i  ] = tmp.x;
      normals[i+1] = tmp.y;
      normals[i+2] = tmp.z;
    }

    return normals;
  }

  getFlatNormals(vertices) {
    let normals = [];
    let v1, v2, v3;
    let n;

    for (let i = 0; i < vertices.length; i += 9) {
      v1 = new Vector3(vertices[i], vertices[i + 1],vertices[i + 2]);
      v2 = new Vector3(vertices[i + 3], vertices[i + 4], vertices[i + 5]);
      v3 = new Vector3(vertices[i + 6], vertices[i + 7], vertices[i + 8]);

      n = Vector3.cross(Vector3.subtract(v1, v2), Vector3.subtract(v2, v3)).normalize();
      normals.push(n.x, n.y, n.z, n.x, n.y, n.z, n.x, n.y, n.z);
    }
    
    return normals;
  }
}

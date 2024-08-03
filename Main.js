window.addEventListener("load", async function (evt) {

  let canvas = document.getElementById("glcanvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  const gl = canvas.getContext("webgl2");
  if (!gl) throw "WebGL no soportado";

  const audio = document.querySelector("audio");
  const play = document.getElementById("play");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  // Texturas
  let estrellas = await loadImage("Textures/Estrellas.jpg");
  let pink = await loadImage("Textures/TheDarkSideOfTheMoon.jpg");
  let luna = await loadImage("Textures/Luna.jpg");
  let bocanada = await loadImage("Textures/Bocanada.jpg");
  let bajofondo = await loadImage("Textures/Bajofondo.jpg");
  let mediofondo = await loadImage("Textures/Mediofondo.jpg");
  let alma = await loadImage("Textures/Alma.jpg");
  let karma = await loadImage("Textures/OkComputer.jpg");
  let kida = await loadImage("Textures/KidA.jpg");
  let cowboy = await loadImage("Textures/Cowboy.jpg");
  let noche = await loadImage("Textures/Noche.jpg");
  let debut = await loadImage("Textures/Debut.jpg");
  let love = await loadImage("Textures/LoveDeluxe.jpg");
  let beach = await loadImage("Textures/PlasticBeach.jpg");
  let currents = await loadImage("Textures/Currents.jpg");
  let mars = await loadImage("Textures/Mars.jpg");
  let venus = await loadImage("Textures/Venus.jpg");
  let jupiter = await loadImage("Textures/Jupiter.jpg");
  let haumea = await loadImage("Textures/Haumea.jpg");
 
  // Materiales 
  let DA = [
    // Cyan
    new DiffuseAmbientMaterial(gl, [0.1, 0.1, 0.1], [1, 1, 1], [0, 1, 1, 1]),
  ];
  
  let BP = [
    // 0 Obsidiana
    new BlinnPhongMaterial(gl, [0.05375, 0.05, 0.06625], [0.18275, 0.17, 0.22525], [0.332741, 0.328634, 0.346435], 100, [1,1,1,1]),
    // 1 Ruby
    new BlinnPhongMaterial(gl, [0.1745, 0.01175, 0.01175], [0.61424, 0.04136, 0.04136], [0.727811, 0.626959, 0.626959], 10, [1,1,1,1]),
    // 2 Oro
    new BlinnPhongMaterial(gl, [0.24725, 0.1995, 0.0745], [0.75164, 0.60648, 0.22648], [0.628281, 0.555802, 0.366065], 51.2, [1,1,1,1]),
    // 3 Plata
    new BlinnPhongMaterial(gl, [0.19225, 0.19225, 0.19225], [0.50754, 0.50754, 0.50754], [0.508273, 0.508273, 0.508273], 51.2, [1,1,1,1]),
    // 4 Turquesa
    new BlinnPhongMaterial(gl, [0.1, 0.18725, 0.1745], [0.396, 0.74151, 0.69102], [0.297254, 0.30829, 0.306678], 12.8, [1,1,1,1]),
    // 5 Plástico negro
    new BlinnPhongMaterial(gl, [0.0, 0.0, 0.0], [0.01, 0.01, 0.01], [0.50, 0.50, 0.50], 32, [1,1,1,1]),
    // 6 Plástico cyan
    new BlinnPhongMaterial(gl, [0.0, 0.1, 0.06], [0.0, 0.50980392, 0.50980392], [0.50196078, 0.50196078, 0.50196078], 32, [1,1,1,1]),
    // 7 Plástico verde
    new BlinnPhongMaterial(gl, [0.0, 0.0, 0.0], [0.1, 0.35, 0.1], [0.45, 0.55, 0.45], 32, [1,1,1,1]),
    // 8 Plástico rojo
    new BlinnPhongMaterial(gl, [0.0, 0.0, 0.0], [0.5, 0.0, 0.0], [0.7, 0.6, 0.6], 32, [1,1,1,1]),
    // 9 Plástico blanco
    new BlinnPhongMaterial(gl, [0.0, 0.0, 0.0], [0.55, 0.55, 0.55], [0.70, 0.70, 0.70], 32, [1,1,1,1]),
    // 10 Plástico amarillo
    new BlinnPhongMaterial(gl, [0.0, 0.0, 0.0], [0.5, 0.5, 0.0], [0.60, 0.60, 0.50], 32, [1,1,1,1]),
    // Esmeralda
    new BlinnPhongMaterial(gl, [0.0215, 0.1745, 0.0215], [0.07568, 0.61424, 0.07568], [0.633, 0.727811, 0.633], 76.8, [1,1,1,1]),
  ];

  let TM = [
    new TextureMaterial(gl, estrellas), // 0
    new TextureMaterial(gl, luna),  // 1
    new TextureMaterial(gl, bajofondo), // 2
    new TextureMaterial(gl, mediofondo),  // 3
    new TextureMaterial(gl, alma), // 4
    new TextureMaterial(gl, mars), // 5
    new TextureMaterial(gl, venus), // 6
    new TextureMaterial(gl, haumea), // 7
    new TextureMaterial(gl, jupiter), // 8
    new TextureMaterial(gl, noche), // 9
  ];

  let BPT = [
    new BlinnPhongTextureMaterial(gl, [0,0,0], [1,1,1], [0.5,0.5,0.5], 100, pink),
    new BlinnPhongTextureMaterial(gl, [0,0,0], [1,1,1], [0.5,0.5,0.5], 100, bocanada),
    new BlinnPhongTextureMaterial(gl, [0,0,0], [1,1,1], [0.5,0.5,0.5], 100, karma),
    new BlinnPhongTextureMaterial(gl, [0,0,0], [1,1,1], [0.5,0.5,0.5], 100, kida),
    new BlinnPhongTextureMaterial(gl, [0,0,0], [1,1,1], [0.5,0.5,0.5], 100, cowboy),
    new BlinnPhongTextureMaterial(gl, [0,0,0], [1,1,1], [0.5,0.5,0.5], 100, debut),
    new BlinnPhongTextureMaterial(gl, [0,0,0], [1,1,1], [0.5,0.5,0.5], 100, love),
    new BlinnPhongTextureMaterial(gl, [0,0,0], [1,1,1], [0.5,0.5,0.5], 100, beach),
    new BlinnPhongTextureMaterial(gl, [0,0,0], [1,1,1], [0.5,0.5,0.5], 100, currents),
  ];

  const origin = Matrix4.translate(new Vector3(0, 0, 0));

  // Escenas
  let scene_0 = [
    new Esfera(gl, 500, 16, 16, TM[0], origin),
    new Esfera(gl, 20, 32, 32, TM[1], Matrix4.translate(new Vector3(60, 57, -200))),
    new Disco(gl, 7, 7, 0.35, BPT[0], origin),
    new Tetraedro(gl, 5, BP[5], Matrix4.translate(new Vector3(15, -3, 5)), 1),
    new Tetraedro(gl, 5, BP[5], Matrix4.translate(new Vector3(-15, -3, 5)), 2),
    new Tetraedro(gl, 5, BP[5], Matrix4.translate(new Vector3(-10, -3, 5)), 3),
  ];

  let scene_1 = [
    new Esfera(gl, 50, 16, 16, TM[3], origin),
    new Disco(gl, 7, 7, 0.35, BPT[1], origin),
    new Octaedro(gl, 5, BP[1], Matrix4.translate(new Vector3(-20, 0, 0)), 2),
    new Octaedro(gl, 5, BP[1], Matrix4.translate(new Vector3(20, 0, 0)), 2),
    new Toroide(gl, 20, 15, 128, 128, BP[0], Matrix4.multiply(Matrix4.translate(new Vector3(0,0,-10)), Matrix4.rotateX(Math.PI/2)), 8),
  ]

  let scene_2 = [
    new Esfera(gl, 500, 16, 16, TM[2], origin),
    new Disco(gl, 7, 7, 0.35, BPT[2], Matrix4.translate(new Vector3(-4, 0, 0)), 15),
    new Disco(gl, 7, 7, 0.35, BPT[3], Matrix4.translate(new Vector3(4, 0, 0)), 16),
  ]

  let scene_3 = [
    new Esfera(gl, 500, 16, 16, TM[0], origin, 0),
    new Disco(gl, 7, 7, 0.35, BPT[4], origin),
    new Esfera(gl, 150, 32, 32, TM[5], Matrix4.translate(new Vector3(175, -75, -250)), 17),
  ]

  let scene_4 = [
    new Esfera(gl, 500, 16, 16, TM[0], origin),
    new Disco(gl, 7, 7, 0.35, BPT[5], origin),
    new Esfera(gl, 300, 64, 64, TM[6], Matrix4.translate(new Vector3(-150, -250, -200)), 17),
    new Dodecaedro(gl, 2, BP[2], Matrix4.translate(new Vector3(10, 0, 0)), 15)
  ]

  let scene_5 = [
    new Esfera(gl, 500, 32, 32, TM[7], origin),
    new Disco(gl, 7, 7, 0.35, BPT[6], origin),
    new Toroide(gl, 10, 2.75, 128, 128, BP[9], Matrix4.multiply(Matrix4.translate(new Vector3(0,0,0)), Matrix4.rotateX(Math.PI/2)), 6),
  ]

  let scene_6 = [
    new Esfera(gl, 500, 32, 32, TM[8], origin),
    new Disco(gl, 7, 7, 0.35, BPT[7], origin),
    new Cilindro(gl, 5, 15, 64, 64, BP[0], Matrix4.translate(new Vector3(9.5, 0, 0)), 15),
    new Cilindro(gl, 5, 15, 64, 64, BP[0], Matrix4.translate(new Vector3(-9.5, 0, 0)), 16),
  ]

  let scene_7 = [
    new Esfera(gl, 500, 64, 64, TM[0], origin),
    new Esfera(gl, 50, 64, 64, TM[9], Matrix4.translate(new Vector3(60, 0, -100)), 8),
    new Disco(gl, 7, 7, 0.35, BPT[8], origin),
    new Esfera(gl, 0.75, 128, 128, BP[3], Matrix4.translate(new Vector3(-6, 0, 0)), 2),
    new Esfera(gl, 0.75, 128, 128, BP[3], Matrix4.translate(new Vector3(0, -6, 0)), 4),
    new Esfera(gl, 0.75, 128, 128, BP[3], Matrix4.translate(new Vector3(6, 0, 0)), 6),
  ]

  let scenes = [scene_0, scene_1, scene_2, scene_3, scene_4, scene_5, scene_6, scene_7];
  let geometry = scene_0;

  // Camara
  let camera = new OrbitCamera(
    new Vector3(0,0,12.5), // Posición
    new Vector3(0,0,0), // Centro de interés
    new Vector3(0,1,0) // Vector hacia arriba
  );

  let projectionMatrix = Matrix4.perspective(
    (45 * Math.PI) / 180,
    canvas.width / canvas.height,
    0.1,
    2000
  );

  // Luz
  let light = new LuzPuntual(
     new Vector4(1.5, 2.5, 10, 1),
    // new Vector4(0, 0, 10, 1),
    [0.1, 0.1, 0.1],
    [1, 1, 1],
    [1, 1, 1]
  );

  gl.enable(gl.DEPTH_TEST);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 0);

  // Animación
  function update(elapse, play) {
    for (let i = 0; i < geometry.length; i++) {
      geometry[i].update(elapse, play);
    }
  }

  let lastTime = Date.now();
  let current = 0;
  let elapsed = 0;
  let max_elapsed_wait = 10/1000;
  let animate = false;
 
  function gameLoop() {
    current = Date.now();
    elapsed = (current - lastTime) / 2000;
    lastTime = current;

    if (elapsed > max_elapsed_wait) {
      elapsed = max_elapsed_wait;
    }

    update(elapsed, animate);
    draw();

    window.requestAnimationFrame(gameLoop);
  }

  gameLoop();
  camera.registerMouseEvents(gl.canvas, draw);

  // Dibujado
  function draw() {
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let viewMatrix = camera.getMatrix();
    light.update(viewMatrix);
    for (let i = 0; i < geometry.length; i++) {
      geometry[i].draw(
        gl, 
        projectionMatrix, 
        viewMatrix, 
        light
      );
    }
  }

  // Eventos del teclado
  window.addEventListener("keydown", (evt) => {
    console.log(evt.key);

    if (evt.key == "ArrowUp") {
      camera.moveForward();
      draw();
    }

    if (evt.key == "ArrowDown") {
      camera.moveBackward();
      draw();
    }
  });

  // Eventos del Mouse 
  camera.registerMouseEvents(gl.canvas, draw);


  let index = 0;

  // Funciones de Escenas
  function prevScene() {
    index--
    if (index < 0) {
      index = songs.length - 1;
    }
    geometry = scenes[index]
    animate = true;
    draw();
  }

  function pauseScene() {
    const isPlaying = play.classList.contains("play");
    if (!isPlaying) {
      animate = false;
    } else {
      animate = true;
    }
  }

  function nextScene() {
    index++
    if (index > scenes.length - 1) {
      index = 0
    }
    geometry = scenes[index]
    animate = true;
    draw();
  }

  // Escuchas
  prev.addEventListener("click", prevScene);
  play.addEventListener("click", pauseScene);
  next.addEventListener("click", nextScene);
  audio.addEventListener("ended", nextScene);
  
});

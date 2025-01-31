function createProgram(gl, vertexSrc, fragmentSrc) {
  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexSrc);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    gl.deleteShader(vertexShader);
    return;
  }

  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentSrc);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(fragmentShader));
    gl.deleteShader(fragmentShader);
    return;
  }

  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function getMousePositionInElement(evt, element) {
  const rect = element.getBoundingClientRect();
  return { 
    x: evt.clientX - rect.left, 
    y: evt.clientY - rect.top
  };
}

/**
 * Lee una images a partir de su dirección y devuelve una Promesa
 * @param {*} url 
 * @returns Promise Devuelve una promesa asociada la imagen
 */
function loadImage(url) {
  return new Promise((resolve, reject) => {
    // se crea una imagen
    const img = new Image();
    // se asocia al evento de carga de la imagen la resolución de la promesa
    // resolve(img) es una función de la Promesa que eventualmente devuelve la imagen
    img.addEventListener("load", () => resolve(img));
    // se asocia al evento de error de la imagen el rechazo de la promesa
    // reject(err) es una función de la Promesa que eventualmente devuelve un error
    img.addEventListener("error", (err) => reject(err));
    // se inicia la carga de la imagen
    img.src = url;
  });
}

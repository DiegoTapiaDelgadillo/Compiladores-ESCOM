const fs = require("fs");
const readline = require("readline");
const rutaTxt = "nota.txt";
const nuevoTxt = "verificarCorreos.txt";
const Parrafos = [];

var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;

const rl = readline.createInterface({
  input: fs.createReadStream(rutaTxt),
  output: process.stdout,
  terminal: false,
});

rl.on("line", (linea) => {
  if (linea.trim() !== "") {
    Parrafos.push(linea);
  }
});

rl.on("close", () => {
  const tamañoArreglo = Parrafos.length;

  for (let i = 0; i < tamañoArreglo; i++) {
    if (regexEmail.test(Parrafos[i])) {
      Parrafos[i] = Parrafos[i] + ": Es un correo correcto";
    } else {
      Parrafos[i] = Parrafos[i] + ": Es un correo incorrecto";
    }
  }

  const contenido = Parrafos.join("\n");

  fs.writeFile(nuevoTxt, contenido, (err) => {
    if (err) {
      console.error("Error al crear el archivo:", err);
    } else {
      console.log("Se ha creado el archivo con éxito.");
    }
  });
});

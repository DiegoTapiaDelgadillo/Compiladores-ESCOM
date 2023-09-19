const fs = require("fs");
const rutaTxt = "nota.txt";
const identificador = [];
const palabraReservada = [];
const caracterEspecial = [];
const funcion = [];

var regexIdentificador = /^[a-zA-Z]+$/;
var regexFuncion = /^[a-zA-Z]+\(\)$/;
var regexCaracterEspecial =
  /^([a-zA-Z]+\;)||([a-zA-Z]+\(\)\;)||([a-zA-Z]+\(\)\{\})$/;

fs.readFile(rutaTxt, "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  const palabras = data.split(/\s+/);

  palabras.forEach((palabra) => {
    if (
      palabra.toLowerCase() === "var" ||
      palabra.toLowerCase() === "const" ||
      palabra.toLowerCase() === "let" ||
      palabra.toLowerCase() === "if" ||
      palabra.toLowerCase() === "else"
    ) {
      palabraReservada.push(palabra);
    } else if (regexIdentificador.test(palabra.toLowerCase())) {
      identificador.push(palabra);
    } else if (regexFuncion.test(palabra.toLowerCase())) {
      funcion.push(palabra);
    } else if (
      regexCaracterEspecial.test(palabra.toLowerCase()) ||
      palabra.toLowerCase() === "=" ||
      palabra.toLowerCase() === ";" ||
      palabra.toLowerCase() === "" ||
      palabra.toLowerCase() === "{" ||
      palabra.toLowerCase() === "}" ||
      palabra.toLowerCase() === "."
    ) {
      caracterEspecial.push(palabra.charAt(palabra.length - 1));
    }
  });
  console.log("Palabras reservadas encontradas: " + palabraReservada);
  console.log("Identificadores encontrados: " + identificador);
  console.log("Funciones encontradas: " + funcion);
  console.log("Caracteres espceriales encontrados: " + caracterEspecial);
});

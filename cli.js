const chalk = require("chalk");
const { processarArquivo } = require("./index");
const { validarURLs } = require("./http-validacao");

const caminho = process.argv;

async function processarTexto(caminhoDeArquivo) {
  const resultado = await processarArquivo(caminhoDeArquivo[2]);
  if (caminhoDeArquivo[3] === "validar") {
    const urlsValidadas = await validarURLs(resultado);
    console.log(chalk.yellow("links validados"), urlsValidadas);
  } else {
    console.log(chalk.yellow("lista de links"), resultado);
  }
}

processarTexto(caminho);

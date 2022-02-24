const { processarArquivosDoDiretorio } = require("./index");
const chalk = require("chalk");

const caminho = process.argv;

async function processarTextos(caminhoDeArquivo) {
  console.log("eita");
  const resultado = await processarArquivosDoDiretorio(caminhoDeArquivo[2]);
  console.log(chalk.yellow("listas de links"), resultado);
}

processarTextos(caminho);

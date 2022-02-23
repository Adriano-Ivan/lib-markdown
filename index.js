const chalk = require("chalk");
const fs = require("fs");

function extrairLinks(texto) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const arrayResultados = [];

  let temp;
  while ((temp = regex.exec(texto)) !== null) {
    arrayResultados.push({ [temp[1]]: temp[2] });
  }

  return arrayResultados;
}

function tratarErro(erro) {
  throw new Error(
    chalk.red(
      erro.code,
      "Não foi encontrado nenhum arquivo com o nome indicado."
    )
  );
}

async function pegarArquivo(caminhoDoArquivo) {
  try {
    const encoding = "utf-8";
    const conteudo = await fs.promises.readFile(caminhoDoArquivo, encoding);
    console.log(extrairLinks(conteudo));
  } catch (erro) {
    tratarErro(erro);
  } finally {
    console.log(chalk.green("Fim da execução."));
  }
}

pegarArquivo("./arquivos/texto1.md");

const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

function extrairLinks(texto) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const arrayResultados = [];

  let temp;
  while ((temp = regex.exec(texto)) !== null) {
    arrayResultados.push({ [temp[1]]: temp[2] });
  }

  return arrayResultados.length === 0 ? "Não há links" : arrayResultados;
}

function tratarErro(erro) {
  throw new Error(
    chalk.red("Não foi encontrado nenhum arquivo com o nome indicado.")
  );
}

async function processarArquivo(caminhoDoArquivo) {
  try {
    const encoding = "utf-8";
    const conteudo = await fs.promises.readFile(caminhoDoArquivo, encoding);
    return extrairLinks(conteudo);
  } catch (erro) {
    tratarErro(erro);
  }
  // } finally {
  //   console.log(chalk.green("Fim da leitura."));
  // }
}

async function processarArquivosDoDiretorio(caminho) {
  const caminhoAbsoluto = path.join(__dirname, caminho);
  const encoding = "utf-8";
  console.log(caminhoAbsoluto);
  try {
    const arquivos = await fs.promises.readdir(caminhoAbsoluto, { encoding });
    console.log(arquivos);
    const result = await Promise.all(
      arquivos.map(async (arquivo) => {
        const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
        const texto = await fs.promises.readFile(localArquivo, encoding);

        return extrairLinks(texto);
      })
    );

    return result;
  } catch (erro) {
    return tratarErro(erro);
  }
}
module.exports = { processarArquivo, processarArquivosDoDiretorio };

const chalk = require("chalk");
const fs = require("fs");

function tratarErro(erro) {
  throw new Error(
    chalk.red(
      erro.code,
      "Não foi encontrado nenhum arquivo com o nome indicado."
    )
  );
}
function pegarArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";
  fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
    if (erro) {
      tratarErro(erro);
    }
    console.log(chalk.green(texto));
  });
}

pegarArquivo("./arquivos/text1.md");

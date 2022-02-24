const path = require("path");
const { processarArquivo } = require("./../index");
const arrayResult = [
  {
    FileList: "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
  },
];

describe("pegarArquivo::", () => {
  it("deve ser uma função", () => {
    expect(typeof processarArquivo).toBe("function");
  });
  it("deve retornar array de resultados", async () => {
    const resultado = await processarArquivo(
      path.join(__dirname, "arquivos", "texto1.md")
    );
    expect(resultado).toEqual(arrayResult);
  });
  it('deve retornar mensagem "não há links"', async () => {
    const resultado = await processarArquivo(
      path.join(__dirname, "arquivos", "texto1_semlinks.md")
    );
    expect(resultado).toBe("Não há links");
  });
  it("deve lançar exceção por falta de arquivo", async () => {
    await expect(
      processarArquivo(path.join(__dirname, "arquivos"))
    ).rejects.toThrow("Não foi encontrado nenhum arquivo com o nome indicado.");
  });
});

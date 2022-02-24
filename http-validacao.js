const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function manejarErros(erro) {
  throw new Error(erro.message);
}
async function checaStatus(arrayURLs) {
  try {
    const arrayStatus = await Promise.all(
      arrayURLs.map(async (url) => {
        const res = await fetch(url);
        return `${res.status} - DESCRIPTION: ${res.statusText}`;
      })
    );
    return arrayStatus;
  } catch (erro) {
    manejarErros(erro);
  }
}

function gerarArrayDeURLs(arrayDeLinks) {
  return arrayDeLinks.map((objetoLink) => {
    return Object.values(objetoLink).join();
  });
}

async function validarURLs(arrayLinks) {
  const links = gerarArrayDeURLs(arrayLinks);
  const statusLinks = await checaStatus(links);

  const resultados = arrayLinks.map((objeto, indice) => ({
    ...objeto,
    status: statusLinks[indice],
  }));
  return resultados;
}

module.exports = {
  validarURLs,
};

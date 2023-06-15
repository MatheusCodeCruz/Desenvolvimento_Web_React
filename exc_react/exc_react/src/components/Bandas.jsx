import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/index.css";

const ListaBandas = () => {
  const [bandas, setBandas] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const obterDados = async () => {
      try {
        const resposta = await axios.get(
          "https://6480d91cf061e6ec4d49f10a.mockapi.io/bandas"
        );
        setBandas(resposta.data);
      } catch (erro) {
        console.error("Erro ao obter dados:", erro);
      }
    };

    obterDados();
  }, []);

  const handlePesquisa = (event) => {
    setTermoPesquisa(event.target.value);
  };

  const handleFavorito = (idBanda) => {
    const atualizarFavoritos = favoritos.includes(idBanda)
      ? favoritos.filter((id) => id !== idBanda)
      : [...favoritos, idBanda];
    setFavoritos(atualizarFavoritos);
  };

  const handleExcluir = async (idBanda) => {
    try {
      await axios.delete(
        `https://6480d91cf061e6ec4d49f10a.mockapi.io/bandas/${idBanda}`
      );
      setBandas((bandasAntigas) =>
        bandasAntigas.filter((banda) => banda.id !== idBanda)
      );
    } catch (erro) {
      console.error("Erro ao excluir banda:", erro);
    }
  };

  const bandasFiltradas = bandas.filter((banda) =>
    banda.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  const bandasOrdenadas = [...bandasFiltradas].sort((a, b) => {
    const aEhFavorito = favoritos.includes(a.id);
    const bEhFavorito = favoritos.includes(b.id);

    if (aEhFavorito && !bEhFavorito) {
      return -1;
    } else if (!aEhFavorito && bEhFavorito) {
      return 1;
    }

    return 0;
  });

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Pesquisar"
        value={termoPesquisa}
        onChange={handlePesquisa}
      />
      
      {bandasOrdenadas.map((banda) => (
        <div className="row main">
          <div key={banda.id} className="col-4 nome">
            {banda.nome}
          </div>
         
          <div className="col-4 imagem">
            <img src={banda.image_url} className="foto"></img>
            </div>
                        
            <div className="col-4 botoes">
              <button
                className="botaoFavoritar"
                onClick={() => handleFavorito(banda.id)}
              >
                {favoritos.includes(banda.id) ? "Desfavoritar" : "Favoritar"}
              </button>{" "}
              <button
                className="botaoExcluir"
                onClick={() => handleExcluir(banda.id)}
              >
                Excluir
              </button>
            </div>
        </div>
      ))}
    </div>
  );
};

export default ListaBandas;

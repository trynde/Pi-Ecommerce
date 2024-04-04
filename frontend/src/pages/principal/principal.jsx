import { NavBar } from "../../componentes/navbar/navbar";
import "./principal.css";
import "../card/card";
import Card from "../card/card";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export function Principal() {
  const navegar = useNavigate();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    // Função para buscar a imagem do servidor
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/buscarImagem/${id}`
        );
        // Verifica se a resposta é bem-sucedida (status 200)
        if (response.status === 200) {
          // Atualiza o estado de imagens com a URL da imagem recebida do servidor
          console.log(response);
          setImages(response.data);
        } else {
          console.error("Erro ao buscar imagem:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar imagem:", error.message);
      }
    };

    fetchImage(); // Chama a função de busca de imagem ao montar o componente
  }, []);

  const handleChangeImage = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Função para buscar as informações do produto do servidor
    const fetchProductInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/produto`);
        // Verifica se a resposta é bem-sucedida (status 200)
        if (response.status === 200) {
          console.log(response.data);

          setProductInfo(response.data);
        } else {
          console.error(
            "Erro ao buscar informações do produto:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Erro ao buscar informações do produto:", error.message);
      }
    };

    fetchProductInfo(); // Chama a função de busca de informações do produto ao montar o componente
  }, []);

  return (
    <>
    <NavBar/>
    <div className="divPrincipal">

      <div className="carde">
        {productInfo === null ? (
          <h1>Carregando</h1>
        ) : (
          <div>
            {productInfo.map((produto, index) => {
              return (
                <div className="card1" key={index}>
                  <p className="card1txt">{produto.nomeProduto} </p>
                  
                  <p className="card2txt1">{produto.preco} </p>
                  <button
                    className="btn"
                    onClick={() => navegar(`/Visualizar/${produto.id}`)}
                  >
                    Detalhe
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>

    </>
  );
}

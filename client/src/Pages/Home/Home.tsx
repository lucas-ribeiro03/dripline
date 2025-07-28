import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./style.module.scss";
import Carousel from "../../Components/Carousel/Carousel";
import Navbar from "../../Components/Navbar/Navbar";
import { Produto } from "../../types/Produto";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [categorias, setCategorias] = useState<string[]>([]);
  const navigate = useNavigate();

  const getCarouselTitle = async () => {
    const response = await axios.get("http://localhost:3001/produtos");
    const categoriasComProdutos: string[] = [];
    response.data.map((produto: Produto) => {
      if (categoriasComProdutos.includes(produto.categoria.nome)) {
        return;
      } else {
        categoriasComProdutos.push(produto.categoria.nome);
      }

      setCategorias(categoriasComProdutos);
    });
  };

  useEffect(() => {
    getCarouselTitle();
  }, []);
  return (
    <div>
      <Navbar />
      {categorias.map((categoria, i) => (
        <div className={styles.carousels}>
          <Carousel
            key={i}
            title={categoria}
            onProductClick={() =>
              navigate(`/produto/${localStorage.getItem("produto")}`)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Home;

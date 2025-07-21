import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./style.module.scss";
import Carousel from "../../Components/Carousel/Carousel";
import Navbar from "../../Components/Navbar/Navbar";
import { Produto } from "../../data/Produto";

const Home = () => {
  const [categorias, setCategorias] = useState<string[]>([]);

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
      <div className={styles.carousels}>
        {categorias.map((categoria, i) => (
          <Carousel key={i} title={categoria} />
        ))}
      </div>
    </div>
  );
};

export default Home;

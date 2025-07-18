import axios from "axios";
import Carousel from "./Components/Carousel/Carousel";
import Navbar from "./Components/Navbar/Navbar";
import styles from "./styles/global.module.scss";
import { useEffect, useState } from "react";
import { Produto } from "./data/Produto";

const App = () => {
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
    <div className={styles.global}>
      <Navbar />
      <div className={styles.carousels}>
        {categorias.map((categoria, i) => (
          <Carousel key={i} title={categoria} />
        ))}
      </div>
    </div>
  );
};

export default App;

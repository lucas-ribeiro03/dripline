import axios from "axios";
import Carousel from "./Components/Carousel/Carousel";
import Navbar from "./Components/Navbar/Navbar";
import styles from "./styles/global.module.scss";
import { useEffect, useState } from "react";
import { Produto } from "./data/Produto";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ProdutosProvider } from "./contexts/ProdutosContext";

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
    <Provider store={store}>
      <ProdutosProvider>
        <div className={styles.global}>
          <Navbar />
          <div className={styles.carousels}>
            {categorias.map((categoria, i) => (
              <Carousel key={i} title={categoria} />
            ))}
          </div>
        </div>
      </ProdutosProvider>
    </Provider>
  );
};

export default App;

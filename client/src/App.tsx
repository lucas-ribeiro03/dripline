import styles from "./styles/global.module.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ProdutosProvider } from "./contexts/ProdutosContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Produto from "./Pages/Produto/Produto";
import { AnuncioProvider } from "./contexts/AnuncioContext";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AnuncioProvider>
          <ProdutosProvider>
            <div className={styles.global}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produto/:id" element={<Produto />} />
              </Routes>
            </div>
          </ProdutosProvider>
        </AnuncioProvider>
      </Router>
    </Provider>
  );
};

export default App;

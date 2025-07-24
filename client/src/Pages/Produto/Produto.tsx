/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { ProdutoContext } from "../../contexts/ProdutosContext";
import { useParams } from "react-router-dom";
import { AnuncioContext } from "../../contexts/AnuncioContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import Navbar from "../../Components/Navbar/Navbar";

const Produto = () => {
  const { getProduct, product } = useContext(ProdutoContext);
  const { getAnuncio, anuncio } = useContext(AnuncioContext);
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const tamanhosTenis = [37, 38, 39, 40, 41, 42, 43, 44, 45];
  const tamanhosRoupas = ["P", "M", "G", "GG", "XG"];

  useEffect(() => {
    if (id) {
      getAnuncio(Number(id));
      getProduct(Number(id));
    }
  }, []);

  useEffect(() => {
    setActiveImage(product.img_principal);
  }, [product]);
  return (
    <div>
      <Navbar />
      <div className={styles.produtoPageBody}>
        <div className={styles.produtoImagens} style={{ gridArea: "box1" }}>
          <div
            style={{ gridArea: "box1" }}
            onClick={() => setActiveImage(product.img_principal)}
            className={styles.miniaturaPrimaria}
          >
            <img
              src={`http://${product.img_principal}`}
              alt="imagem primaria"
            />
          </div>
          {product.img_secundaria && (
            <div
              style={{ gridArea: "box2" }}
              onClick={() => {
                if (product.img_secundaria)
                  setActiveImage(product.img_secundaria);
              }}
              className={styles.miniaturaSecundaria}
            >
              <img
                src={`http://${product.img_secundaria}`}
                alt="imagem secundária"
              />
            </div>
          )}

          <div className={styles.imagem} style={{ gridArea: "box3" }}>
            <img src={`http://${activeImage}`} alt="imagem ativa" />
          </div>
        </div>
        <div className={styles.produtoInfo} style={{ gridArea: "box2" }}>
          <div className={styles.produtoNome}>{product.nome}</div>
          <div className={styles.precoBase}>R${product.preco_base}</div>
          <div className={styles.precoPromocional}>R${anuncio.preco}</div>
          <div className={styles.precoParcelado}>
            <span>
              ou <strong>12x</strong> de{" "}
              <strong>R${(anuncio.preco / 12).toFixed(2)}</strong>
            </span>
          </div>
          <div className={styles.formaPgto}>
            <span>
              <MdOutlinePayment /> Formas de pagamento
            </span>
          </div>
          <div className={styles.tamanhosRoupas}>
            <p>Tamanho: </p>
            <div className={styles.tamanhos}>
              {tamanhosRoupas.map((tamanho) => (
                <span key={tamanho}>{tamanho}</span>
              ))}
            </div>
          </div>
          {product.tipo_produto === "kit completo" && (
            <div className={styles.tamanhosCalcados}>
              <p>Tamanho Calçado:</p>
              <div className={styles.tamanhos}>
                {tamanhosTenis.map((tamanho) => (
                  <span key={tamanho}>{tamanho}</span>
                ))}
              </div>
            </div>
          )}
          <form className={styles.quantityForm}>
            <div className={styles.inputBox}>
              <FaMinus
                onClick={() =>
                  quantidade > 0 ? setQuantidade(quantidade - 1) : null
                }
                className={styles.minusBtn}
              />
              <input
                type="text"
                readOnly
                name="quantidade"
                id="quantidade"
                value={quantidade}
              />
              <FaPlus
                className={styles.plusBtn}
                onClick={() => setQuantidade(quantidade + 1)}
              />
            </div>

            <button>COMPRAR AGORA</button>
          </form>
        </div>
        <div className={styles.produtoDescricao}></div>
      </div>
    </div>
  );
};

export default Produto;

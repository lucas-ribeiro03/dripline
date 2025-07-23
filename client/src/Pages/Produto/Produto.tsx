/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { ProdutoContext } from "../../contexts/ProdutosContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const Produto = () => {
  const { getProduct, product, setProduct } = useContext(ProdutoContext);
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState("");
  const tamanhosTenis = [37, 38, 39, 40, 41, 42, 43, 44, 45];
  const tamanhosRoupas = ["P", "M", "G", "GG", "XG"];

  const getAnuncio = async (produto_id: number) => {
    const response = await axios.get(
      `http://localhost:3001/anuncio/${produto_id}`
    );

    setProduct({ ...product, ...response.data });
  };

  useEffect(() => {
    if (id) getProduct(Number(id));
    getAnuncio(Number(id));
  }, []);

  useEffect(() => {
    setActiveImage(product.img_principal);
  }, [product.img_principal]);
  return (
    <div>
      <div className={styles.produtoPageBody}>
        <div className={styles.produtoImagens}>
          <div
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

          <div className={styles.imagem}>
            <img src={`http://${activeImage}`} alt="imagem ativa" />
          </div>
        </div>
        <div className={styles.produtoInfo}>
          <div className={styles.produtoNome}>{product.nome}</div>
          <div className={styles.precoBase}>R${product.preco_base}</div>
          <div className={styles.precoPromocional}>R${product.preco}</div>
          <div className={styles.precoParcelado}>
            <span>
              ou <strong>12x</strong> de{" "}
              <strong>R${(product.preco / 12).toFixed(2)}</strong>
            </span>
          </div>
          <div className={styles.formaPgto}></div>
          <div className={styles.tamanhosRoupas}>
            {tamanhosRoupas.map((tamanho) => (
              <span>{tamanho}</span>
            ))}
          </div>
          {product.tipo_produto === "kit completo" && (
            <div className={styles.tamanhosCalcados}>
              {tamanhosTenis.map((tamanho) => (
                <span key={tamanho}>{tamanho}</span>
              ))}
            </div>
          )}
          <div className={styles.inputBox}>
            <input type="number" name="quantidade" id="quantidade" value={1} />
            <button>COMPRAR AGORA</button>
          </div>
        </div>
        <div className={styles.produtoDescricao}></div>
      </div>
    </div>
  );
};

export default Produto;

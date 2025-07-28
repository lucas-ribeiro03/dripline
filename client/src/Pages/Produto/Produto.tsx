/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { ProdutoContext } from "../../contexts/ProdutosContext";
import { useParams } from "react-router-dom";
import { AnuncioContext } from "../../contexts/AnuncioContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import PaymentWay from "../../Components/Modal/PaymentWay/PaymentWay";
import { addProduto } from "../../redux/cartReducer/cart-slice";
import { toast, ToastContainer } from "react-toastify";
import Cart from "../../Components/Modal/Carrinho/Cart";

const Produto = () => {
  const { getProduct, product } = useContext(ProdutoContext);
  const { getAnuncio, anuncio } = useContext(AnuncioContext);
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoTenis, setTamanhoTenis] = useState(0);
  const [tamanhoRoupa, setTamanhoRoupa] = useState("");
  const tamanhosTenis = [37, 38, 39, 40, 41, 42, 43, 44, 45];
  const tamanhosRoupas = ["P", "M", "G", "GG", "XG"];
  const [paymentWayMd, setPaymentWayMd] = useState(false);
  const dispatch = useDispatch();
  const [cartIsVisible, setCartIsVisible] = useState(false);

  useEffect(() => {
    if (id) {
      getAnuncio(Number(id));
      getProduct(Number(id));
    }
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tamanhoRoupa || !tamanhoTenis || quantidade < 1) {
      return toast("Todos os campos são obrigatórios", { type: "error" });
    }
    dispatch(
      addProduto({
        nome: product.nome,
        preco: anuncio.preco,
        tamanho_roupa: tamanhoRoupa,
        tamanho_tenis: tamanhoTenis,
        quantidade,
        produto_id: product.id,
        produto_img: product.img_principal,
      })
    );
    setCartIsVisible(true);
  };

  useEffect(() => {
    setActiveImage(product.img_principal);
  }, [product]);

  return (
    <div>
      <ToastContainer />
      {paymentWayMd && (
        <PaymentWay
          onClose={() => setPaymentWayMd(false)}
          price={anuncio.preco}
        />
      )}
      <Navbar />
      {cartIsVisible && <Cart onClose={() => setCartIsVisible(false)} />}
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
          {product.preco_base && (
            <div className={styles.precoBase}>
              R${product.preco_base.toString().replace(".", ",")}
            </div>
          )}
          {anuncio.preco && (
            <div className={styles.precoPromocional}>
              R${anuncio.preco.toString().replace(".", ",")}
            </div>
          )}

          <div className={styles.precoParcelado}>
            <span>
              ou <strong>12x</strong> de{" "}
              <strong>
                R${(anuncio.preco / 12).toFixed(2).replace(".", ",")}
              </strong>
            </span>
          </div>
          <div
            className={styles.formaPgto}
            onClick={() => setPaymentWayMd(true)}
          >
            <span>
              <MdOutlinePayment /> Formas de pagamento
            </span>
          </div>
          <div className={styles.tamanhosRoupas}>
            <p>Tamanho: </p>
            <div className={styles.tamanhos}>
              {tamanhosRoupas.map((tamanho) => (
                <span
                  style={
                    tamanho === tamanhoRoupa
                      ? { background: "#ccc", border: "2px solid black" }
                      : { background: "transparent" }
                  }
                  onClick={() => {
                    if (tamanho === tamanhoRoupa) {
                      return setTamanhoRoupa("");
                    }
                    setTamanhoRoupa(tamanho);
                  }}
                  key={tamanho}
                >
                  {tamanho}
                </span>
              ))}
            </div>
          </div>
          {product.tipo_produto === "kit completo" && (
            <div className={styles.tamanhosCalcados}>
              <p>Tamanho Calçado:</p>
              <div className={styles.tamanhos}>
                {tamanhosTenis.map((tamanho) => (
                  <span
                    onClick={() => {
                      if (tamanho === tamanhoTenis) {
                        return setTamanhoTenis(0);
                      }
                      setTamanhoTenis(tamanho);
                    }}
                    style={
                      tamanho === tamanhoTenis
                        ? { background: "#ccc", border: "2px solid black" }
                        : { background: "transparent" }
                    }
                    key={tamanho}
                  >
                    {tamanho}
                  </span>
                ))}
              </div>
            </div>
          )}
          <form onSubmit={(e) => onSubmit(e)} className={styles.quantityForm}>
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

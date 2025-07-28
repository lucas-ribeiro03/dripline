import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { FaX, FaTrash } from "react-icons/fa6";
import { Carrinho } from "../../../types/Carrinho";
import { useDispatch, useSelector } from "react-redux";
import { removerProduto } from "../../../redux/cartReducer/cart-slice";
import { RootReducer } from "../../../redux/root-reducer";

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const [cartItems, setCartItems] = useState<Carrinho[]>([]);
  const { carrinho } = useSelector(
    (rootReducer: RootReducer) => rootReducer.cartReducer
  );
  const getItemsOnCart = () => {
    setCartItems(carrinho);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    getItemsOnCart();
  }, []);
  return (
    <div>
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <div className={styles.productsOnCart}>
            {cartItems.map((item) => (
              <div className={styles.product}>
                <div className={styles.itemImage} style={{ gridArea: "box1" }}>
                  <img
                    src={`http://${item.produto_img}`}
                    alt="imagem do produto"
                    width={80}
                  />
                </div>
                <div className={styles.itemName} style={{ gridArea: "box2" }}>
                  {item.nome}
                </div>
                <div
                  className={styles.itemTamanhoRoupa}
                  style={{ gridArea: "box3" }}
                >
                  {item.tamanho_roupa}
                </div>

                <div
                  className={styles.itemTamanhoCalcado}
                  style={{ gridArea: "box4" }}
                >
                  {item.tamanho_tenis}
                </div>
                <div className={styles.itemPreco} style={{ gridArea: "box5" }}>
                  R${" "}
                  {item.preco
                    .toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                    .replace(".", ",")}
                </div>
                <div
                  className={styles.quantidadeItens}
                  style={{ gridArea: "box6" }}
                >
                  Quantidade: {item.quantidade}
                </div>
                <FaTrash
                  style={{ gridArea: "box7", color: "red", cursor: "pointer" }}
                  title="Excluir"
                  onClick={() => {
                    dispatch(removerProduto(item.produto_id));
                  }}
                />
              </div>
            ))}
          </div>
          <div className={styles.resume}>
            <h3>Resumo do pedido</h3>
            <span>
              Total: R${" "}
              {cartItems
                .reduce(
                  (acc, current: Carrinho) =>
                    (acc = Number(current.preco) + Number(acc)),
                  0
                )
                .toFixed(2)
                .replace(".", ",")}
            </span>
          </div>
          <button className={styles.finish}>Finalizar Compra</button>
          <button className={styles.closeBtn}>
            <FaX onClick={onClose} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

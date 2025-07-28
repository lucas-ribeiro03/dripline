import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { FaX } from "react-icons/fa6";
import { Carrinho } from "../../../types/Carrinho";

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const [cartItems, setCartItems] = useState<Carrinho[]>([]);
  const getItemsOnCart = () => {
    const items = JSON.parse(
      localStorage.getItem("produtos no carrinho") || "[]"
    );
    setCartItems(items);
  };

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
                <div className={styles.itemImage}>
                  <img src={item.produto_img} alt="imagem do produto" />
                </div>
                <div className={styles.itemName}>{item.nome}</div>
                <div className={styles.itemTamanhoRoupa}>
                  {item.tamanho_roupa}
                </div>
                <div className={styles.itemTamanhoCalcado}>
                  {item.tamanho_tenis}
                </div>
                <div className={styles.itemPreco}>{item.preco}</div>
                <div className={styles.quantidadeItens}>{item.quantidade}</div>
              </div>
            ))}
          </div>
          <div className={styles.resume}>
            <h3>Resumo do pedido</h3>
            <span>
              Total: R${" "}
              {cartItems.reduce(
                (acc: number, current: Carrinho) => (acc = current.preco + acc),
                0
              )}
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

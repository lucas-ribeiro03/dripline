import { Produto } from "../../types/Produto";
import styles from "./style.module.scss";

interface CardProps {
  card: Produto;
  seeProduct: () => void;
}

const Card: React.FC<CardProps> = ({ card, seeProduct }) => {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardImg}>
          <img src={`http://${card.img_principal}`} alt="produto" />
        </div>
        <div className={styles.cardNome}>
          <span className={styles.nome}>{card.nome}</span>
        </div>
        <div className={styles.cardPrice}>
          <span className={styles.promoPreco}>R$ 99,90 </span>
          <span className={styles.precoBase}>
            {" "}
            R$ {card.preco_base.toString().replace(".", ",")}
          </span>
        </div>
        <span className={styles.parcela}>
          ou 12x de {(99.9 / 12).toFixed(2).replace(".", ",")}
        </span>
        <button onClick={seeProduct}>Ver produto</button>
      </div>
    </div>
  );
};

export default Card;

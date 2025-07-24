import { useState } from "react";
import styles from "./style.module.scss";
import { FaPix, FaCreditCard } from "react-icons/fa6";

interface PaymentWayProps {
  price: number;
}

const PaymentWay: React.FC<PaymentWayProps> = ({ price }) => {
  const [method, setMethod] = useState<"pix" | "cartão">("cartão");
  return (
    <div>
      <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          <h2>Formas de pagamento</h2>
          <div className={styles.options}>
            <FaPix onClick={() => setMethod("pix")} />
            <FaCreditCard onClick={() => setMethod("cartão")} />
          </div>
          {method === "cartão" && (
            <div className={styles.parcelas}>
              {Array.from({ length: 12 }, (v: number, i) => (
                <div key={i} className={styles.parcela}>
                  <p>
                    {v}x de {price / v}
                  </p>
                  <p>Total: {price * 1.05}</p>
                </div>
              ))}
            </div>
          )}
          {method === "pix" && (
            <div className={styles.information}>
              <span style={{ color: "#00C3EE" }}>R$ {price * 0.95}</span>
              <span>
                À vista no PIX com <strong>5% OFF</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentWay;

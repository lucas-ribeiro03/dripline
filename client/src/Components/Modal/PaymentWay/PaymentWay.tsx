import { useState } from "react";
import styles from "./style.module.scss";
import { FaPix, FaCreditCard, FaX } from "react-icons/fa6";

interface PaymentWayProps {
  price: number;
  onClose: () => void;
}

const PaymentWay: React.FC<PaymentWayProps> = ({ price, onClose }) => {
  const [method, setMethod] = useState<"pix" | "cartão">("cartão");
  return (
    <div>
      <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          <h3>Formas de pagamento</h3>
          <div className={styles.options}>
            <FaPix
              style={method === "pix" ? { fill: "#00C3ee" } : { fill: "#000" }}
              onClick={() => setMethod("pix")}
            />
            <FaCreditCard
              style={
                method === "cartão" ? { fill: "#00C3ee" } : { fill: "#000" }
              }
              onClick={() => setMethod("cartão")}
            />
          </div>
          {method === "cartão" && (
            <div className={styles.parcelas}>
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  style={
                    (i + 1) % 2 === 0
                      ? { background: "#ccc" }
                      : { background: "null" }
                  }
                  key={i}
                  className={styles.parcela}
                >
                  <p>
                    {i + 1}x de R$ {(price / (i + 1)).toFixed(2)}
                  </p>
                  <p>Total: R$ {(price * 1.05).toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
          {method === "pix" && (
            <div className={styles.information}>
              <span
                style={{
                  color: "#00C3EE",
                  fontSize: "1.5rem",
                  fontWeight: "800",
                }}
              >
                R$ {(price * 0.95).toFixed(2)}
              </span>
              <span>
                À vista no PIX com <strong>5% OFF</strong>
              </span>
            </div>
          )}
          <FaX className={styles.closeBtn} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default PaymentWay;

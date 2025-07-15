import styles from "./style.module.scss";
import { FaX } from "react-icons/fa6";

interface CadastroProps {
  onClose: () => void;
}

const Cadastro: React.FC<CadastroProps> = ({ onClose }) => {
  return (
    <div>
      <div className={styles.modal}>
        <div className={styles.mdContainer}>
          <div className={styles.cadastroHeader}>
            <h1>Cadastro</h1>
          </div>
          <form className={styles.cadastroForm}>
            <div className={styles.inputBox}>
              <label htmlFor="nome">Nome</label>
              <input type="text" name="nome" id="nome" />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="senha">Senha</label>
              <input type="text" name="senha" id="senha" />
            </div>

            <button>CADASTRAR</button>
          </form>
          <span className={styles.optionCreate}>
            Já possui uma conta? <a onClick={onClose}>Faça login aqui!</a>
          </span>
          <FaX className={styles.closeBtn} onClick={onClose}></FaX>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;

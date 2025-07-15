import { useState } from "react";
import styles from "./style.module.scss";
import { FaX } from "react-icons/fa6";
import Cadastro from "../Cadastro/Cadastro";

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [cadastroIsVisible, setCadastroIsVisible] = useState(false);
  return (
    <div>
      {cadastroIsVisible ? (
        <Cadastro onClose={() => setCadastroIsVisible(false)} />
      ) : (
        <div className={styles.modal}>
          <div className={styles.mdContainer}>
            <div className={styles.loginHeader}>
              <h1>Login</h1>
            </div>
            <form className={styles.loginForm}>
              <div className={styles.inputBox}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="senha">Senha</label>
                <input type="text" name="senha" id="senha" />
              </div>

              <button>ENTRAR</button>
            </form>
            <span className={styles.optionCreate}>
              Novo por aqui?{" "}
              <a onClick={() => setCadastroIsVisible(true)}>Criar conta</a>
            </span>
            <FaX className={styles.closeBtn} onClick={onClose}></FaX>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

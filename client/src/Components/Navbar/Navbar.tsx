import { useState } from "react";
import styles from "./style.module.scss";
import { FaWhatsapp, FaTruck } from "react-icons/fa";
import { IoPerson, IoBag } from "react-icons/io5";
import Login from "../Modal/Login/Login";
import logo from "../../assets/img/dripline.png";

const Navbar = () => {
  const [loginModalIsVisible, setLoginModalIsVisible] = useState(false);
  return (
    <div>
      {loginModalIsVisible && (
        <Login onClose={() => setLoginModalIsVisible(false)} />
      )}
      <section className={styles.navbarSection}>
        <header className={styles.navbarHeader}>
          <a href="/">
            <img src={logo} height={150} alt="logo" />
          </a>
          <form className={styles.searchForm}>
            <input type="text" placeholder="Pesquisar..." />
            <button>Buscar</button>
          </form>

          <span className={styles.whatsappSupport}>
            <a href="">
              <FaWhatsapp />
            </a>
            <span>
              <strong>Dúvidas?</strong>
              <br />
              (21) 99573-2780
            </span>
          </span>

          <a href="" className={styles.findOrder}>
            <FaTruck /> <strong>Rastrear pedido</strong>
          </a>

          <a href="" className={styles.account}>
            <strong>Conta</strong>
          </a>

          <a
            onClick={() => setLoginModalIsVisible(true)}
            className={styles.accountIcon}
          >
            <IoPerson />
          </a>

          <a href="" className={styles.cartIcon}>
            <IoBag />
            <span>0</span>
          </a>
        </header>
        <nav className={styles.navbar}>
          <div className={styles.navbarContainer}>
            <ul>
              <a href="">
                <li>KITS DRI-FIT</li>
              </a>
              <a href="">
                <li>CONJUNTOS DE INVERNO</li>
              </a>
              <a href="">
                <li>CONJUNTOS INVERNO TIMES</li>
              </a>
              <a href="">
                <li>CONJUNTOS DE VERÃO</li>
              </a>
              <a href="">
                <li>JAQUETAS</li>
              </a>
              <a href="">
                <li>TÊNIS</li>
              </a>
              <a href="">
                <li>CHINELOS</li>
              </a>
              <a href="">
                <li>PERFUMES</li>
              </a>
              <a href="">
                <li>JOIAS</li>
              </a>
            </ul>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default Navbar;

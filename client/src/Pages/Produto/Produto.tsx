import styles from "./style.module.scss";

const Produto = () => {
  return (
    <div>
      <div className={styles.produtoPageBody}>
        <div className={styles.produtoImagens}>
          <div className={styles.miniaturaPrimaria}></div>
          <div className={styles.miniaturaSecundaria}></div>
          <div className={styles.imagem}></div>
        </div>
        <div className={styles.produtoInfo}>
          <div className={styles.produtoNome}></div>
          <div className={styles.precoBase}></div>
          <div className={styles.precoPromocional}></div>
          <div className={styles.precoParcelado}></div>
          <div className={styles.formaPgto}></div>
          <div className={styles.tamanhos}></div>
          <div className={styles.tamanhos}></div>
          <div className={styles.inputBox}>
            <input type="number" name="quantidade" id="quantidade" />
            <button>COMPRAR AGORA</button>
          </div>
        </div>
        <div className={styles.produtoDescricao}></div>
      </div>
    </div>
  );
};

export default Produto;

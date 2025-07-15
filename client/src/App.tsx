import Carousel from "./Components/Carousel/Carousel";
import Navbar from "./Components/Navbar/Navbar";
import styles from "./styles/global.module.scss";

const App = () => {
  return (
    <div className={styles.global}>
      <Navbar />
      <div className={styles.carousels}>
        <Carousel />
      </div>
    </div>
  );
};

export default App;

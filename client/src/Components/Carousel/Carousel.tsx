/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./style.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import { ProdutoContext } from "../../contexts/ProdutosContext";

interface CarouselProps {
  title: string;
  onProductClick: () => void;
}

const Carousel: React.FC<CarouselProps> = ({ title, onProductClick }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const { products } = useContext(ProdutoContext);

  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date();

    midnight.setHours(24, 0, 0, 0);

    const diffMs = midnight.getTime() - now.getTime();

    const horas = Math.floor(diffMs / (1000 * 60 * 60));
    const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diffMs % (1000 * 60)) / 1000);

    return {
      horas: String(horas).padStart(2, "0"),
      minutos: String(minutos).padStart(2, "0"),
      segundos: String(segundos).padStart(2, "0"),
    };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());

  const container = useRef<HTMLDivElement>(null);
  const prevButton = useRef<HTMLDivElement>(null);
  const nextButton = useRef<HTMLDivElement>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredCards = products.filter(
    (product) => product.categoria.nome === title
  );
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

  const updateCarousel = () => {
    const offset = currentPage * itemsPerPage * (100 / 6);
    if (currentPage === 0 && prevButton.current) {
      prevButton.current.style.display = "none";
    } else if (prevButton.current) {
      prevButton.current.style.display = "flex";
    }

    if (
      currentPage === Math.ceil(filteredCards.length / itemsPerPage - 1) &&
      nextButton.current
    ) {
      nextButton.current.style.display = "none";
    } else if (nextButton.current) {
      nextButton.current.style.display = "flex";
    }

    if (
      filteredCards.length % itemsPerPage !== 0 &&
      currentPage === totalPages - 1
    ) {
      const alternativeOffset =
        (currentPage - 1) * itemsPerPage * (100 / 6) +
        (filteredCards.length % itemsPerPage) * (100 / 6);
      if (container.current) {
        container.current.style.transform = `translateX(-${alternativeOffset}%)`;
      }
    } else {
      if (container.current) {
        container.current.style.transform = `translateX(-${offset}%)`;
      }
    }
  };

  useEffect(() => {
    updateCarousel();
  }, []);

  useEffect(() => {
    updateCarousel();
  }, [currentPage]);
  return (
    <div className={styles.carouselBody}>
      <section className={styles.productsCarousel}>
        <div className={styles.carouselHeader}>
          <h1>{title}</h1>
          <span>
            TERMINA EM:{" "}
            {`${timeLeft.horas}:${timeLeft.minutos}:${timeLeft.segundos}`}
          </span>
        </div>
        <div className={styles.containerCarousel} style={{ gridArea: "box3" }}>
          <div
            ref={prevButton}
            className={`${styles.actionButton}  ${styles.previous}`}
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            <FaChevronLeft />
          </div>

          <div className={styles.carouselViewport}>
            <div ref={container} className={styles.carouselItems}>
              {products.map(
                (product, i) =>
                  product.categoria.nome === title && (
                    <div key={i} className={styles.item}>
                      <Card
                        card={product}
                        seeProduct={() => {
                          localStorage.setItem(
                            "produto",
                            JSON.stringify(product.id)
                          );
                          onProductClick();
                          console.log("clicou");
                        }}
                      />
                    </div>
                  )
              )}
            </div>
          </div>
          <div
            ref={nextButton}
            className={`${styles.actionButton} ${styles.next}`}
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            <FaChevronRight />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carousel;

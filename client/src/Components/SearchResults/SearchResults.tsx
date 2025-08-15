import { useCallback, useEffect, useState } from "react";
import styles from "./style.module.scss";
import debounce from "lodash/debounce";

import axios from "axios";

interface SearchResultsProps {
  query: string;
  seeProduct: () => void;
}

interface Results {
  produto: {
    nome: string;
    img_principal: string;
  };

  preco: string;
  produto_id: number;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, seeProduct }) => {
  const [results, setResults] = useState<Results[]>([]);

  const getResults = async (search: string) => {
    const response = await axios.get(`http://localhost:3001/busca/${search}`);

    setResults(response.data);
  };

  const debouncedResults = useCallback(
    debounce((value: string) => getResults(value), 300),
    []
  );

  useEffect(() => {
    debouncedResults(query);

    return () => {
      debouncedResults.cancel();
    };
  }, [query]);
  return (
    <div>
      <div className={styles.resultsContainer}>
        {results.map((result, i) =>
          i > 5 ? null : (
            <div
              className={styles.result}
              onClick={() => {
                localStorage.setItem(
                  "produto",
                  JSON.stringify(result.produto_id)
                );
                seeProduct();
              }}
              key={i}
            >
              <div className={styles.img}>
                <img
                  src={`http://${result.produto.img_principal}`}
                  width={60}
                  alt=""
                />
              </div>

              <div className={styles.nome}>{result.produto.nome}</div>

              <div className={styles.preco}>
                R${result.preco.toString().replace(".", ",")}
              </div>
            </div>
          )
        )}
        {results.length > 5 ? (
          <span style={{ textAlign: "center" }}>Mostrar mais...</span>
        ) : null}
      </div>
    </div>
  );
};

export default SearchResults;

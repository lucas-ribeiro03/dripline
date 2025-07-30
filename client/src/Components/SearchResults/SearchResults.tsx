import { useCallback, useEffect, useState } from "react";
import styles from "./style.module.scss";
import debounce from "lodash.debounce";
import axios from "axios";

interface SearchResultsProps {
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [results, setResults] = useState<string[]>([]);

  const getResults = async (search: string) => {
    const response = await axios.get(`http://localhost:3001/busca/${search}`);
    console.log(response.data);
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
      <div className={styles.resultsContainer}></div>
    </div>
  );
};

export default SearchResults;

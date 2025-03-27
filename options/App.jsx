import { useEffect, useState } from "react";

import WebContent from "./components/WebContnet";
import { WebSearchContext } from "./context/WebSearchContext";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [latestArticles, setLatestArticles] = useState([]);
  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      const getLocalValueList = Object.keys(items);
      setLatestArticles(getLocalValueList);
    });
  }, []);

  return (
    <WebSearchContext.Provider
      value={{
        latestArticles,
        setLatestArticles,
        searchKeyword,
        setSearchKeyword,
      }}
    >
      <WebContent />
    </WebSearchContext.Provider>
  );
}

export default App;

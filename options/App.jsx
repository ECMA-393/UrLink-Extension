import { useEffect, useState } from "react";

import WebContent from "./components/WebContnet";
import { WebSearchContext } from "./context/WebSearchContext";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    let maxTimestamp = -Infinity;
    let latestKeyword = {};

    chrome.storage.local.get(null, (items) => {
      for (let keyword in items) {
        const keywardObj = items[keyword][0];
        const keywordObjTimestamp = Object.values(keywardObj)[0].timestamp;

        if (keywordObjTimestamp > maxTimestamp) {
          maxTimestamp = keywordObjTimestamp;
          latestKeyword = {
            [keyword]: items[keyword],
          };
        }
      }
      setFilteredData(latestKeyword);
    });
  }, []);

  return (
    <WebSearchContext.Provider
      value={{
        filteredData,
        searchKeyword,
        setSearchKeyword,
      }}
    >
      <WebContent />
    </WebSearchContext.Provider>
  );
}

export default App;

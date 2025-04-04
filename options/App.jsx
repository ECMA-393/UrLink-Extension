import { useEffect, useState } from "react";

import WebContent from "./components/WebContnet";
import { WebSearchContext } from "./context/WebSearchContext";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [reSearchKeyword, setReSearchKeyword] = useState(searchKeyword);

  const [filteredData, setFilteredData] = useState({});
  const [sortedHistory, setSortedHistory] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      let overallMaxTimestamp = -Infinity;
      let latestKeyword = {};
      const historyArray = [];

      Object.entries(items).forEach(([keyword, data]) => {
        const maxTimestampForCategory = data.reduce((max, entry) => {
          const timestamp = Object.values(entry)[0].timestamp;
          return timestamp > max ? timestamp : max;
        }, -Infinity);

        historyArray.push({
          keyword,
          data,
          maxTimestamp: maxTimestampForCategory,
        });

        if (maxTimestampForCategory > overallMaxTimestamp) {
          overallMaxTimestamp = maxTimestampForCategory;
          latestKeyword = { [keyword]: data };
          setSearchKeyword(`${keyword}`);
        }
      });

      historyArray.sort((a, b) => b.maxTimestamp - a.maxTimestamp);

      setFilteredData(latestKeyword);
      setSortedHistory(historyArray);
    });
  }, []);

  useEffect(() => {
    setReSearchKeyword(searchKeyword);
  }, [searchKeyword]);

  return (
    <WebSearchContext.Provider
      value={{
        filteredData,
        sortedHistory,
        searchKeyword,
        reSearchKeyword,
        setReSearchKeyword,
        setSortedHistory,
      }}
    >
      <WebContent />
    </WebSearchContext.Provider>
  );
}

export default App;

import { useEffect, useState } from "react";

import WebContent from "./components/WebContnet";
import { WebSearchContext } from "./context/WebSearchContext";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [reSearchKeyword, setReSearchKeyword] = useState(searchKeyword);

  const [filteredData, setFilteredData] = useState({ data: [] });
  const [sortedHistory, setSortedHistory] = useState([]);

  const fetchStorageData = () => {
    chrome.storage.local.get(null, (items) => {
      let overallMaxTimestamp = -Infinity;
      let latestItem = null;
      const historyArray = [];

      Object.entries(items).forEach(([keyword, data]) => {
        if (!data || data.length === 0) return;

        const maxTimestampForCategory = data.reduce((max, entry) => {
          const timestamp = Object.values(entry)[0].timestamp;
          return timestamp > max ? timestamp : max;
        }, -Infinity);

        const item = { keyword, data, maxTimestamp: maxTimestampForCategory };
        historyArray.push(item);

        if (maxTimestampForCategory > overallMaxTimestamp) {
          overallMaxTimestamp = maxTimestampForCategory;
          latestItem = item;
          setSearchKeyword(keyword);
        }
      });

      historyArray.sort((a, b) => b.maxTimestamp - a.maxTimestamp);

      setFilteredData(latestItem);
      setSortedHistory(historyArray);
    });
  };

  useEffect(() => {
    fetchStorageData();
  }, []);

  useEffect(() => {
    setReSearchKeyword(searchKeyword);
  }, [searchKeyword]);

  return (
    <WebSearchContext.Provider
      value={{
        filteredData,
        setFilteredData,
        sortedHistory,
        searchKeyword,
        reSearchKeyword,
        setReSearchKeyword,
        setSortedHistory,
        refreshHistory: fetchStorageData,
      }}
    >
      <WebContent />
    </WebSearchContext.Provider>
  );
}

export default App;

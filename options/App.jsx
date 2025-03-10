import { useEffect, useState } from "react";

import WebContent from "./components/WebContnet";
import { WebSearchContext } from "./context/WebSearchContext";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [urlNewList, setUrlNewList] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(["initialSearchValue"], (result) => {
      if (result.initialSearchValue) {
        setSearchValue(result.initialSearchValue);
      }
    });
  }, []);

  return (
    <WebSearchContext.Provider
      value={{
        searchValue,
        setUrlNewList,
        searchKeyword,
        setSearchKeyword,
      }}
    >
      <WebContent
        searchValue={searchValue}
        urlNewList={urlNewList}
      />
    </WebSearchContext.Provider>
  );
}

export default App;

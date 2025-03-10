import { useState } from "react";

import WebContent from "./components/WebContnet";
import { WebSearchContext } from "./context/WebSearchContext";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [urlNewList, setUrlNewList] = useState([]);

  return (
    <WebSearchContext.Provider
      value={{
        setUrlNewList,
        searchKeyword,
        setSearchKeyword,
      }}
    >
      <WebContent urlNewList={urlNewList} />
    </WebSearchContext.Provider>
  );
}

export default App;

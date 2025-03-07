import { useEffect, useState } from "react";

import { WebSearchContext } from "../context/WebSearchContext";
import WebBottomContent from "./webBottomContent/WebBottomContent";
import WebTopContent from "./webTopContent/WebTopContent";

function WebContent() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [urlNewList, setUrlNewList] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="w-full h-dvh bg-gray-200">
      <WebSearchContext.Provider
        value={{
          setUrlNewList,
          searchKeyword,
          setSearchKeyword,
        }}
      >
        <WebTopContent urlNewList={urlNewList} />
        <WebBottomContent urlNewList={urlNewList} />
      </WebSearchContext.Provider>
    </div>
  );
}

export default WebContent;

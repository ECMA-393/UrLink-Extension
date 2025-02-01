import { useState } from "react";

import ExtensionContext from "../context/ExtensionContext";
import useFetchUrlContent from "../hooks/useFetchUrlContent";
import ExtensionBottomContent from "./extensionBottomContent/ExtensionBottomContent";
import ExtensionTopContent from "./extensionTopContent/extensionTopContent";

function ExtensionContent({ urlNewList }) {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyword, setKeyword, isLoading, error] = useFetchUrlContent(
    setBookmarkList,
    urlNewList
  );

  const handleStartSearch = () => {
    if (!isLoading) {
      setKeyword(searchKeyword);
    }
  };

  return (
    <ExtensionContext.Provider
      value={{
        bookmarkList,
        setBookmarkList,
        handleStartSearch,
        keyword,
        searchKeyword,
        setSearchKeyword,
      }}
    >
      <ExtensionTopContent />
      {isLoading ? <h1>로딩 중입니다.</h1> : <ExtensionBottomContent />}
      {error && <h1>{error}</h1>}
    </ExtensionContext.Provider>
  );
}

export default ExtensionContent;

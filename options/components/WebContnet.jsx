import { useState } from "react";

import { WebSearchContext } from "../context/WebSearchContext";
import useFetchKeywordSearchList from "../hooks/useFetchKeywordSearchData";
import WebBottomContent from "./webBottomContent/WebBottomContent";
import WebTopContent from "./webTopContent/WebTopContent";

function WebContent({ urlNewList }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [bookmarkList, setBookmarkList] = useState([]);
  const [
    setKeyword,
    isLoading,
    error,
    hasSearchResult,
    setHasSearchResult,
    keyword,
  ] = useFetchKeywordSearchList(setBookmarkList, urlNewList);

  const handleStartSearch = () => {
    if (!isLoading) {
      setKeyword(searchKeyword);
    }
  };

  const handleOnClickReset = () => {
    if (!isLoading) {
      setKeyword("");
      setSearchKeyword("");
      setHasSearchResult(false);
    }
  };

  return (
    <div className="w-full h-dvh bg-gray-200">
      <WebSearchContext.Provider
        value={{
          bookmarkList,
          setBookmarkList,
          searchKeyword,
          setSearchKeyword,
          handleStartSearch,
          handleOnClickReset,
          hasSearchResult,
          setHasSearchResult,
          isLoading,
          keyword,
        }}
      >
        <WebTopContent urlNewList={urlNewList} />
        {isLoading ? (
          <h1 className="w-full h-[calc(100vh-200px)] overflow-hidden lg:max-w-5xl lg:px-0 md:max-w-screen-md sm:max-w-screen-sm px-2 mx-auto my-0">
            로딩 중입니다.
          </h1>
        ) : (
          <WebBottomContent urlNewList={urlNewList} />
        )}
        {error && <h1>{error}</h1>}
      </WebSearchContext.Provider>
    </div>
  );
}

export default WebContent;

import { useState } from "react";

import { WebSearchContext } from "../context/WebSearchContext";
import useFetchKeywordSearchList from "../hooks/useFetchKeywordSearchData";
import WebBottomContent from "./webBottomContent/WebBottomContent";
import WebTopContent from "./webTopContent/WebTopContent";

function WebContent({ urlNewList }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [bookmarkList, setBookmarkList] = useState([]);
  const [setKeyword, isLoading, error, hasSearchResult, setHasSearchResult] =
    useFetchKeywordSearchList(setBookmarkList, urlNewList);

  chrome.storage.onChanged.addListener((changes) => {
    for (const [key, { newValue }] of Object.entries(changes)) {
      if (key === "bookmarkList") {
        setBookmarkList(newValue.searchResultList);
        setSearchKeyword(newValue.keyword);
        break;
      }
    }
  });

  const data = chrome.storage.session.get(["bookmarkList"]);
  data.then((res) => {
    if (Object.keys(res).length !== 0) {
      setBookmarkList(res.bookmarkList.searchResultList);
      setSearchKeyword(res.bookmarkList.keyword);
    }
  });

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
        }}
      >
        <WebTopContent urlNewList={urlNewList} />
        {isLoading ? (
          <h1 className="w-full h-[calc(100vh-200px)] overflow-hidden max-w-5xl mx-auto my-0">
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

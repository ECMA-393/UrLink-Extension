import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import { WebSearchContext } from "../context/WebSearchContext";

export default function WebSideSearchHistory() {
  const MAX_RETRY_ATTEMPTS = 3;

  const { sortedHistory, refreshHistory, setSortedHistory } =
    useContext(WebSearchContext);
  const deleteFromChromeStorage = (keyword, attempt = 1) => {
    chrome.storage.local.remove(keyword, () => {
      if (chrome.runtime.lastError) {
        console.error(
          `삭제 오류 (시도 ${attempt}): ${chrome.runtime.lastError.message}`
        );
        if (attempt < MAX_RETRY_ATTEMPTS) {
          setTimeout(() => {
            deleteFromChromeStorage(keyword, attempt + 1);
          }, 2000);
        } else {
          console.error(`${keyword}의 최대 재시도 횟수를 초과했습니다.`);
        }
      } else {
        refreshHistory();
      }
    });
  };

  const handleDeleteAndSortHistory = (keyword) => {
    const deleteAndSortHistory = sortedHistory.filter(
      (innerData) => innerData.keyword !== keyword
    );
    setSortedHistory(deleteAndSortHistory);
    deleteFromChromeStorage(keyword);
  };

  return (
    <div className="w-[300px] p-5">
      <h2 className="mb-5 font-bold">Extension Search History</h2>
      <SearchHistoryBox
        sortedHistory={sortedHistory}
        handleDeleteAndSortHistory={handleDeleteAndSortHistory}
      />
    </div>
  );
}

function SearchHistoryBox({ sortedHistory, handleDeleteAndSortHistory }) {
  const { setFilteredData, setReSearchKeyword, setSearchedList } =
    useContext(WebSearchContext);

  const handleShowHistorySearchData = (keyword, innerData) => {
    setReSearchKeyword(keyword);
    setFilteredData(innerData);
    setSearchedList([keyword]);
  };

  return (
    <>
      {sortedHistory.map((innerData, index) => (
        <div
          className="w-full bg-white mb-3 px-3 py-2 rounded-lg relative cursor-pointer"
          key={index}
          onClick={() =>
            handleShowHistorySearchData(innerData.keyword, innerData)
          }
        >
          <span
            className="absolute top-[10px] right-[10px] text-red-600"
            onClick={() => handleDeleteAndSortHistory(innerData.keyword)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </span>
          <h5>
            <span>검색어: </span>
            <span className="font-bold text-blue-800">
              {" "}
              {innerData.keyword}
            </span>
          </h5>
          <p>
            검색 결과:{" "}
            <span className="font-bold">{innerData.data.length}</span> 건
          </p>
        </div>
      ))}
      {sortedHistory.length === 0 && <p>검색 내역이 없습니다.</p>}
    </>
  );
}

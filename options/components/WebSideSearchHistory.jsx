import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import { WebSearchContext } from "../context/WebSearchContext";

export default function WebSideSearchHistory() {
  const { sortedHistory, setSortedHistory } = useContext(WebSearchContext);

  const deleteFromChromeStorage = (keyword) => {
    chrome.storage.local.remove(keyword);
  };

  const hendleDeleteAndSortHistory = (keyword) => {
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
        hendleDeleteAndSortHistory={hendleDeleteAndSortHistory}
      />
    </div>
  );
}

function SearchHistoryBox({ sortedHistory, hendleDeleteAndSortHistory }) {
  return (
    <>
      {sortedHistory.map((innerData, index) => (
        <div
          className="w-full bg-white mb-3 px-3 py-2 rounded-lg relative cursor-pointer"
          key={index}
        >
          <span
            className="absolute top-[10px] right-[10px] text-red-600"
            onClick={() => hendleDeleteAndSortHistory(innerData.keyword)}
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
    </>
  );
}

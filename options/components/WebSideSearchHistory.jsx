import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import { WebSearchContext } from "../context/WebSearchContext";

export default function WebSideSearchHistory() {
  const { sortedHistory } = useContext(WebSearchContext);

  return (
    <div className="w-[300px] p-5">
      <h2 className="mb-5 font-bold">Extension Search History</h2>
      <SearchHistoryBox sortedHistory={sortedHistory} />
    </div>
  );
}

function SearchHistoryBox({ sortedHistory }) {
  return (
    <>
      {sortedHistory.map((innerData, index) => (
        <div
          className="w-full bg-white mb-3 px-3 py-2 rounded-lg relative cursor-pointer"
          key={index}
        >
          <span className="absolute top-[10px] right-[10px] text-red-600">
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

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";

import { WebSearchContext } from "../../../context/WebSearchContext";

export default function WebKeywordSearchBox() {
  const { reSearchKeyword, setReSearchKeyword, filteredData, setFilteredData } =
    useContext(WebSearchContext);
  const [userInputText, setUserInputText] = useState(reSearchKeyword);

  useEffect(() => {
    setUserInputText(reSearchKeyword);
  }, [reSearchKeyword]);

  const handleChangeReSearchKeyword = (event) => {
    setUserInputText(event.target.value);
  };

  const handleReSearchResults = () => {
    setReSearchKeyword(userInputText);

    const copiedData = JSON.parse(JSON.stringify(filteredData.data));
    const historyArray = [];
    const seenUrls = new Set();

    copiedData.forEach((innerData) => {
      Object.values(innerData).forEach((data) => {
        const match = data.urlAllText.some((text) =>
          text.includes(userInputText)
        );
        if (match && !seenUrls.has(data.url)) {
          seenUrls.add(data.url);
          historyArray.push({ [data.url]: data });
        }
      });
    });

    const reTimestamp = new Date().getTime();
    const item = {
      keyword: userInputText,
      data: historyArray,
      maxTimestamp: reTimestamp,
    };
    setFilteredData(item);
  };

  const handleEnterSearch = (event) => {
    if (event.key === "Enter") {
      handleReSearchResults();
    }
  };

  return (
    <div>
      <h2 className="me-5 mb-5 font-bold">
        <span>Urlink ::</span>
        <span>WEB VIEW</span>
      </h2>
      <p className="relative flex-1 h-10 rounded-lg bg-black text-white flex">
        <label
          className="absolute left-0 -z-50 invisible"
          htmlFor="search-type"
        >
          검색 창
        </label>
        <input
          className="bg-transparent ps-3 h-10 text-sm placeholder-white grow outline-none"
          name="searchBox"
          type="text"
          value={userInputText}
          onChange={handleChangeReSearchKeyword}
          onKeyDown={handleEnterSearch}
          placeholder="키워드를 입력해 주세요."
        />
        <SearchOptionButton
          iconType={faMagnifyingGlass}
          onClickEvent={handleReSearchResults}
        />
      </p>
    </div>
  );
}

function SearchOptionButton({ iconType, onClickEvent }) {
  return (
    <button
      className="w-[40px] h-10 bg-transparent text-white text-center"
      type="button"
      onClick={onClickEvent}
    >
      <FontAwesomeIcon icon={iconType} />
    </button>
  );
}

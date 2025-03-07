import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import { WebSearchContext } from "../../../context/WebSearchContext";

export default function WebKeywordSearchBox({ urlNewList }) {
  return (
    <div className="flex">
      <WebSearchBox urlNewList={urlNewList} />
    </div>
  );
}

function WebSearchBox() {
  const {
    searchKeyword,
    setSearchKeyword,
    handleStartSearch,
    handleOnClickReset,
  } = useContext(WebSearchContext);

  const handleOnkeyDownSearchValue = (event) => {
    if (event.key === "Enter") {
      handleStartSearch();
    }
    setSearchKeyword(event.currentTarget.value);
  };

  const handleOnChangeSearchValue = (event) => {
    setSearchKeyword(event.currentTarget.value);
  };

  return (
    <p className="relative flex-1 h-10 rounded-lg bg-black text-white flex">
      <label
        className="absolute left-0 -z-50 invisible"
        htmlFor="search-type"
      >
        검색 창
      </label>
      <SearchOptionButton
        iconType={faMagnifyingGlass}
        onClick={handleStartSearch}
      />
      <input
        className="bg-transparent h-10 text-sm placeholder-white grow outline-none"
        name="searchBox"
        type="text"
        value={searchKeyword}
        onKeyDown={handleOnkeyDownSearchValue}
        onChange={handleOnChangeSearchValue}
        placeholder="키워드를 입력해 주세요."
      />
      <SearchOptionButton
        iconType={faRotate}
        onClick={handleOnClickReset}
      />
    </p>
  );
}

function SearchOptionButton({ iconType, onClick }) {
  return (
    <button
      className="w-[40px] h-10 bg-transparent text-white text-center"
      type={iconType === "faRotate" ? "reset" : ""}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={iconType} />
    </button>
  );
}

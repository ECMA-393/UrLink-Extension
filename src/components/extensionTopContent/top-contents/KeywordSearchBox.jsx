import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import ExtensionContext from "../../../context/ExtensionContext";

export default function KeywordSearchBox() {
  const {
    urlNewList,
    setBookmarkList,
    handleStartSearch,
    searchKeyword,
    setSearchKeyword,
  } = useContext(ExtensionContext);

  const handleInputText = (event) => {
    if (event.key === "Enter") {
      handleStartSearch();
    }
    setSearchKeyword(event.currentTarget.value);
  };

  const handleResetClick = () => {
    setSearchKeyword("");
    setBookmarkList(urlNewList);
  };

  return (
    <div className="w-full h-10 rounded-full bg-white/[.5] text-white flex">
      <input
        className="pl-4 bg-transparent h-10 text-sm placeholder-white grow outline-none"
        value={searchKeyword}
        onChange={(event) => {
          handleInputText(event);
        }}
        onKeyDown={(event) => {
          handleInputText(event);
        }}
        type="text"
        placeholder="키워드를 입력해 주세요."
      />
      <button
        className="w-4 text-base"
        onClick={handleResetClick}
      >
        <FontAwesomeIcon icon={faRotate} />
      </button>
      <button
        className="w-12 text-base"
        onClick={handleStartSearch}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

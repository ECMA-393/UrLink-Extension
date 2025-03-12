import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";

import {
  MODE_DESCRIPTION,
  MODE_EXPECT_CRAWLING_TIME,
  SEARCH_MODE,
} from "../../../constants/constants";
import ExtensionContext from "../../../context/ExtensionContext";

export default function KeywordSearchBox({
  isLoading,
  inputKeyword,
  setInputKeyword,
}) {
  const [isSelectShow, setIsSelectShow] = useState(false);
  const { allBookmarkList, searchMode, setSearchMode, setSearchKeyword } =
    useContext(ExtensionContext);

  const handleInputKeyword = (event) => {
    if (isLoading) {
      return;
    }

    setInputKeyword(event.currentTarget.value);
  };

  const handleEnterSearch = (event) => {
    if (isLoading) {
      return;
    }

    if (event.key === "Enter") {
      setSearchKeyword(inputKeyword);
    }
  };

  const handleClickSearch = () => {
    setSearchKeyword(inputKeyword);
  };

  const handleClickReset = () => {
    setInputKeyword("");
    setSearchKeyword("");
  };

  const handleSearchModeChange = (event) => {
    setSearchMode(event.currentTarget.dataset.mode);
    setSearchKeyword("");
  };

  const handleToggleSelectBox = () => {
    if (isLoading) {
      return;
    }

    setIsSelectShow((isSelectShow) => !isSelectShow);
  };

  return (
    <div className="w-full h-10 rounded-full bg-[#808080] text-white flex">
      <div
        className="relative w-40 pl-4 bg-transparent flex items-center h-10 text-sm outline-none cursor-pointer"
        onClick={handleToggleSelectBox}
      >
        <span className="w-[80%]">{searchMode}</span>
        <span className="w-[20%]">&#9660;</span>
        <ul
          className={`${isSelectShow || "hidden"} absolute bg-black px-2 text-white bottom-[-200px] left-2`}
        >
          {Object.values(SEARCH_MODE).map((mode, index) => {
            return (
              <li
                key={index}
                className="w-full p-2 hover:bg-gray-500 inline-block whitespace-nowrap"
                data-mode={mode}
                onClick={handleSearchModeChange}
              >
                <p className="py-1">{mode}</p>
                <p className="text-xs">{`${MODE_DESCRIPTION[mode]}${MODE_EXPECT_CRAWLING_TIME[mode] * allBookmarkList.length}초`}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <input
        className="w-50 pl-4 bg-transparent h-10 text-sm placeholder-white grow outline-none"
        type="text"
        value={inputKeyword}
        onChange={handleInputKeyword}
        onKeyDown={handleEnterSearch}
        placeholder="키워드를 입력해 주세요."
      />
      <div className="w-20 flex justify-center">
        <button
          className={`${isLoading && "hidden"} w-4 text-base`}
          onClick={handleClickReset}
        >
          <FontAwesomeIcon icon={faRotate} />
        </button>
        <button
          className={`${isLoading && "hidden"} w-12 text-base`}
          onClick={handleClickSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
}

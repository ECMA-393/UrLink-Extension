import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import { SEARCH_MODE } from "../../../constants/constants";
import ExtensionContext from "../../../context/ExtensionContext";

export default function KeywordSearchBox({
  isLoading,
  inputKeyword,
  setInputKeyword,
}) {
  const { setSearchMode, setSearchKeyword } = useContext(ExtensionContext);

  const handleInputKeyword = (event) => {
    if (isLoading) {
      return;
    }

    setInputKeyword(event.currentTarget.value);
  };

  const handleEnterSearch = (event) => {
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
    setSearchMode(event.currentTarget.value);
    setSearchKeyword("");
  };

  return (
    <div className="w-full h-10 rounded-full bg-white/[.5] text-white flex">
      <select
        defaultValue={SEARCH_MODE.CONTENT}
        className="w-30 pl-4 bg-transparent h-10 text-sm placeholder-white grow outline-none"
        onChange={handleSearchModeChange}
        disabled={isLoading}
      >
        <option value={SEARCH_MODE.CONTENT}>내용</option>
        <option value={SEARCH_MODE.TITLE}>제목</option>
        <option value={SEARCH_MODE.ALL}>제목+내용</option>
      </select>
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

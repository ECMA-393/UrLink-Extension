import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";

import ExtensionContext from "../../../context/ExtensionContext";

export default function KeywordSearchBox({ isLoading }) {
  const { setSearchKeyword } = useContext(ExtensionContext);
  const [inputKeyword, setInputKeyword] = useState("");

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

  return (
    <div className="w-full h-10 rounded-full bg-white/[.5] text-white flex">
      <input
        className="pl-4 bg-transparent h-10 text-sm placeholder-white grow outline-none"
        type="text"
        value={inputKeyword}
        onChange={handleInputKeyword}
        onKeyDown={handleEnterSearch}
        placeholder="키워드를 입력해 주세요."
      />
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
  );
}

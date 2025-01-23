import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import ExtensionContext from "../../../context/ExtensionContext";

export default function KeywordSearchBox() {
  const { handleStartSearch, searchKeyword, setSearchKeyword } =
    useContext(ExtensionContext);

  const handleInputText = (event) => {
    if (event.key === "Enter") {
      handleStartSearch();
    }
    setSearchKeyword(event.currentTarget.value);
  };

  const handleXmarkClick = () => {
    setSearchKeyword("");
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
        className="w-4 text-2xl"
        onClick={handleXmarkClick}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <button
        className="w-12 text-lg"
        onClick={handleStartSearch}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

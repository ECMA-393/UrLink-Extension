import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import { WebSearchContext } from "../../../context/WebSearchContext";

export default function WebKeywordSearchBox() {
  const { searchValue } = useContext(WebSearchContext);

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
        <SearchOptionButton iconType={faMagnifyingGlass} />
        <input
          className="bg-transparent h-10 text-sm placeholder-white grow outline-none"
          name="searchBox"
          type="text"
          defaultValue={searchValue}
          placeholder="키워드를 입력해 주세요."
        />
        <SearchOptionButton iconType={faRotate} />
      </p>
    </div>
  );
}

function SearchOptionButton({ iconType }) {
  return (
    <button
      className="w-[40px] h-10 bg-transparent text-white text-center"
      type={iconType === "faRotate" ? "reset" : ""}
    >
      <FontAwesomeIcon icon={iconType} />
    </button>
  );
}

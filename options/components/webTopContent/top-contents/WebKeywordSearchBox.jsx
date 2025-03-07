import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WebKeywordSearchBox({ urlNewList }) {
  return (
    <div className="flex">
      <WebSearchBox urlNewList={urlNewList} />
    </div>
  );
}

function WebSearchBox() {
  return (
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
        placeholder="키워드를 입력해 주세요."
      />
      <SearchOptionButton iconType={faRotate} />
    </p>
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

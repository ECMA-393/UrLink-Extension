import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

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

function WebSelectBox() {
  const [currentValue, setCurrentValue] = useState("키워드 검색");
  const [isShowOptions, setIsShowOptions] = useState(false);

  const handleOnChangeSelectToggle = () => {
    return setIsShowOptions(!isShowOptions);
  };

  const handleOnChangeSelectValue = (e) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
  };

  return (
    <div
      className={
        "relative w-[200px] h-10 px-[8px] me-3 rounded-lg bg-black cursor-pointer text-white after:content-['⌵'] after:absolute after:top-1 after:right-3"
      }
      onClick={() => handleOnChangeSelectToggle()}
    >
      <label className=" text-sm leading-10">{currentValue}</label>
      <ul
        className={
          isShowOptions === false
            ? "absolute overflow-hidden list-none left-0 w-full max-h-[0px]"
            : "absolute overflow-hidden list-none rounded-b-lg top-[35px] left-0 w-full h-[108px] max-h-none bg-black text-white text-sm"
        }
      >
        <li
          className="px-[6px] py-[8px] ease-out duration-200"
          onClick={handleOnChangeSelectValue}
        >
          키워드 검색
        </li>
        <li
          className="px-[6px] py-[8px]"
          onClick={handleOnChangeSelectValue}
        >
          제목 검색
        </li>
        <li
          className="px-[6px] py-[8px]"
          onClick={handleOnChangeSelectValue}
        >
          제목 + 키워드 검색
        </li>
      </ul>
    </div>
  );
}
export default function WebKeywordSearchBox() {
  return (
    <div className="flex">
      <WebSelectBox />
      <WebSearchBox />
    </div>
  );
}

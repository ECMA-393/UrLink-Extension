import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";

import { WebSearchContext } from "../../../context/WebSearchContext";

export default function WebKeywordSearchBox({ urlNewList }) {
  const {
    userSelectSearchValue,
    setUserSelectSearchValue,
    SELECT_VALUE_STATE,
  } = useContext(WebSearchContext);

  return (
    <div className="flex">
      <WebSelectBox
        selectData={SELECT_VALUE_STATE}
        setUserSelectSearchValue={setUserSelectSearchValue}
        userSelectSearchValue={userSelectSearchValue}
      />
      <WebSearchBox urlNewList={urlNewList} />
    </div>
  );
}

function WebSelectBox({
  selectData,
  setUserSelectSearchValue,
  userSelectSearchValue,
}) {
  const [isShowOptions, setIsShowOptions] = useState(false);

  const handleOnChangeSelectToggle = () => {
    return setIsShowOptions(!isShowOptions);
  };

  const handleOnChangeSelectValue = (event) => {
    const { innerText } = event.target;
    setUserSelectSearchValue(innerText);
  };

  return (
    <div
      className={
        "relative w-[200px] h-10 px-[8px] me-3 rounded-lg bg-black cursor-pointer text-white after:content-['⌵'] after:absolute after:top-2 after:right-3"
      }
      onClick={() => handleOnChangeSelectToggle()}
    >
      <label className=" text-sm leading-10">{userSelectSearchValue}</label>
      <div
        className={
          isShowOptions === false
            ? "hidden"
            : "block absolute overflow-hidden list-none rounded-b-lg top-[35px] left-0 w-full h-[108px] max-h-none bg-black text-white text-sm"
        }
      >
        <div>
          {selectData.map((data, index) => (
            <button
              className="block w-full px-[6px] py-[8px] ease-out duration-200 hover:bg-gray-600"
              key={index}
              value={data}
              onClick={handleOnChangeSelectValue}
            >
              {data}
            </button>
          ))}
        </div>
      </div>
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

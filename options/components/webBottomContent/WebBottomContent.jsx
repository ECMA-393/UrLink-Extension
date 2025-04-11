import { useContext } from "react";

import { WebSearchContext } from "../../context/WebSearchContext";

export default function WebBottomContent() {
  const { filteredData, searchKeyword, sortedHistory, reSearchKeyword } =
    useContext(WebSearchContext);

  let changeArrayFilteredData = [];
  if (filteredData.data) {
    changeArrayFilteredData = Object.values(filteredData.data);
  }
  const userSearchKeyword = reSearchKeyword ? reSearchKeyword : searchKeyword;

  const flattenedItems = changeArrayFilteredData.map(
    (itemObj) => Object.values(itemObj)[0]
  );
  const totalCount = changeArrayFilteredData.length || 0;

  return (
    <div className="w-full h-[calc(100vh-200px)] overflow-hidden lg:max-w-5xl lg:px-0 md:max-w-screen-md sm:max-w-screen-sm px-2 min-w-[560px]">
      {totalCount > 0 && (
        <p className="pb-2">
          총 <span className="font-bold">{totalCount}</span> 개의 결과가 검색
          되었습니다.
        </p>
      )}
      <div className="w-full overflow-y-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
        {flattenedItems.map((innerData, index) => (
          <a
            href={innerData.url}
            target="_blank"
            className="p-3 bg-white rounded-lg"
            key={index}
          >
            <h5 className="truncate font-bold pb-2 border-b">
              {innerData.title}
            </h5>
            <p className="truncate pt-2">
              {innerData.urlText
                .split(userSearchKeyword)
                .map((innerItem, index) => {
                  if (innerItem === "") {
                    return;
                  }
                  return (
                    <span key={index}>
                      {index > 0 && (
                        <span className="bg-blue-800 rounded-lg px-1 inline-block text-white mx-px">
                          {userSearchKeyword}
                        </span>
                      )}
                      {innerItem}
                    </span>
                  );
                })}
            </p>
          </a>
        ))}
      </div>
      {sortedHistory.length === 0 && (
        <div className="w-full text-center">
          <p>
            저장된 검색내역이 없어요. UrLink 익스텐션에서 먼저 검색해보세요!
          </p>
        </div>
      )}
    </div>
  );
}

import { useContext } from "react";

import { WebSearchContext } from "../../context/WebSearchContext";

export default function WebBottomContent() {
  const { filteredData, searchKeyword } = useContext(WebSearchContext);
  const changeArrayFilteredData = Object.values(filteredData);

  const flattenedItems = changeArrayFilteredData.flatMap((itemObj) =>
    Object.values(itemObj).map((item) => Object.values(item)[0])
  );
  const totalCount = flattenedItems.length;

  return (
    <div className="w-full h-[calc(100vh-200px)] overflow-hidden lg:max-w-5xl lg:px-0 md:max-w-screen-md sm:max-w-screen-sm px-2">
      <p className="pb-2">
        총 <span className="font-bold">{totalCount}</span> 개의 결과가 검색
        되었습니다.
      </p>
      <div className="w-full overflow-y-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
        {flattenedItems.map((innerData, index) => (
          <div
            className="px-3 py-2 bg-white rounded-lg"
            key={index}
          >
            <h5 className="truncate font-bold mb-3">{innerData.title}</h5>
            <p className="truncate">
              {innerData.urlText
                .split(searchKeyword)
                .map((innerItem, index) => {
                  if (innerItem === "") {
                    return;
                  }
                  return (
                    <span key={index}>
                      {index > 0 && (
                        <span className="bg-blue-800 rounded-lg px-1 inline-block text-white mx-px">
                          {searchKeyword}
                        </span>
                      )}
                      {innerItem}
                    </span>
                  );
                })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

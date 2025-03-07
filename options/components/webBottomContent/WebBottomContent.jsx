import { useContext } from "react";

import { WebSearchContext } from "../../context/WebSearchContext";

export default function WebBottomContent() {
  return (
    <div className="w-full h-[calc(100vh-200px)] overflow-hidden lg:max-w-5xl lg:px-0 md:max-w-screen-md sm:max-w-screen-sm px-2 mx-auto my-0">
      <WebUrlNewList />
    </div>
  );
}

function WebUrlNewList() {
  const { bookmarkList } = useContext(WebSearchContext);

  function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "32");
    return url.toString();
  }

  return (
    <div className="w-full overflow-y-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
      {bookmarkList.map((url, index) => (
        <div
          className="w-full min-h-10 flex bg-white rounded-lg p-3 hover:bg-gray-300 hover:shadow-lg duration-100"
          key={index}
        >
          <a
            className="w-full max-w-[calc(100%-0px)] flex-grow overflow-hidden text-ellipsis whitespace-nowrap font-bold"
            href={`${url.url}`}
            target="_blank"
          >
            <img
              className="mr-2 inline-block w-3 h-3"
              src={faviconURL(url.url)}
            />
            <HighlightTitleKeyword url={url} />
          </a>
        </div>
      ))}
    </div>
  );
}

function HighlightTitleKeyword({ url }) {
  const { keyword } = useContext(WebSearchContext);

  return (
    <>
      {url.title.split(keyword).map((item, index) => {
        if (index === 0 && !item) {
          return null;
        } else if (index === 0 && item) {
          return <span key={index}>{item}</span>;
        } else {
          return (
            <span key={index}>
              <span className="text-blue-600 font-bold px-1 inline-block mx-px">
                {keyword}
              </span>
              {item}
            </span>
          );
        }
      })}
    </>
  );
}

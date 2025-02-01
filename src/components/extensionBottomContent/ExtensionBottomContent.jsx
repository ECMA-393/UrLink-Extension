import { useContext } from "react";

import ExtensionContext from "../../context/ExtensionContext";

function UrlBox() {
  const { bookmarkList } = useContext(ExtensionContext);

  function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "32");
    return url.toString();
  }

  return (
    <li className="h-4">
      {bookmarkList.map((url, index) => {
        return (
          <>
            <div
              className="p-3 bg-white hover:bg-gray-200 flex items-center"
              key={index}
            >
              <a
                className="max-w-[calc(100%-10px)] flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
                href={`${url.url}`}
                target="_blank"
              >
                <img
                  className="mr-2 inline-block w-3 h-3"
                  src={faviconURL(url.url)}
                />
                {url.title}
              </a>
            </div>
            {url.urlText && <hr className="ml-3 w-[95%]" />}
            {url.urlText && <HighlightKeyword url={url} />}
          </>
        );
      })}
    </li>
  );
}

export default function ExtensionBottomContent() {
  return (
    <ul className="mt-[7rem] overflow-y-scroll h-[calc(100vh-7rem)]">
      <UrlBox />
    </ul>
  );
}

function HighlightKeyword({ url }) {
  const { keyword } = useContext(ExtensionContext);

  return (
    <div
      className={
        "ml-3 mt-1 mb-2 font-normal w-full max-w-[calc(100%-0px)] overflow-hidden text-ellipsis whitespace-nowrap"
      }
    >
      {url.urlText.split(keyword).map((item, index) => {
        if (index === 0 && !item) {
          return null;
        } else if (index === 0 && item) {
          return <span key={index}>{item}</span>;
        } else {
          return (
            <span key={index}>
              <span className="bg-blue-800 rounded-lg px-1 inline-block text-white mx-px">
                {keyword}
              </span>
              {item}
            </span>
          );
        }
      })}
    </div>
  );
}

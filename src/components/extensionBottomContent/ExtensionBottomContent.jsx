import { useContext } from "react";

import ExtensionContext from "../../context/ExtensionContext";

function BookmarkBox({ bookmark }) {
  function faviconURL(urlOfFavicon) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", urlOfFavicon);
    url.searchParams.set("size", "32");
    return url.toString();
  }

  return (
    <li>
      <div className="p-3 bg-white hover:bg-gray-200 flex items-center">
        <a
          className="max-w-[calc(100%-10px)] flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
          href={`${bookmark.url}`}
          target="_blank"
        >
          <img
            className="mr-2 inline-block w-3 h-3"
            src={faviconURL(bookmark.url)}
          />
          {bookmark.title}
        </a>
      </div>
      {bookmark.urlText && <hr className="ml-3 w-[95%]" />}
      {bookmark.urlText && <HighlightKeyword bookmark={bookmark} />}
    </li>
  );
}

export default function ExtensionBottomContent({ isLoading }) {
  const { searchBookmarkList } = useContext(ExtensionContext);

  return (
    <ul className="mt-[7rem] overflow-y-auto h-[calc(100vh-7rem)] flex flex-col">
      {searchBookmarkList.map((bookmark, index) => (
        <BookmarkBox
          key={index}
          bookmark={bookmark}
          index={index}
        />
      ))}
      {isLoading && (
        <div className="w-full h-full bg-gray-400 animate-pulse"></div>
      )}
    </ul>
  );
}

function HighlightKeyword({ bookmark }) {
  const { searchKeyword } = useContext(ExtensionContext);

  return (
    <div className="ml-3 mt-1 mb-2 font-normal w-full max-w-[calc(95%-0px)] overflow-hidden text-ellipsis whitespace-nowrap">
      {bookmark.urlText.split(searchKeyword).map((item, index) => {
        if (item === "") {
          return;
        }

        return (
          <span key={index}>
            {index > 0 && (
              <span className="bg-blue-800 rounded-lg px-1 inline-block text-white mx-px">
                {searchKeyword}
              </span>
            )}
            {item}
          </span>
        );
      })}
    </div>
  );
}

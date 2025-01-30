import { useContext } from "react";

import { WebSearchContext } from "../../context/WebSearchContext";

export default function WebBottomContent() {
  return (
    <div className="w-full h-[calc(100vh-200px)] overflow-hidden max-w-5xl mx-auto my-0">
      <WebUrlNewList />
    </div>
  );
}

function WebUrlNewList() {
  const { bookmarkList } = useContext(WebSearchContext);

  return (
    <div className="w-full h-[calc(100vh-200px)] overflow-y-auto">
      {bookmarkList.map((url, index) => (
        <div
          className="w-full flex"
          key={index}
        >
          <a
            className="w-full max-w-[calc(100%-10px)] flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
            href={`${url.url}`}
            target="_blank"
          >
            {url.title}
          </a>
        </div>
      ))}
    </div>
  );
}

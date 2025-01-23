/* global chrome */
function UrlBox({ urlNewList }) {
  function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "32");
    return url.toString();
  }

  return (
    <li className="h-4">
      {urlNewList.map((url, index) => {
        return (
          <div
            className="p-3 bg-white hover:bg-gray-200 flex items-center"
            key={index}
          >
            <a
              className="max-w-[300px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
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
        );
      })}
    </li>
  );
}

export default function ExtensionBottomContent({ urlNewList }) {
  return (
    <ul className="mt-[140px] overflow-y-scroll h-[calc(100vh-140px)]">
      <UrlBox urlNewList={urlNewList} />
    </ul>
  );
}

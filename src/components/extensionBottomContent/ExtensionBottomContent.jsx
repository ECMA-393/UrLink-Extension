/* global chrome */
function UrlBox({ urlNewList }) {
  function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "32");
    return url.toString();
  }

  return (
    <li>
      {urlNewList.map((url, index) => {
        return (
          <div
            className="flex h-4 m-3"
            key={index}
          >
            <img
              src={faviconURL(url.url)}
              href={`${url.url}`}
              className="mr-2"
            />
            <a
              href={`${url.url}`}
              target="_blank"
              className="block max-w-[300px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
            >
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
    <ul className="p-3 overflow-y-scroll">
      <UrlBox urlNewList={urlNewList} />
    </ul>
  );
}

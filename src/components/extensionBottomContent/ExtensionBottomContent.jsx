function UrlBox({ urlNewList }) {
  return (
    <li>
      {urlNewList.map((url, index) => {
        return (
          <a
            href={`${url.url}`}
            target="_blank"
            key={index}
            className="block"
          >
            {url.title}
          </a>
        );
      })}
    </li>
  );
}

export default function ExtensionBottomContent({ urlNewList }) {
  return (
    <ul className="p-3 w-full h-20">
      <UrlBox urlNewList={urlNewList} />
    </ul>
  );
}

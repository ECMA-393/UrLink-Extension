import { useContext } from "react";

import UrlInfoContext from "../../context/UrlInfoContext";

function UrlBox() {
  const [urlNewList] = useContext(UrlInfoContext);

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

export default function ExtensionBottomContent() {
  return (
    <ul className="p-3 w-full h-20">
      <UrlBox />
    </ul>
  );
}

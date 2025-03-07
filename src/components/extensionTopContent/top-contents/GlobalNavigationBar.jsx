import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import ExtensionContext from "../../../context/ExtensionContext";

export default function GlobalNavigationBar() {
  const { searchBookmarkList } = useContext(ExtensionContext);

  const handleOnClickOpenOptionPage = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    }
  };

  return (
    <div className="w-full text-white flex mb-3 items-center">
      <p className="grow">
        <span className="text-2xl">{searchBookmarkList.length}</span>
        <span className="text-sm">개의 북마크</span>
      </p>
      <div className="flex text-white">
        <button className="w-8 text-lg">
          <FontAwesomeIcon
            icon={faDesktop}
            onClick={handleOnClickOpenOptionPage}
          />
        </button>
      </div>
    </div>
  );
}

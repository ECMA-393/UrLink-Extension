import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import ExtensionContext from "../../../context/ExtensionContext";

function GnbButton({ iconShapeType, onClick }) {
  return (
    <button className="w-8 text-lg">
      <FontAwesomeIcon
        icon={iconShapeType}
        onClick={onClick}
      />
    </button>
  );
}

export default function GlobalNavigationBar() {
  const { bookmarkList } = useContext(ExtensionContext);

  const hendleOnClickOpenOptionPage = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL("options.html"));
    }
  };

  return (
    <div className="w-full text-white flex mb-3 items-center">
      <p className="grow">
        <span className="text-2xl">{bookmarkList.length}</span>
        <span className="text-sm">개의 북마크</span>
      </p>
      <div className="flex text-white">
        <GnbButton
          iconShapeType={faDesktop}
          onClick={hendleOnClickOpenOptionPage}
        />
      </div>
    </div>
  );
}

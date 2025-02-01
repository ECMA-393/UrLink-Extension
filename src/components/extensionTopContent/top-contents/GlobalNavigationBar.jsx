import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import ExtensionContext from "../../../context/ExtensionContext";

export default function GlobalNavigationBar() {
  const { bookmarkList, isLoading } = useContext(ExtensionContext);

  const handleOnClickOpenOptionPage = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    }
  };

  return (
    <div className="w-full text-white flex mb-3 items-center">
      <p className="grow">
        <span className="text-2xl">{!isLoading && bookmarkList.length}</span>
        <span className="text-sm">
          {isLoading ? "검색 중 입니다." : "개의 북마크"}
        </span>
      </p>
      <div className="flex text-white">
        <GnbButton
          iconShapeType={faDesktop}
          onClick={handleOnClickOpenOptionPage}
        />
      </div>
    </div>
  );
}

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

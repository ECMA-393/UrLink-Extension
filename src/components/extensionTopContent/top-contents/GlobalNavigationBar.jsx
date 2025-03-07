import { faLaptopMedical, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import ExtensionContext from "../../../context/ExtensionContext";

export default function GlobalNavigationBar({ isLoading }) {
  const { searchBookmarkList } = useContext(ExtensionContext);

  const handleOnClickOpenOptionPage = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    }
  };
  <FontAwesomeIcon
    icon={faSpinner}
    className="animate-spin"
  />;
  return (
    <div className="w-full text-white flex mb-3 items-center">
      <p className="grow">
        {isLoading && (
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin"
          />
        )}
        {!isLoading && (
          <>
            <span className="text-2xl">{searchBookmarkList.length}</span>
            <span className="text-sm">개의 북마크</span>
          </>
        )}
      </p>
      <div className="flex">
        <button
          className="w-8 text-lg"
          onClick={handleOnClickOpenOptionPage}
        >
          <FontAwesomeIcon icon={faLaptopMedical} />
        </button>
      </div>
    </div>
  );
}

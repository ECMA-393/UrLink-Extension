import { faLaptopMedical, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import ExtensionContext from "../../../context/ExtensionContext";

export default function GlobalNavigationBar({ isLoading, inputKeyword }) {
  const { allBookmarkList, searchBookmarkList } = useContext(ExtensionContext);

  const handleOnClickOpenOptionPage = () => {
    if (chrome.runtime.openOptionsPage && inputKeyword) {
      chrome.runtime.openOptionsPage();
    } else {
      alert("키워드 검색 후 열람 할 수 있습니다.");
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
          <>
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin"
            />
            <span className="mx-2">
              {allBookmarkList.length}개 북마크 탐색 중
            </span>
          </>
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

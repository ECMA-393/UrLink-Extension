import { faLaptopMedical, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import ExtensionContext from "../../../context/ExtensionContext";

export default function GlobalNavigationBar({ isLoading }) {
  const { allBookmarkList, searchBookmarkList } = useContext(ExtensionContext);

  const handleOnClickOpenOptionPage = async () => {
    const hasKeyword = await chrome.storage.local.get(null);
    if (chrome.runtime.openOptionsPage && Object.keys(hasKeyword).length > 0) {
      chrome.runtime.openOptionsPage();
    } else {
      alert("저장된 검색내역이 없어요. 먼저 검색해보세요!");
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

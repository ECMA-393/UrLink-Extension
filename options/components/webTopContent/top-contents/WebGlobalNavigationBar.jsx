import { useContext } from "react";

import { WebSearchContext } from "../../../context/WebSearchContext";

export default function WebGlobalNavigationBar({ urlNewList }) {
  const { isLoading } = useContext(WebSearchContext);

  return (
    <div className="mb-5 my-4">
      <h1 className="font-bold text-lg">Web View</h1>
      {isLoading ? (
        <UserSearchBookmarkView />
      ) : (
        <UserBookmarkListView urlNewList={urlNewList} />
      )}
    </div>
  );
}

function UserSearchBookmarkView() {
  const { isLoading } = useContext(WebSearchContext);

  return (
    <>
      {isLoading ? (
        <p className="text-2xl">검색 중 입니다.</p>
      ) : (
        <UserSearchBookmarkViewText />
      )}
    </>
  );
}
function UserSearchBookmarkViewText() {
  const { bookmarkList } = useContext(WebSearchContext);

  return (
    <p>
      <span className="text-2xl pe-1 inline-block">{bookmarkList.length}</span>
      <span className="text-sm">개의 결과가 검색되었습니다.</span>
    </p>
  );
}

function UserBookmarkListView({ urlNewList }) {
  const { bookmarkList } = useContext(WebSearchContext);

  return (
    <p>
      <span className="text-2xl pe-1 inline-block">
        {bookmarkList ? bookmarkList.length : urlNewList.length}
      </span>
      <span className="text-sm">개의 북마크</span>
    </p>
  );
}

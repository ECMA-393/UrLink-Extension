export default function WebSideSearchHistory() {
  return (
    <div className="w-[300px] p-5">
      <h2 className="mb-5 font-bold">검색 히스토리</h2>
      <SearchHistoryBox />
    </div>
  );
}

function SearchHistoryBox() {
  return (
    <div className="w-full p-5 bg-white rounded-md shadow-lg">
      <h3>북마크 제목</h3>
      <div>
        <span>제목 검색</span>
        <p>
          <span>12</span>
          개의 검색 결과
        </p>
      </div>
      <div className="mt-5 flex justify-between">
        <SearchHistoryButton
          color={`bg-blue-700`}
          message={`재 검색`}
        />
        <SearchHistoryButton
          color={`bg-red-700`}
          message={`삭제`}
        />
      </div>
    </div>
  );
}

function SearchHistoryButton({ message, color }) {
  return (
    <button className={`min-w-24 rounded-md px-3 text-white ${color}`}>
      {message}
    </button>
  );
}

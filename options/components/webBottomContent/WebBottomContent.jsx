export default function WebBottomContent() {
  return (
    <div className="w-full h-[calc(100vh-200px)] overflow-hidden lg:max-w-5xl lg:px-0 md:max-w-screen-md sm:max-w-screen-sm px-2">
      <p className="pb-2">
        총 <span className="font-bold">20</span>
        개의 결과가 검색 되었습니다.
      </p>
      <div className="w-full overflow-y-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
        <BookmarkBox />
      </div>
    </div>
  );
}

function BookmarkBox() {
  return (
    <div className="w-full min-h-10 flex bg-white rounded-lg p-3 hover:bg-gray-300 hover:shadow-lg duration-100">
      data
    </div>
  );
}

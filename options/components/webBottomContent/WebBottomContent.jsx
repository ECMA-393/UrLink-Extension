export default function WebBottomContent() {
  return (
    <div className="w-full h-[calc(100vh-200px)] overflow-hidden lg:max-w-5xl lg:px-0 md:max-w-screen-md sm:max-w-screen-sm px-2">
      <p>
        총<span>20</span>
        개의 결과가 검색 되었습니다.
      </p>
      <div className="flex">
        <BookmarkBox />
      </div>
    </div>
  );
}

function BookmarkBox() {
  return <div className="">data</div>;
}

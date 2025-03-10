import WebSideSearchHistory from "./WebSideSearchHistory";
import WebBottomContent from "./webBottomContent/WebBottomContent";
import WebTopContent from "./webTopContent/WebTopContent";

function WebContent({ urlNewList }) {
  return (
    <div className="w-full h-dvh bg-gray-200 flex">
      <WebSideSearchHistory />
      <div className="w-[calc(100%-300px)] px-3 pe-5">
        <WebTopContent urlNewList={urlNewList} />
        <WebBottomContent urlNewList={urlNewList} />
      </div>
    </div>
  );
}

export default WebContent;

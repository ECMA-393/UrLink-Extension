import WebBottomContent from "./webBottomContent/WebBottomContent";
import WebTopContent from "./webTopContent/WebTopContent";

function WebContent({ urlNewList }) {
  //console.log(`02 WebContent : ${urlNewList}`);

  return (
    <div className="w-full h-dvh bg-gray-200">
      <WebTopContent urlNewList={urlNewList} />
      <WebBottomContent urlNewList={urlNewList} />
    </div>
  );
}

export default WebContent;

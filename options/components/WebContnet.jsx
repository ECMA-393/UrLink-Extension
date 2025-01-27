import WebBottomContent from "./webBottomContent/WebBottomContent";
import WebTopContent from "./webTopContent/WebTopContent";

function WebContent() {
  return (
    <div className="w-full bg-yellow-50">
      <WebTopContent />
      <WebBottomContent />
    </div>
  );
}

export default WebContent;

import "../../index.css";
import GlobalNavigationBar from "./top-contents/GlobalNavigationBar";
import KeywordSearchBox from "./top-contents/KeywordSearchBox";

export default function ExtensionTopContent() {
  return (
    <div className="p-3 bg-black w-full h-28">
      <GlobalNavigationBar />
      <KeywordSearchBox />
    </div>
  );
}

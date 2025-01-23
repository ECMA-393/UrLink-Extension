import "../../index.css";
import GlobalNavigationBar from "./top-contents/GlobalNavigationBar";
import KeywordSearchBox from "./top-contents/KeywordSearchBox";

export default function ExtensionTopContent({ urlNewList }) {
  return (
    <div className="fixed p-3 bg-black w-full h-28 block top-0">
      <GlobalNavigationBar urlNewList={urlNewList} />
      <KeywordSearchBox />
    </div>
  );
}

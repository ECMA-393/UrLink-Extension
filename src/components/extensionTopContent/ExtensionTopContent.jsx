import "../../index.css";
import GnbBox from "./top-contents/GnbBox";
import KeywordSearchBox from "./top-contents/KeywordSearchBox";

export default function ExtensionTopContent({ urlNewList }) {
  return (
    <div className="p-3 bg-black w-full h-28">
      <GnbBox urlNewList={urlNewList} />
      <KeywordSearchBox />
    </div>
  );
}

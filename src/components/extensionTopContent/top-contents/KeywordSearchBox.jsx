import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function KeywordSearchBox() {
  return (
    <div className="w-full h-10 rounded-full bg-white/[.5] text-white flex">
      <input
        className="pl-4 bg-transparent h-10 text-sm placeholder-white grow"
        type="text"
        placeholder="키워드를 입력해 주세요."
      />
      <button className="w-12 text-lg">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

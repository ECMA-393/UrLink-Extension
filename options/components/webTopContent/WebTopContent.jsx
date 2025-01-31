import WebGlobalNavigationBar from "./top-contents/WebGlobalNavigationBar";
import WebKeywordSearchBox from "./top-contents/WebKeywordSearchBox";

export default function WebTopContent({ urlNewList }) {
  const selectValueTypes = ["키워드 검색", "제목 검색", "제목 + 키워드 검색"];

  return (
    <div className="w-full max-w-5xl pt-5 pb-[14px] mx-auto my-0">
      <WebGlobalNavigationBar urlNewList={urlNewList} />
      <WebKeywordSearchBox
        urlNewList={urlNewList}
        selectData={selectValueTypes}
      />
    </div>
  );
}

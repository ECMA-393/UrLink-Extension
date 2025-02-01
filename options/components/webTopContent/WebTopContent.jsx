import WebGlobalNavigationBar from "./top-contents/WebGlobalNavigationBar";
import WebKeywordSearchBox from "./top-contents/WebKeywordSearchBox";

export default function WebTopContent({ urlNewList }) {
  const selectValueTypes = ["키워드 검색", "제목 검색", "제목 + 키워드 검색"];

  return (
    <div className="w-full lg:max-w-5xl lg:px-0 md:max-w-screen-md sm:max-w-screen-sm px-2 pt-5 pb-[14px] mx-auto my-0">
      <WebGlobalNavigationBar urlNewList={urlNewList} />
      <WebKeywordSearchBox
        urlNewList={urlNewList}
        selectData={selectValueTypes}
      />
    </div>
  );
}

import WebKeywordSearchBox from "./top-contents/WebKeywordSearchBox";

export default function WebTopContent({ urlNewList }) {
  return (
    <div className="w-full lg:max-w-5xl lg:px-0 md:max-w-screen-md sm:max-w-screen-sm px-2 pt-5 pb-[14px] mx-auto my-0">
      <WebKeywordSearchBox urlNewList={urlNewList} />
    </div>
  );
}

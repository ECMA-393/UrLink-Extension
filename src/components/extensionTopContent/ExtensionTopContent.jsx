import { useState } from "react";

import GlobalNavigationBar from "./top-contents/GlobalNavigationBar";
import KeywordSearchBox from "./top-contents/KeywordSearchBox";

export default function ExtensionTopContent({ isLoading, isError }) {
  const [inputKeyword, setInputKeyword] = useState("");

  return (
    <div className="fixed p-3 bg-black w-full h-28 block top-0">
      <GlobalNavigationBar
        isLoading={isLoading}
        inputKeyword={inputKeyword}
      />
      <KeywordSearchBox
        isLoading={isLoading}
        isError={isError}
        inputKeyword={inputKeyword}
        setInputKeyword={setInputKeyword}
      />
    </div>
  );
}

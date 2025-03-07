import { useEffect, useState } from "react";

import ExtensionContext from "../context/ExtensionContext";
import useBookmarks from "../hooks/useBookmarks";
import ExtensionBottomContent from "./extensionBottomContent/ExtensionBottomContent";
import ExtensionTopContent from "./extensionTopContent/extensionTopContent";

function ExtensionContent() {
  const allBookmarkList = useBookmarks();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchBookmarkList, setSearchBookmarkList] = useState([]);

  useEffect(() => {
    setSearchBookmarkList(allBookmarkList);
  }, [allBookmarkList]);

  return (
    <ExtensionContext.Provider
      value={{
        allBookmarkList,
        searchBookmarkList,
        setSearchBookmarkList,
        searchKeyword,
        setSearchKeyword,
      }}
    >
      <ExtensionTopContent />
      <ExtensionBottomContent />
    </ExtensionContext.Provider>
  );
}

export default ExtensionContent;

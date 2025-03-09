import { useEffect, useState } from "react";

import ExtensionContent from "./components/ExtensionContent";
import ExtensionContext from "./context/ExtensionContext";
import useBookmarks from "./hooks/useBookmarks";

function App() {
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
      <ExtensionContent />
    </ExtensionContext.Provider>
  );
}

export default App;

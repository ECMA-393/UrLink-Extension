import { useEffect, useState } from "react";

import WebContent from "./components/WebContnet";

function App() {
  const [urlNewList, setUrlNewList] = useState([]);

  const getNewTree = (nodeItems) => {
    const getNewTreeResult = [];

    function recursive(node) {
      if (Array.isArray(node)) {
        node.forEach((item) => recursive(item));
      } else if (typeof node === "object" && node !== null) {
        if (node.children) {
          recursive(node.children);
        }
        if (node.title && node.url) {
          getNewTreeResult.push(node);
        }
      }
      return getNewTreeResult;
    }
    const newTree = recursive(nodeItems);
    setUrlNewList(newTree);
  };

  useEffect(() => {
    chrome.bookmarks.getTree((treeList) => {
      getNewTree(treeList);
    });
  }, []);
  //console.log(urlNewList);
  //console.log(urlNewList.length);

  return <WebContent urlNewList={urlNewList} />;
}

export default App;

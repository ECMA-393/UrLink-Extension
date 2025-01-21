/* global chrome */
import { useEffect, useState } from "react";

import ExtensionBottomContent from "./components/extensionBottomContent/extensionBottomContent";
import ExtensionTopContent from "./components/extensionTopContent/extensionTopContent";

function App() {
  const [urlNewList, setUrlNewList] = useState([]);

  useEffect(() => {
    chrome.bookmarks.getTree((treeList) => {
      getNewTree(treeList);
    });
  }, []);

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
  return (
    <>
      <ExtensionTopContent urlNewList={urlNewList} />
      <ExtensionBottomContent urlNewList={urlNewList} />
    </>
  );
}

export default App;

import { useEffect, useState } from "react";

const useBookmarks = () => {
  const [bookmarkList, setBookmarkList] = useState([]);

  useEffect(() => {
    const getAllBookmark = (nodeItems) => {
      const newBookmarkList = [];

      function recursive(node) {
        if (Array.isArray(node)) {
          node.forEach((item) => recursive(item));
        } else if (typeof node === "object" && node !== null) {
          if (node.children) {
            recursive(node.children);
          }
          if (node.title && node.url) {
            newBookmarkList.push(node);
          }
        }
        return newBookmarkList;
      }

      setBookmarkList(recursive(nodeItems));
    };

    chrome.bookmarks.getTree((treeList) => {
      getAllBookmark(treeList);
    });
  }, []);

  return bookmarkList;
};

export default useBookmarks;

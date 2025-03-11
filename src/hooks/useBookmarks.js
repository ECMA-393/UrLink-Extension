import { useEffect, useState } from "react";

const useBookmarks = () => {
  const [bookmarkList, setBookmarkList] = useState([]);

  useEffect(() => {
    function getAllBookmark(nodeItems) {
      const newBookmarkList = [];
      const stack = [...nodeItems];

      while (stack.length) {
        const node = stack.pop();
        if (Array.isArray(node)) {
          stack.push(...node);
        } else if (typeof node === "object" && node !== null) {
          if (node.children) {
            stack.push(...node.children);
          }
          if (node.title && node.url) {
            newBookmarkList.push(node);
          }
        }
      }

      setBookmarkList(newBookmarkList);
    }

    chrome.bookmarks.getTree((treeList) => {
      getAllBookmark(treeList);
    });
  }, []);

  return bookmarkList;
};

export default useBookmarks;

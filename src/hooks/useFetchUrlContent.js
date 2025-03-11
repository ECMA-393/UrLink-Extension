import { useCallback, useContext, useEffect, useState } from "react";

import { URL_TEMPLATES } from "../constants/constants";
import ExtensionContext from "../context/ExtensionContext";

const useFetchUrlContent = () => {
  const { allBookmarkList, searchMode, setSearchBookmarkList, searchKeyword } =
    useContext(ExtensionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCrawledData = useCallback(async () => {
    try {
      const bookmarkList = [...allBookmarkList];
      let finalBookmarkList = [];

      if (!searchKeyword) {
        setSearchBookmarkList(allBookmarkList);
        return;
      }

      setSearchBookmarkList([]);
      setError(null);
      let index = 0;

      const fetchBookmarkChunk = async () => {
        const chunkedBookmarkList = bookmarkList.slice(index, index + 5);

        const fetchEncodedUrlList = chunkedBookmarkList.map((bookmark) => {
          const encodedUrl = encodeURIComponent(bookmark.url);
          const fetchUrl = URL_TEMPLATES[searchMode](encodedUrl, searchKeyword);

          if (searchKeyword) {
            return fetch(fetchUrl);
          }
        });

        if (fetchEncodedUrlList) {
          const searchResultList =
            await Promise.allSettled(fetchEncodedUrlList);
          const searchedBookmarkList = [];

          for (const resultList of searchResultList) {
            if (resultList.status === "fulfilled") {
              const searchItem = resultList.value;

              if (searchItem.ok) {
                searchedBookmarkList.push(await searchItem.json());
              }
            }
          }

          const filterBookmarkList = searchedBookmarkList.filter(
            (bookmarkItem) => bookmarkItem.hasKeyword
          );

          const bookmarkAllInnerText = [];
          const resultBookmarkList = filterBookmarkList.map((bookmarkItem) => {
            for (let i = 0; i < allBookmarkList.length; i++) {
              if (allBookmarkList[i].url === bookmarkItem.url) {
                bookmarkAllInnerText.push({
                  [`${bookmarkItem.url}`]: bookmarkItem,
                });

                return { ...bookmarkItem, ...allBookmarkList[i] };
              }
            }
          });

          const localBookmarkList = await chrome.storage.local.get([
            searchKeyword,
          ]);
          const currentValue =
            index !== 0 ? localBookmarkList[searchKeyword] : [];

          const updatedValue = [...currentValue, ...bookmarkAllInnerText];
          await chrome.storage.local.set({ [searchKeyword]: updatedValue });

          if (resultBookmarkList) {
            finalBookmarkList = [...finalBookmarkList, ...resultBookmarkList];
            setSearchBookmarkList(finalBookmarkList);
          }
        }

        index += 5;

        if (index < bookmarkList.length) {
          await fetchBookmarkChunk();
        }
      };

      await fetchBookmarkChunk();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [allBookmarkList, searchKeyword, searchMode, setSearchBookmarkList]);

  useEffect(() => {
    setIsLoading(true);
    getCrawledData();
  }, [getCrawledData]);

  return { isLoading, error };
};

export default useFetchUrlContent;

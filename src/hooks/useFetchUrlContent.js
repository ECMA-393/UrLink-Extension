import { useCallback, useContext, useEffect, useState } from "react";

import { SERVER_URL } from "../constants/constants";
import ExtensionContext from "../context/ExtensionContext";

const useFetchUrlContent = () => {
  const { allBookmarkList, setSearchBookmarkList, searchKeyword } =
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

          if (searchKeyword) {
            return fetch(
              `${SERVER_URL}/crawl/${encodedUrl}/search?keyword=${searchKeyword}`
            );
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

          const resultBookmarkList = filterBookmarkList.map((bookmarkItem) => {
            for (let i = 0; i < allBookmarkList.length; i++) {
              if (allBookmarkList[i].url === bookmarkItem.url) {
                return { ...bookmarkItem, ...allBookmarkList[i] };
              }
            }
          });

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
  }, [allBookmarkList, searchKeyword, setSearchBookmarkList]);

  useEffect(() => {
    setIsLoading(true);
    getCrawledData();
  }, [getCrawledData]);

  return { isLoading, error };
};

export default useFetchUrlContent;

import { useCallback, useContext, useEffect, useState } from "react";

import { URL_TEMPLATES } from "../constants/constants";
import ExtensionContext from "../context/ExtensionContext";

const STORAGE_LIMIT = 10 * 1024 * 1024;

const useFetchUrlContent = () => {
  const { allBookmarkList, searchMode, setSearchBookmarkList, searchKeyword } =
    useContext(ExtensionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkChromeStorageUsage = useCallback(async () => {
    return new Promise((resolve) => {
      chrome.storage.local.getBytesInUse(null, (bytesInUse) => {
        resolve(bytesInUse);
      });
    });
  }, []);

  const removeAnyData = useCallback(async () => {
    return new Promise((resolve) => {
      chrome.storage.local.get(null, async (items) => {
        const keys = Object.keys(items);
        const notDeletedKeys = ["initialSearchValue"];
        const deletableKeys = keys.filter(
          (key) => !notDeletedKeys.includes(key)
        );

        if (deletableKeys.length === 0) {
          return resolve();
        }

        const deleteKey = deletableKeys[0];
        await new Promise((res) => chrome.storage.local.remove(deleteKey, res));

        resolve();
      });
    });
  }, []);

  const saveDataWithStorageCheck = useCallback(
    async (key, data) => {
      const newDataSize = new Blob([JSON.stringify(data)]).size;
      let availableSpace = STORAGE_LIMIT - (await checkChromeStorageUsage());

      while (availableSpace < newDataSize) {
        await removeAnyData();
        availableSpace = STORAGE_LIMIT - (await checkChromeStorageUsage());
      }

      chrome.storage.local.set({ [key]: data });
    },
    [checkChromeStorageUsage, removeAnyData]
  );

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
                  [`${bookmarkItem.url}`]: {
                    ...bookmarkItem,
                    ...allBookmarkList[i],
                  },
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

          const key = `${searchKeyword}_${Date.now()}`;
          await saveDataWithStorageCheck(key, updatedValue);

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
  }, [
    allBookmarkList,
    searchKeyword,
    searchMode,
    setSearchBookmarkList,
    saveDataWithStorageCheck,
  ]);

  useEffect(() => {
    setIsLoading(true);
    getCrawledData();
  }, [getCrawledData]);

  return { isLoading, error };
};

export default useFetchUrlContent;

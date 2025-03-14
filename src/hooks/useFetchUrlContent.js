import { useCallback, useContext, useEffect, useState } from "react";

import { STORAGE_LIMIT, URL_TEMPLATES } from "../constants/constants";
import ExtensionContext from "../context/ExtensionContext";

const getUsedStorageSize = async () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.getBytesInUse(null, (bytesInUse) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(bytesInUse);
      }
    });
  });
};

const calculateAvailableStorage = async () => {
  const usedSize = await getUsedStorageSize();
  return STORAGE_LIMIT - usedSize;
};

const calculateDataSize = (data) => {
  const jsonString = JSON.stringify(data);
  return new TextEncoder().encode(jsonString).length;
};

const deleteOldestData = async (requiredSpace) => {
  const storedData = await new Promise((resolve) => {
    chrome.storage.local.get(null, (items) => resolve(items));
  });

  const sortedKeys = Object.keys(storedData).sort((a, b) => {
    return storedData[a].timestamp - storedData[b].timestamp;
  });

  let freeSpace = 0;
  for (const key of sortedKeys) {
    const dataSize = calculateDataSize(storedData[key]);
    await new Promise((resolve) => chrome.storage.local.remove(key, resolve));

    freeSpace += dataSize;
    if (freeSpace >= requiredSpace) {
      break;
    }
  }
};

const saveDataWithStorageCheck = async (data, keyword) => {
  try {
    const dataSize = calculateDataSize(data);
    const availableSpace = await calculateAvailableStorage();

    if (dataSize > availableSpace) {
      await deleteOldestData(dataSize - availableSpace);
    }

    await new Promise((resolve) => {
      chrome.storage.local.set({ [keyword]: data }, resolve);
    });
  } catch (error) {
    console.log("스토리지 저장 오류:", error);
  }
};

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
                  [`${bookmarkItem.url}`]: {
                    ...bookmarkItem,
                    ...allBookmarkList[i],
                    timestamp: Date.now(),
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

          await saveDataWithStorageCheck(updatedValue, searchKeyword);

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

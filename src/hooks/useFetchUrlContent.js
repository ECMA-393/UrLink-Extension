import { useCallback, useEffect, useState } from "react";

import { SERVER_URL } from "../constants/constants";

const useFetchUrlContent = (setCrawledResult, savedList) => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCrawledData = useCallback(async () => {
    try {
      setError(null);
      const fetchEncodedUrlList = savedList.map((bookmark) => {
        const encodedUrl = encodeURIComponent(bookmark.url);

        if (keyword) {
          return fetch(
            `${SERVER_URL}/crawl/${encodedUrl}/search?keyword=${keyword}`
          );
        } else {
          setCrawledResult(savedList);
        }
      });

      if (keyword) {
        chrome.storage.session.remove("webBookmarkList");

        const fetchedResultList = await Promise.allSettled(fetchEncodedUrlList);
        const fetchedParseList = [];

        for (const fetchedResult of fetchedResultList) {
          if (fetchedResult.status === "fulfilled") {
            const fetchedResultValue = fetchedResult.value;

            if (fetchedResultValue.ok) {
              fetchedParseList.push(await fetchedResultValue.json());
            }
          }
        }

        const filteredList = fetchedParseList.filter((filteredItem) => {
          if (filteredItem.hasKeyword) {
            return filteredItem;
          }
        });

        if (filteredList.length === 0) {
          setError("검색 결과가 없습니다.");
        }

        const searchResultList = filteredList.map((filteredItem) => {
          for (let i = 0; i < savedList.length; i++) {
            if (savedList[i].url === filteredItem.url) {
              return { ...filteredItem, ...savedList[i] };
            }
          }
        });

        chrome.storage.session.set({
          webBookmarkList: { keyword, searchResultList },
        });
        setCrawledResult(searchResultList);
      }

      chrome.storage.session.set({ webIsLoading: false });
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }, [keyword, savedList, setCrawledResult]);

  useEffect(() => {
    chrome.storage.session.set({ webIsLoading: true });

    setIsLoading(true);
    getCrawledData();
  }, [getCrawledData]);

  return [keyword, setKeyword, isLoading, error];
};

export default useFetchUrlContent;

import { useCallback, useEffect, useState } from "react";

import { SERVER_URL } from "../constants/constants";
import { SELECT_VALUE_STATE } from "../constants/selectValueState";

const useFetchKeywordSearchList = (
  setCrawledResult,
  setSearchKeyword,
  bookmarkList,
  userSelectValue
) => {
  const [keyword, setKeyword] = useState("");
  const [hasSearchResult, setHasSearchResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCrawledData = useCallback(async () => {
    try {
      const fetchEncodedUrlList = bookmarkList.map((bookmark) => {
        const encodedUrl = encodeURIComponent(bookmark.url);

        if (keyword) {
          let url = "";
          if (userSelectValue === SELECT_VALUE_STATE[0]) {
            url = `${SERVER_URL}/crawl/${encodedUrl}/search?keyword=${keyword}`;
          }
          if (userSelectValue === SELECT_VALUE_STATE[1]) {
            url = `${SERVER_URL}/crawl/title/${encodedUrl}/search?keyword=${keyword}`;
          }
          if (userSelectValue === SELECT_VALUE_STATE[2]) {
            url = `${SERVER_URL}/crawl/all/${encodedUrl}/search?keyword=${keyword}`;
          }

          setHasSearchResult(true);
          return fetch(url);
        } else {
          setIsLoading(false);
          const storageBookMarkList = chrome.storage.session.get([
            "webBookmarkList",
          ]);
          storageBookMarkList.then((res) => {
            if (Object.keys(res).length !== 0) {
              setCrawledResult(res.webBookmarkList.searchResultList);
              setSearchKeyword(res.webBookmarkList.keyword);
            } else {
              setCrawledResult(bookmarkList);
            }
          });
        }
      });

      if (keyword) {
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

        const filterdList = fetchedParseList.filter((filterdItem) => {
          if (filterdItem.hasKeyword) {
            return filterdItem;
          }
        });

        if (filterdList.length === 0) {
          setError("검색 결과가 없습니다.");
        }

        const searchResultList = filterdList.map((filterdItem) => {
          for (let i = 0; i < bookmarkList.length; i++) {
            if (bookmarkList[i].url === filterdItem.url) {
              return { ...filterdItem, ...bookmarkList[i] };
            }
          }
        });

        setCrawledResult(searchResultList);
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }, [
    keyword,
    bookmarkList,
    setCrawledResult,
    setSearchKeyword,
    userSelectValue,
  ]);

  useEffect(() => {
    setIsLoading(true);
    getCrawledData();
  }, [getCrawledData]);

  return [
    setKeyword,
    isLoading,
    setIsLoading,
    error,
    hasSearchResult,
    setHasSearchResult,
    keyword,
  ];
};

export default useFetchKeywordSearchList;

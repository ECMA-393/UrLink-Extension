import { useCallback, useEffect, useState } from "react";

import { SERVER_URL } from "../constants/constants";

const useFetchKeywordSearchList = (setCrawledResult, bookmarkList) => {
  const [keyword, setKeyword] = useState("");
  const [searchResultCount, setSearchResultCount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCrawledData = useCallback(async () => {
    try {
      const fetchEncodedUrlList = bookmarkList.map((bookmark) => {
        const encodedUrl = encodeURIComponent(bookmark.url);

        if (keyword) {
          setSearchResultCount(true);
          return fetch(
            `${SERVER_URL}/crawl/${encodedUrl}/search?keyword=${keyword}`
          );
        } else {
          setIsLoading(false);
          setCrawledResult(bookmarkList);
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

        setCrawledResult(
          filterdList.map((filterdItem) => {
            for (let i = 0; i < bookmarkList.length; i++) {
              if (bookmarkList[i].url === filterdItem.url) {
                return { ...filterdItem, ...bookmarkList[i] };
              }
            }
          })
        );
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }, [keyword, bookmarkList, setCrawledResult]);

  useEffect(() => {
    setIsLoading(true);
    getCrawledData();
  }, [getCrawledData]);

  return [
    setKeyword,
    isLoading,
    error,
    searchResultCount,
    setSearchResultCount,
  ];
};

export default useFetchKeywordSearchList;

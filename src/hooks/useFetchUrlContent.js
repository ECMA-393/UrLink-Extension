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
            for (let i = 0; i < savedList.length; i++) {
              if (savedList[i].url === filterdItem.url) {
                return { ...filterdItem, ...savedList[i] };
              }
            }
          })
        );
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }, [keyword, savedList, setCrawledResult]);

  useEffect(() => {
    setIsLoading(true);
    getCrawledData();
  }, [getCrawledData]);

  return [keyword, setKeyword, isLoading, error];
};

export default useFetchUrlContent;

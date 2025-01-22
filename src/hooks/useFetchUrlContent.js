import { useCallback, useEffect, useState } from "react";

import { SERVER_URL } from "../constants/constants";

const useFetchUrlContent = (bookmarkUrlArray, keyword) => {
  const [crawledResult, setCrawledResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCrawledData = useCallback(async () => {
    try {
      const fetchEncodedUrlList = bookmarkUrlArray.map((bookmarkUrl) => {
        const encodedUrl = encodeURIComponent(bookmarkUrl);

        if (keyword) {
          return fetch(
            `${SERVER_URL}/crawl/${encodedUrl}/search?keyword=${keyword}`
          );
        } else {
          return fetch(`${SERVER_URL}/crawl/${encodedUrl}`);
        }
      });

      const fetchedResultList = await Promise.allSettled(fetchEncodedUrlList);
      const fetchResultJsonList = [];

      for (const fetchedResult of fetchedResultList) {
        if (fetchedResult.status === "fulfilled") {
          fetchResultJsonList.push(await fetchedResult.value.json());
        }
      }

      setCrawledResult(fetchResultJsonList);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }, [bookmarkUrlArray, keyword]);

  useEffect(() => {
    setIsLoading(true);
    getCrawledData();
  }, []);

  return [crawledResult, isLoading, error];
};

export default useFetchUrlContent;

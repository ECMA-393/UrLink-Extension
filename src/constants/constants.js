export const SERVER_URL = "http://localhost:3000/crawl";
export const STORAGE_LIMIT = 9 * 1024 * 1024;

export const SEARCH_MODE = {
  CONTENT: "내용",
  TITLE: "제목",
  ALL: "제목+내용",
};

export const MODE_DESCRIPTION = {
  [SEARCH_MODE.CONTENT]: "문서 내부 내용을 검색합니다. | 예상소요시간 : ",
  [SEARCH_MODE.TITLE]: "문서 제목을 검색합니다. | 예상소요시간 : ",
  [SEARCH_MODE.ALL]: "문서 제목과 내부를 동시에 검색합니다. | 예상소요시간 : ",
};

export const MODE_EXPECT_CRAWLING_TIME = {
  [SEARCH_MODE.CONTENT]: 5,
  [SEARCH_MODE.TITLE]: 3,
  [SEARCH_MODE.ALL]: 6,
};

export const URL_TEMPLATES = {
  [SEARCH_MODE.CONTENT]: (encodedUrl, searchKeyword) =>
    `${SERVER_URL}/${encodedUrl}/search?keyword=${searchKeyword}`,
  [SEARCH_MODE.TITLE]: (encodedUrl, searchKeyword) =>
    `${SERVER_URL}/title/${encodedUrl}/search?keyword=${searchKeyword}`,
  [SEARCH_MODE.ALL]: (encodedUrl, searchKeyword) =>
    `${SERVER_URL}/all/${encodedUrl}/search?keyword=${searchKeyword}`,
};

Object.freeze(SEARCH_MODE);
Object.freeze(MODE_DESCRIPTION);
Object.freeze(MODE_EXPECT_CRAWLING_TIME);
Object.freeze(URL_TEMPLATES);

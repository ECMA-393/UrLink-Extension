export const SERVER_URL = "http://localhost:3000/crawl";

export const SEARCH_MODE = {
  CONTENT: "CONTENT",
  TITLE: "TITLE",
  ALL: "ALL",
};

export const URL_TEMPLATES = {
  CONTENT: (encodedUrl, searchKeyword) =>
    `${SERVER_URL}/${encodedUrl}/search?keyword=${searchKeyword}`,
  TITLE: (encodedUrl, searchKeyword) =>
    `${SERVER_URL}/title/${encodedUrl}/search?keyword=${searchKeyword}`,
  ALL: (encodedUrl, searchKeyword) =>
    `${SERVER_URL}/all/${encodedUrl}/search?keyword=${searchKeyword}`,
};

Object.freeze(SEARCH_MODE);
Object.freeze(URL_TEMPLATES);

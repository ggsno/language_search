export const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async url => {
  const response = await fetch(url);

  if (response.ok) return await response.json();

  throw new Error("error : bad request");
};

export const fetchLanguages = async language =>
  request(`${API_END_POINT}/languages?keyword=${language}`);

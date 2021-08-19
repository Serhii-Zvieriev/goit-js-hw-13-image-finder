const BASE_URL = "https://pixabay.com/api/";
const KEY = "22998355-c21cb54d4c6e6a9c64822a6a0";

export default function fetchFn(inputValue, pageNumber) {
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${inputValue}&page=${pageNumber}&per_page=12&key=${KEY}`
  ).then((response) => response.json());
}

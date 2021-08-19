import markupFetch from "./templates/markup.hbs";
import fetchFn from "./src/js/apiService";
var debounce = require("lodash.debounce");

const refs = {
  btnFetch: document.getElementById("btn-fetch"),
  formImput: document.getElementById("input-id"),
  listRef: document.querySelector(".gallery"),
  btnLoadMore: document.getElementById("load-more"),
};

const debouncedCreateMarcup = debounce(inputValueFn, 500);

refs.btnFetch.addEventListener("click", foo);
refs.formImput.addEventListener("input", debouncedCreateMarcup);
refs.btnLoadMore.addEventListener("click", loadLoreFn);

let pageNumber = 1;
let inputValue;

function foo() {
  try {
    fetchFn(inputValue, pageNumber).then((data) => {
      const markup = markupFetch(data.hits);
      createMarcup(markup);
    });
  } catch (error) {
    console.error(error);
  }
}

function createMarcup(fnMarcup) {
  refs.listRef.insertAdjacentHTML("beforeend", fnMarcup);
}

function inputValueFn(event) {
  event.preventDefault();
  refs.listRef.innerHTML = "";
  inputValue = event.target.value;
  pageNumber = 1;
}

function loadLoreFn() {
  pageNumber += 1;
  foo();

  refs.btnLoadMore.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}

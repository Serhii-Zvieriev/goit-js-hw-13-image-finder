import markupFetch from "./templates/markup.hbs";
import fetchFn from "./js/apiService";
// var debounce = require("lodash.debounce");

const refs = {
  formRef: document.getElementById("search-form"),
  listRef: document.querySelector(".gallery"),
  btnLoadMore: document.getElementById("load-more"),
};

// const debouncedInputForm = debounce(inputValueFn, 500);

refs.formRef.addEventListener("submit", inputValueFn);
refs.btnLoadMore.addEventListener("click", loadLoreFn);

let pageNumber = 1;
let inputValue;

//================ Promise ================
// function foo() {
//   try {
//     fetchFn(inputValue, pageNumber).then((data) => {
//       const markup = markupFetch(data.hits);
//       createMarcup(markup);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// ================ async/await ================
async function foo() {
  try {
    const imagesArr = await fetchFn(inputValue, pageNumber);
    const markup = markupFetch(imagesArr.hits);
    createMarcup(markup);

    scroll();
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
  inputValue = event.target.children[0].value;
  pageNumber = 1;

  foo();
}

function loadLoreFn() {
  pageNumber += 1;
  foo();
}

function scroll() {
  if (pageNumber) {
    refs.btnLoadMore.classList.remove("is-hidden");
  }
  refs.btnLoadMore.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}

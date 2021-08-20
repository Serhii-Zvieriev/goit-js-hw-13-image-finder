import markupFetch from "./templates/markup.hbs";
import fetchFn from "./js/apiService";
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

async function loadLoreFn() {
  pageNumber += 1;
  await foo();
  // scroll();
}

// Плавный скрол я так к сожелению и не понял =(
// function scroll() {
//   refs.btnLoadMore.scrollIntoView({
//     behavior: "smooth",
//     block: "end",
//   });
// }

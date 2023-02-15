let form = document.querySelector(".search_pictuers");
let list = document.querySelector("#respond");
let nextPage = document.querySelector("#next");
let previousPage = document.querySelector("#previous");
let nextPageDiv = document.querySelector(".next_previous");

let url = "https://pixabay.com/api/?key=33506024-4219960d4e66c6a76dff1b306&q=";
let page = 1;

form.onsubmit = async (event) => {
  event.preventDefault();

  //Removes old search from view.
  RemoveOldSearch();

  jsonData = await FetchData(form);

  DisplaySearch(jsonData);
  let totalPages = GetTotalPages(jsonData);

  //Displaying next and previous buttons and disabling them if required.
  ShowPageBtns();
  DisableBtns(totalPages);
};

//Resetting the search url so that we get a new fresh search.
async function FetchData(form) {
  url = "https://pixabay.com/api/?key=33506024-4219960d4e66c6a76dff1b306&q=";
  page = 1;

  let text = form.search.value;
  let color = form.color_choise.value;

  if (color != "") {
    url += text + "&colors=" + color;
  } else {
    url += text;
  }

  url += `&per_page=10&page=${page}`;

  let response = await fetch(url);

  return await response.json();
}

function DisplaySearch(json) {
  for (let pic of json.hits) {
    let newElement = document.createElement("li");

    let listPic = document.createElement("img");
    let picTags = document.createElement("h3");
    let picAuthor = document.createElement("p");

    picTags.style.color = "white";
    picAuthor.style.color = "white";

    listPic.src = pic.previewURL;
    picTags.textContent = pic.tags;
    picAuthor.textContent = `Taken by ${pic.user}`;

    newElement.append(listPic, picTags, picAuthor);
    list.append(newElement);
  }
}

function ShowPageBtns() {
  nextPageDiv.style.display = "block";
}

function RemoveOldSearch() {
  while (list.firstElementChild) {
    list.firstElementChild.remove();
  }
}

nextPage.addEventListener("click", function () {
  ChangePage(1);
});

previousPage.addEventListener("click", function () {
  ChangePage(-1);
});

//Changes the page depending on button clicked. Next adds a page and previous removes one.
async function ChangePage(pageChange) {
  event.preventDefault();
  RemovePages();

  url += parseInt(page) + parseInt(pageChange);
  page = page + pageChange;

  let jsonData = await FetchNewPage(url);
  RemoveOldSearch();

  DisplaySearch(jsonData);
  let totalPages = GetTotalPages(jsonData);

  DisableBtns(totalPages);
}

//Fetches the new page from current search.
async function FetchNewPage(url) {
  let response1 = await fetch(url);

  return await response1.json();
}

//Removes the pages from the URL, enabling us to set new page.
function RemovePages() {
  let count = 0;

  for (let index = url.length - 1; index > 0; index--) {
    let number = parseInt(url[index]);

    if (!isNaN(number)) {
      count++;
    } else {
      break;
    }
  }

  url = url.substring(0, url.length - count);
}

function DisableBtns(totalPages) {
  if (page == 1) {
    previousPage.disabled = true;
  } else {
    previousPage.disabled = false;
  }
  if (page == totalPages || totalPages == 0) {
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
  }
}

function GetTotalPages(jsonData) {
  let pages = jsonData.totalHits;
  return Math.ceil(pages / 10);
}

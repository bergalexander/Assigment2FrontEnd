let form = document.querySelector(".search_pictuers");
let list = document.querySelector("#respond");
let nextPage = document.querySelector("#next");
let previousPage = document.querySelector("#previous");
let nextPageDiv = document.querySelector(".next_previous");

let url = "https://pixabay.com/api/?key=33506024-4219960d4e66c6a76dff1b306&q=";
let page = 1;

form.onsubmit = async (event) => {
  event.preventDefault();

  RemoveOldSearch();

  jsonData = await FetchData(form);

  DisplaySearch(jsonData);
  let totalPages = GetTotalPages(jsonData);

  ShowPageBtns();
  DisableBtns(totalPages);
};

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
  //Alla bilder
  return await response.json();
}

function DisplaySearch(json) {
  for (let pic of json.hits) {
    let newElement = document.createElement("li");

    let listPic = document.createElement("img");
    let picTags = document.createElement("h3");
    let picAuthor = document.createElement("p");

    picTags.style.color = "white";
    picAuthor.classList.add("mystyle");

    listPic.src = pic.previewURL;
    picTags = pic.tags;
    picAuthor = `Taken by ${pic.user}`;
    newElement.append(listPic, picTags, picAuthor);
    list.append(newElement);
  }
}
function ShowPageBtns() {
    nextPageDiv.style.display = "inline-block";
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
async function FetchNewPage(url) {
  let response1 = await fetch(url);
  //Alla bilder

  return await response1.json();
}

//Removes the pages from the URL, enabling us to set new page.
function RemovePages() {
  let count = 0;

  for (let index = url.length - 1; index > 0; index++) {
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
  if (page == totalPages) {
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
  }
}

function GetTotalPages(jsonData) {
  let pages = jsonData.totalHits;
  return Math.ceil(pages / 10);
}

// nextPage.onclick = async event => {

//     function NextPage(url, pageChange) {
//         page++;

//         url = url + '&page=' + page;
//     }
//     let response = await fetch(url);
//     //Alla bilder
//     let json = await response.json();

//     for (let pic of json.hits) {

//         let newElement = document.createElement("li");

//         let listPic = document.createElement('img');
//         let picTags = document.createElement("h3");
//         let picAuthor = document.createElement("p");

//         listPic.src = pic.previewURL;
//         picTags = pic.tags;
//         picAuthor = `Taken by ${pic.user}`; newElement.append(listPic, picTags, picAuthor)
//         list.append(newElement);

//     }

// }

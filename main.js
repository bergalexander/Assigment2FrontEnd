let form = document.querySelector('.search_pictuers');
let list = document.querySelector('#respond')
let nextPage = document.querySelector("#next");
let previousPage = document.querySelector("#previous");

let url = ""
let page = 1;
form.onsubmit = async event => {


    event.preventDefault();

    // RemoveOldSearch();

    let text = form.search.value;
    let color = form.color_choise.value;

    url = 'https://pixabay.com/api/?key=33506024-4219960d4e66c6a76dff1b306&q='

    if (color != "") {
        url += text + '&colors=' + color;
    }
    else {
        url += text;
    }

    url += '&per_page=10';

    let response = await fetch(url);
    //Alla bilder
    let json = await response.json();


    for (let pic of json.hits) {

        let newElement = document.createElement("li");

        let listPic = document.createElement('img');
        let picTags = document.createElement("h3");
        let picAuthor = document.createElement("p");

        listPic.src = pic.previewURL;
        picTags = pic.tags;
        picAuthor = `Taken by ${pic.user}`; newElement.append(listPic, picTags, picAuthor)
        list.append(newElement);

    }

    ShowPageBtns();
}
function ShowPageBtns() {
    nextPage.style.display = "inline-block";
    previousPage.style.display = "inline-block";
}
function GetTotalPages(jsonData) {
    let pages = jsonData.totalHits;
    return Math.ceil(pages / 10);
}

function RemoveOldSearch() {
    while (list.firstElementChild) {
        list.firstElementChild.remove();
    }
}



nextPage.onclick = async event => {

    function NextPage(url, pageChange) {
        page++;

        url = url + '&page=' + page;
    }
    let response = await fetch(url);
    //Alla bilder
    let json = await response.json();


    for (let pic of json.hits) {

        let newElement = document.createElement("li");

        let listPic = document.createElement('img');
        let picTags = document.createElement("h3");
        let picAuthor = document.createElement("p");

        listPic.src = pic.previewURL;
        picTags = pic.tags;
        picAuthor = `Taken by ${pic.user}`; newElement.append(listPic, picTags, picAuthor)
        list.append(newElement);

    }

}


function DisableBtns(jsonData) {
    let lastPage = GetTotalPages(jsonData);

    // if(page == )
    // nextPage

}
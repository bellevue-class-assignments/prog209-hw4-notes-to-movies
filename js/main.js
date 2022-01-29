// contants
const firstYear = 1833;
const lastYear = new Date().getFullYear();

// globals
let movieArray = [];
let selectedGenres = [];

// define a constructor to create movie objects
let MovieObject = function(pTitle, pGenres, pYear) {
    this.title = pTitle;
    this.genres = pGenres;
    this.year = pYear;
}

document.addEventListener("DOMContentLoaded", function(event) {

    let selectYear = document.getElementById("select-year")
    loadYears(selectYear);

    document.getElementById("buttonAdd").addEventListener("click", function() {
        movieArray.push(new MovieObject(document.getElementById("movie").value, selectedGenres, selectYear.value));
        document.getElementById("movie").value = "";
    });

    $(document).bind("change", "#select-genre", function(event, ui) {
        selectGenre = document.getElementById("select-genre");
        selectedGenres = getSelectedValues(selectGenre);
    });

    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#list", function(event) {
        createList();
    });


});


function loadYears(selectObject) {
    for (let i = lastYear; i >= firstYear; i--) {
        createOption(i, i, selectObject);
    }
}

function getSelectedValues(select) {
    let result = [];
    let options = select && select.options;
    let opt;

    for (let i = 0; i < options.length; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

function createList() {

    // clear prior data
    var myul = document.getElementById("movie-list");
    myul.innerHTML = '';

    movieArray.forEach(function(element, ) { // use handy array forEach method
        var li = document.createElement('li');
        li.innerHTML = element.title + " : " + element.year + " : " + element.genres.toString().replaceAll(",", ", ");
        myul.appendChild(li);
    });
};


// create option elements for dropdown lists
function createOption(optionValue, optionTextValue, selectObject) {
    let newOption = document.createElement("OPTION");
    newOption.setAttribute("value", optionValue);
    let optionText = document.createTextNode(optionTextValue);
    newOption.appendChild(optionText);
    selectObject.appendChild(newOption);
}
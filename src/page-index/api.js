
import apiSearchMovie from '../apiSearchMovie.js'
import apiPopular from '../apiPopular.js'
import popularHbs from '../partials/popular.hbs'
import { compareTitle, comparePopularity, compareDateNew, compareDateOld } from '../sortFunct.js'
import '../partials/menu-burger.js'



const refs = {
  searchForm: document.querySelector('.lightbox_iteam_btn'),
  gallery: document.querySelector('.gallery'),
  nav: document.querySelector('.nav__film'),
  itemGallery: [],
  sortName: document.getElementById('sortName'),
  sortDate: document.getElementById('sortDate'),
  filmsButton: document.querySelector('.burger__search__films'),
  serialsButton: document.querySelector('.burger__search__serials'),


};
// BUILD MAIN PAGE LIST
function markup() {
  apiPopular.type = 'movie';
  apiPopular.fetch().then(result => {
    refs.itemGallery = result;
    insertMarkup(result);
  })
}
markup();

refs.searchForm.addEventListener('submit', searchSbm);
refs.nav.addEventListener('click', refreshFilmChoice);
refs.sortName.addEventListener('click', sortItemByName);
refs.sortDate.addEventListener('click', sortItemByDate);
refs.filmsButton.addEventListener('click', burgerMenuMovie);
refs.serialsButton.addEventListener('click', burgerMenuSerials);
refs.gallery.addEventListener('click', addFavoriteFilm);
refs.gallery.addEventListener('click', movieSelected)


function movieSelected(e) {
  const id = e.target.closest('.movie').dataset.id;
  console.log('id :', id);
  localStorage.setItem("id", id);
  return false;
}


// SEARCH FILM
function searchSbm(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.elements.film.value;
  apiSearchMovie.query = inputValue;
  apiSearchMovie.fetch()
    .then(result => {
      clearListItemFilm();
      refs.itemGallery = result;
      insertMarkup(result);
    })
}

function getAbout() {

  let movieId = sessionStorage.getItem("movieId");


}

// add film to local storage

function addFavoriteFilm(e) {
  if (e.target.classList === "svg-star" || e.target.nodeName === 'use') {

    let local = e.target.closest('.movie');
    console.log(local);

    localStorage.setItem('key', JSON.stringify(local));

    //  console.log(JSON.parse(localStorage.getItem(local)));
  }

}

// burger menu
function burgerMenuMovie(e) {
  e.preventDefault();
  apiPopular.type = 'movie';
  clearListItemFilm();
  apiPopular.fetch().then(result => {
    refs.itemGallery = result;
    insertMarkup(result);
  })
}
//----------------------------------
function burgerMenuSerials(e) {
  e.preventDefault();
  apiPopular.type = 'tv';
  clearListItemFilm();
  apiPopular.fetch().then(result => {
    refs.itemGallery = result;
    insertMarkup(result);
  })
}

// Click Button and Buid page TV SHOW
function refreshFilmChoice(e) {
  if (e.target.classList[0] !== 'nav__main') {
    return
  }
  e.preventDefault();
  const currentChoise = e.target.dataset.type;
  clearListItemFilm();
  apiPopular.type = currentChoise;
  apiPopular.fetch().then(result => {
    refs.itemGallery = result;
    insertMarkup(result);
  })
}

// sort item byName
function sortItemByName(e) {
  const carrentChoice = e.currentTarget.value;
  if (carrentChoice === 'title') {
    refs.itemGallery.sort(compareTitle);
  }
  else if (carrentChoice === 'popularity') {
    refs.itemGallery.sort(comparePopularity);
  }
  clearListItemFilm();
  insertMarkup(refs.itemGallery);
}

// sort by date
function sortItemByDate(e) {
  const carrentChoice = e.currentTarget.value;
  console.log(refs.itemGallery);
  if (carrentChoice === 'release_date') {
    refs.itemGallery.sort(compareDateNew);
  }
  else {
    refs.itemGallery.sort(compareDateOld);
  }
  clearListItemFilm();
  insertMarkup(refs.itemGallery);
}

// Add list item to HtML
function insertMarkup(items) {
  const markup = buildMarkup(items);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

// Build list Iem Hbs
function buildMarkup(items) {
  return popularHbs(items);
}
//  Clear List Item in Ul
function clearListItemFilm() {
  refs.gallery.innerHTML = '';
}

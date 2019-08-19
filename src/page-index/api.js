
import apiSearchMovie from '../apiSearchMovie.js'
// import apiSearchImg from '../apiSearchImg.js'
import apiPopular from '../apiPopular.js'
import popularHbs from '../partials/popular.hbs'
import {compareTitle,comparePopularity,compareDateNew,compareDateOld} from '../sortFunct'
import '../partials/menu-burger.js'



 const refs = {
  searchForm: document.querySelector('.lightbox_iteam_btn'),
  gallery: document.querySelector('.gallery'),
  nav: document.querySelector('.nav__film'),
  // addFavoriteFilm: document.querySelector('.svg-star'),
  itemGallery: [],
  sortName: document.getElementById('sortName'),
  sortDate: document.getElementById('sortDate'),
  filmsButton: document.querySelector('.burger__search__films'),
  serialsButton: document.querySelector('.burger__search__serials'),
};
console.log(refs.filmsButton);

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
// refs.addFavoriteFilm.addEventListener('click', addFilm);
refs.sortName.addEventListener('click', sortItemByName);
refs.sortDate.addEventListener('click',sortItemByDate);
refs.filmsButton.addEventListener('click', burgerMenuMovie);
refs.serialsButton.addEventListener('click', burgerMenuSerials);


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
//----------------------------------------
// function burgerMenuMovie(e) {
//   e.preventDefault();
//   apiPopular.type = 'movie';
//   clearListItemFilm();
//   apiPopular.fetch().then(result => {
//     refs.itemGallery = result;
//     insertMarkup(result);
//   })
// }

// Click Button and Buid page TV SHOW
function refreshFilmChoice(e) {
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
  if(carrentChoice === 'title'){
    refs.itemGallery.sort(compareTitle);
  }
  else if(carrentChoice === 'popularity') {
    refs.itemGallery.sort(comparePopularity);
  }
  clearListItemFilm();
  insertMarkup(refs.itemGallery);
}

// sort by date
function sortItemByDate(e) {
  const carrentChoice = e.currentTarget.value;
  if(carrentChoice === 'release_date'){
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

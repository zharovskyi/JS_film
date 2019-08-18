import apiSearchMovie from '../apiSearchMovie.js'
// import apiSearchImg from '../apiSearchImg.js'
import apiPopular from '../apiPopular.js'

import popularHbs from '../partials/popular.hbs'
import './search.js';
// apiPopular.fetch()
// apiSearchImg.fetch()
// apiSearchMovie.fetch()

const refs = {
  searchForm: document.querySelector('.lightbox_iteam_btn'),
  gallery: document.querySelector('.gallery'),
  galleryTv: document.querySelector('.galleryTv'),
  nav: document.querySelector('.nav__film'),
};
// BUILD MAIN PAGE LIST

function markup() {
  apiPopular.type = 'movie';
  apiPopular.fetch().then(result => {
    insertMarkup(result);
  })
}
markup();

refs.searchForm.addEventListener('submit', searchSbm);
refs.nav.addEventListener('click', refreshFilmChoice);
console.log(refs.searchForm);

// SEARCH FILM
function searchSbm(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.elements.film.value;
  apiSearchMovie.query = inputValue;
  apiSearchMovie.fetch()
    .then(result => {
      clearListItemFilm();
      insertMarkup(result);
      
    })
}

// Click Button and Buid page TV SHOW
function refreshFilmChoice(e) {
  e.preventDefault();
  const currentChoise = e.target.dataset.type;
  console.log('currentChoise :', currentChoise);
  clearListItemFilm();
  apiPopular.type = currentChoise;
  apiPopular.fetch().then(result => {
    console.log(result);
    insertMarkup(result);

  })
  // markup(currentChoise);
}




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


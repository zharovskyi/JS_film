// import apiSearchMovie from '../apiSearchMovie.js'
// import apiSearchImg from '../apiSearchImg.js'
import apiPopular from '../apiPopular.js'

import popularHbs from '../partials/popular.hbs'

// apiPopular.fetch()
// apiSearchImg.fetch()
// apiSearchMovie.fetch()

const refs = {
  searchForm: document.querySelector('#searchForm'),
  gallery: document.querySelector('.gallery'),
  galleryTv: document.querySelector('.galleryTv'),
  nav: document.querySelector('.nav__film'),
};

// refs.searchForm.addEventListener('submit', searchSbm)
refs.nav.addEventListener('click', refreshFilmChoice);

// function searchSbm(e) {
//   e.preventDefault();
//   const inputMovie = e.currentTarget.elements.search.value;
//   clearListItemTV();
//   console.log('inputMovie :', inputMovie);
//   apiSearchMovie.query = inputMovie;
//   apiSearchMovie.fetch();
//   // const inputId = e.currentTarget.elements.search1.value;
//   // console.log('inputId :', inputId);
//   // apiSearchImg.id = inputId;
//   // apiSearchImg.fetch()
// }
function markup() {
  apiPopular.type = 'movie';
  apiPopular.fetch().then(result => {
    insertMarkup(result);
  })
}
markup();
function refreshFilmChoice(e) {
  e.preventDefault();
  const currentChoise = e.target.dataset.type;
  console.log('currentChoise :', currentChoise);
  clearListItemFilm();
  apiPopular.type = currentChoise;
  apiPopular.fetch().then(result => {
    
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
function clearListItemTv() {
  refs.galleryTV.innerHTML = '';
} 
import apiSearchMovie from '../apiSearchMovie.js'
import apiSearchImg from '../apiSearchImg.js'
import apiPopular from '../apiPopular.js'

import popularHbs from '../partials/popular.hbs'

// apiPopular.fetch()
// apiSearchImg.fetch()
// apiSearchMovie.fetch()

const refs = {
  searchForm: document.querySelector('#searchForm'),
  gallery: document.querySelector('.gallery'),
  galleryTv: document.querySelector('.galleryTv'),
  nav: document.querySelector('.nav__film')
};

console.log(refs.searchForm);
refs.searchForm.addEventListener('submit', searchSbm)
refs.nav.addEventListener('click', refresh)

function searchSbm(e) {
  e.preventDefault();
  const inputMovie = e.currentTarget.elements.search.value;
  console.log('inputMovie :', inputMovie);
  apiSearchMovie.query = inputMovie;
  apiSearchMovie.fetch();
  // const inputId = e.currentTarget.elements.search1.value;
  // console.log('inputId :', inputId);
  // apiSearchImg.id = inputId;
  // apiSearchImg.fetch()
}

function refresh(e) {
  e.preventDefault();

  const currentChoise = e.target.dataset.type;
  console.log('currentChoise :', currentChoise);
  // markup(currentChoise)
}

function markup() {
  apiPopular.fetch().then(result => {
    insertMarkup(result)
  })
}
markup()



function insertMarkup(items) {
  const markup = buildMarkup(items);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
function buildMarkup(items) {
  return popularHbs(items);
}

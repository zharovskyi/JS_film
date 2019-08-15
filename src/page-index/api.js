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
};

// refs.searchForm.addEventListener('submit', searchSbm)

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


import apiSearchMovie from '../apiSearchMovie.js'
// import apiSearchImg from '../apiSearchImg.js'
import apiPopular from '../apiPopular.js'
import popularHbs from '../partials/popular.hbs'




const refs = {
  searchForm: document.querySelector('.lightbox_iteam_btn'),
  gallery: document.querySelector('.gallery'),
  nav: document.querySelector('.nav__film'),
  // addFavoriteFilm: document.querySelector('.svg-star'),
  itemGallery: [],
  sortName: document.getElementById('sortName'),
  sortDate: document.getElementById('sorDate'),
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
import '../sortFunct.js';
refs.searchForm.addEventListener('submit', searchSbm);
refs.nav.addEventListener('click', refreshFilmChoice);
// refs.addFavoriteFilm.addEventListener('click', addFilm);
refs.sortName.addEventListener('click', sortItemByName);
refs.sortDate.addEventListener('click',sortItemByDate);



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
  console.log("object",e.currentTarget.value);
  console.log("refs",refs.itemGallery);
  if(carrentChoice === 'release_date'){
    refs.itemGallery.sort(compareDate);
  }
  // else {
  //   refs.itemGallery.sort(comparePopularity);
  // }
  clearListItemFilm();
  insertMarkup(refs.itemGallery);

}
// SORT BY NAME function that sort item;
function compareTitle(a, b) {
    const compA = a.title.toUpperCase();
    const compB = b.title.toUpperCase();
    
    let comparison = 0;
    if (compA > compB) {
      comparison = 1;
    } else if (compA < compB) {
      comparison = -1;
    }
    return comparison;
  }
  function comparePopularity(a, b) {
    const compA = a.popularity;
    const compB = b.popularity;
    
    let comparison = 0;
    if (compA > compB) {
      comparison = 1;
    } else if (compA < compB) {
      comparison = -1;
    }
    return comparison;
  }
  function compareDate(a, b) {
    const compA = a.release_date;
    const compB = b.release_date;
    
    let comparison = 0;
    if (compA > compB) {
      comparison = 1;
    } else if (compA < compB) {
      comparison = -1;
    }
    return comparison;
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

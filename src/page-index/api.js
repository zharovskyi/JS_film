
import apiSearchMovie from '../apiSearchMovie.js'
import apiPopular from '../apiPopular.js'
import popularHbs from '../partials/popular.hbs'
import {compareTitle,comparePopularity,compareDateNew ,compareDateOld} from '../sortFunct.js'
import '../partials/menu-burger.js'
import '../page-index/search'



let itemGallery = [];
 const refs = {
  searchForm: document.querySelector('.lightbox_iteam_btn'),
  searchFormHeder: document.querySelector('.headerSearch'),
  gallery: document.querySelector('.gallery'),
  nav: document.querySelector('.nav__film'),
  sortName: document.getElementById('sortName'),
  sortDate: document.getElementById('sortDate'),
  filmsButton: document.querySelector('.burger__search__films'),
  serialsButton: document.querySelector('.burger__search__serials'),
  favoritesButton: document.querySelector('.burger__search__favorites')


};

refs.searchForm.addEventListener('submit', searchSbm);
refs.searchFormHeder.addEventListener('submit', searchSbm);
refs.nav.addEventListener('click', refreshFilmChoice);
refs.sortName.addEventListener('click', sortItemByName);
refs.sortDate.addEventListener('click',sortItemByDate);
refs.filmsButton.addEventListener('click', burgerMenuMovie);
refs.serialsButton.addEventListener('click', burgerMenuSerials);
refs.favoritesButton.addEventListener('click', burgerMenuFavorites);

refs.gallery.addEventListener('click', addFavoriteFilm);

// BUILD MAIN PAGE LIST
function markup() {
  apiPopular.type = 'movie';
  apiPopular.fetch().then(result => {
    itemGallery = result;
    insertMarkup(result);
  })
}
markup();

// insert from search.js
const openlightbox = document.querySelector(".lightbox");
const lightboxShadow = document.querySelector(".lightbox_shadow");

// SEARCH FILM
function searchSbm(e) {
  // insert from search.js
   if (openlightbox.classList[1] === "lightbox_is_open") {
   openlightbox.classList.remove("lightbox_is_open");
   lightboxShadow.classList.remove("lightbox_shadow_is_open");
   };
  e.preventDefault();
  const inputValue = e.currentTarget.elements.film.value;
  apiSearchMovie.query = inputValue;
  apiSearchMovie.fetch()
    .then(result => {
      clearListItemFilm();
      itemGallery = result;
      insertMarkup(result);
    })
}



// add film to local storage
let localArr = [];

function addFavoriteFilm(e) {
  if(e.target.classList.contains("use")) {
    let idUse = e.target.dataset.id;
    if(!localArr.find(el => el.id === +idUse)) {
      let foundId = itemGallery.find(element => +element.id === +idUse);
      localArr.push(foundId);
      e.target.style.fill = '#77C1BB';

    } else {
      localArr = localArr.filter(element => +element.id !== +idUse);
      e.target.style.fill = '#fff';
    }
    localStorage.setItem('movie', JSON.stringify(localArr));
  }
}
// build favorite lisr
function buildFavouriteItem(item) {
  if(item == undefined || item == null){
    console.log('add some thing');
}else{
  insertMarkup(item);
  console.log('item', item);
}
}

let favoriteID = [];
// Click Button and Buid page TV SHOW ,Favourite
function refreshFilmChoice(e) {
  if( e.target.classList[0] !== 'nav__main'){
    return;
  }
  e.preventDefault();
  const currentChoise = e.target.dataset.type;
  clearListItemFilm();
  if(e.target.dataset.type === 'favorite'){
    let liFavorite = JSON.parse(localStorage.getItem('movie'));
    favoriteID = liFavorite.map(liFavorite => liFavorite.id);
    buildFavouriteItem(liFavorite);


  }else{
    apiPopular.type = currentChoise;
    apiPopular.fetch().then(result => {
      itemGallery = result;

      insertMarkup(result);
    })
  }

}

// function change color star
// function changeColorStar(arr){

// }
// sort item byList
function sortItemByName(e) {
  const carrentChoice = e.currentTarget.value;
  if(carrentChoice === 'title'){
    itemGallery.sort(compareTitle);
  }
  else if(carrentChoice === 'popularity') {
    itemGallery.sort(comparePopularity);
  }
  clearListItemFilm();
  insertMarkup(itemGallery);
}

// sort by date
function sortItemByDate(e) {
  const carrentChoice = e.currentTarget.value;
  if(carrentChoice === 'release_date'){
    itemGallery.sort(compareDateNew);
  }
  else {
    itemGallery.sort(compareDateOld);
  }
  clearListItemFilm();
  insertMarkup(itemGallery);
}
// --------------burger menu --> movies--------------------
function burgerMenuMovie(e) {
  e.preventDefault();
  apiPopular.type = 'movie';
  clearListItemFilm();
  apiPopular.fetch().then(result => {
    itemGallery = result;
    insertMarkup(result);
  })
}
//--------------burger menu --> serials--------------------
function burgerMenuSerials(e) {
  e.preventDefault();
  apiPopular.type = 'tv';
  clearListItemFilm();
  apiPopular.fetch().then(result => {
    itemGallery = result;
    insertMarkup(result);
  })
}
//------------burger menu --> favorites----------------
function burgerMenuFavorites(e) {
  clearListItemFilm();
  let liFavorite = JSON.parse(localStorage.getItem('movie'));
  buildFavouriteItem(liFavorite);

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

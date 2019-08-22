
import apiSearchMovie from '../apiSearchMovie.js'
import apiPopular from '../apiPopular.js'
import popularHbs from '../partials/popular.hbs'
import { compareTitle, comparePopularity, compareDateNew, compareDateOld } from '../sortFunct.js'
import '../partials/menu-burger.js'
import '../page-index/search'



let favoriteID = [];
let itemGallery = [];
let localArr = [];
let favorites;
const refs = {
  searchForm: document.querySelector('.lightbox_iteam_btn'),
  searchFormHeder: document.querySelector('.headerSearch'),
  gallery: document.querySelector('.gallery'),
  nav: document.querySelector('.nav__film'),
  sortName: document.getElementById('sortName'),
  sortDate: document.getElementById('sortDate'),
  filmsButton: document.querySelector('.burger__search__films'),
  serialsButton: document.querySelector('.burger__search__serials'),
  favoritesButton: document.querySelector('.burger__search__favorites'),
};

refs.searchForm.addEventListener('submit', searchSbm);
refs.searchFormHeder.addEventListener('submit', searchSbm);
refs.nav.addEventListener('click', refreshFilmChoice);
refs.sortName.addEventListener('click', sortItemByName);
refs.sortDate.addEventListener('click', sortItemByDate);
refs.filmsButton.addEventListener('click', burgerMenuMovie);
refs.serialsButton.addEventListener('click', burgerMenuSerials);
refs.favoritesButton.addEventListener('click', burgerMenuFavorites);
refs.gallery.addEventListener('click', addFavoriteFilm);
refs.gallery.addEventListener('click', movieSelected)

// BUILD MAIN PAGE LIST
function markup() {
  apiPopular.type = 'movie';
  apiPopular.fetch().then(result => {
    itemGallery = result;
    insertMarkup(setFavorites(result));
  })
}
markup();

function movieSelected(e) {
  const id = e.target.closest('.movie').dataset.id;
  localStorage.setItem("id", id)
  return false;
}

function setFavorites (items) {
  let getItemLocStor = JSON.parse(localStorage.getItem('movie'));
    if(getItemLocStor === null || getItemLocStor === undefined){
      return items;
    } else {
      let idFromLocStor = getItemLocStor.map(el => +el.id);
      return [...items].map(el => {
        if(idFromLocStor.includes(el.id)) {
          el.favorites = true;
          favorites = el.favorites;
        }
        return el;
      })
    }
}



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


function addFavoriteFilm(e) {
  if (e.target.classList.contains("use")) {
    let idUse = e.target.dataset.id;
    if (!localArr.find(el => el.id === +idUse)) {
      let foundId = itemGallery.find(element => +element.id === +idUse);
      localArr.push(foundId);
      
      e.target.style.fill = '#77C1BB';
   
      const added = document.getElementById("added");
      added.innerHTML = "Added to favorites!";
      added.classList.add("added");
      setTimeout(() => {
        added.classList.remove("added");
      }, 1500);
    } else {
      localArr = localArr.filter(element => +element.id !== +idUse);
      e.target.style.fill = '#fff';
     
      if(refs.nav.childNodes[5].classList.contains('nav__main_is_open')) {
        e.target.closest('.movie').remove();
      }
      const alreadyStored = document.getElementById("alreadyStored");
      alreadyStored.innerHTML = "Remove from favorites!";
      alreadyStored.classList.add("alreadyStored");
      setTimeout(() => {
        alreadyStored.classList.remove("alreadyStored");
      }, 1500);

    }
    localStorage.setItem('movie', JSON.stringify(localArr));
  }
}
// build favorite list
function buildFavouriteItem(item) {
  if (item == undefined || item == null) {
    return;
  } else {
    insertMarkup(item);
  }
}


// Click Button and Buid page TV SHOW ,Favourite

function refreshFilmChoice(e) {
  if (e.target.classList[0] !== 'nav__main') {
    return;
  }
  e.preventDefault();
  const currentChoise = e.target.dataset.type;
  clearListItemFilm();
  if (e.target.dataset.type === 'favorite') {
    let liFavorite = JSON.parse(localStorage.getItem('movie'));
    favoriteID = liFavorite.map(liFavorite => liFavorite.id);
    itemGallery = favoriteID;
    buildFavouriteItem(liFavorite);


  } else {
    apiPopular.type = currentChoise;
    apiPopular.fetch().then(result => {
      itemGallery = result;
      insertMarkup(result);
    })
  }
}

// function change color star

function changeColorStar(){
  let getItemLocStor = JSON.parse(localStorage.getItem('movie'));
  if(getItemLocStor === null || getItemLocStor === undefined){
    return;
  } else {
    let idFromLocStor = getItemLocStor.map(el => +el.id);
    let idFromDom = document.querySelectorAll(".use");
     [...idFromDom].forEach(el => {
       let idCurrentElement = +el.dataset.id;
      if(idFromLocStor.includes(idCurrentElement)){
        el.classList.add('svg-green');
        // el.closest('.movie').remove();
      }
      else{
        el.classList.remove('svg-green');
      }
     })

  }
}

// sort item byList
function sortItemByName(e) {
  const carrentChoice = e.currentTarget.value;
  if (carrentChoice === 'title') {
    itemGallery.sort(compareTitle);
  }
  else if (carrentChoice === 'popularity') {
    itemGallery.sort(comparePopularity);
  }
  clearListItemFilm();
  insertMarkup(itemGallery);
}

// sort by date
function sortItemByDate(e) {
  const carrentChoice = e.currentTarget.value;
  if (carrentChoice === 'release_date') {
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
async function insertMarkup(items) {
  const markup = await buildMarkup(items);
  await refs.gallery.insertAdjacentHTML('beforeend', markup);
  await changeColorStar();
}
//  function insertMarkup(items) {
//   const markup =  buildMarkup(items);
//   refs.gallery.insertAdjacentHTML('beforeend', markup);
// }

// Build list Iem Hbs
function buildMarkup(items) {
  return popularHbs(items);
}
//  Clear List Item in Ul
function clearListItemFilm() {
  refs.gallery.innerHTML = '';
}

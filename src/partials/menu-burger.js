
const burgerButton = document.querySelector('.burger__button');
const burgerMenu = document.querySelector('.burger__menu');
const shadowBox = document.querySelector('.shadow__box');

function openBurgerWindow(e) {
  if (event.target === shadowBox) {
    return;
  };
  burgerMenu.classList.add("burger__menu__open");
  shadowBox.classList.add("shadow__box__active");
}
burgerButton.addEventListener("click", openBurgerWindow);

function closeBurgerWindow(e) {
  if (event.target !== event.currentTarget) {
    return;
  };
  burgerMenu.classList.remove("burger__menu__open");
  shadowBox.classList.remove("shadow__box__active");
}
shadowBox.addEventListener("click", closeBurgerWindow);


// const filmsButton = document.querySelector('.burger__list');
//-------- function  burger menu  open films window
// function markup() {
//   apiPopular.type = 'movie';
//   apiPopular.fetch().then(result => {
//     refs.itemGallery = result;
//     insertMarkup(result);
//   })
// }
// filmsButton.addEventListener('click',markup)





const burgerButton = document.querySelector('.burger__button');
const burgerMenu = document.querySelector('.burger__menu');
const shadowBox = document.querySelector('.shadow__box');

burgerButton.addEventListener("click" , function openBurgerWindow() {
  if (event.target === shadowBox) {
    return;
  };
  burgerMenu.classList.add("burger__menu__open");
  shadowBox.classList.add("shadow__box");
});


shadowBox.addEventListener("click",function closeBurgerWindow () {
  if (event.target !== event.currentTarget) {
    return;
  };
  burgerMenu.classList.remove("burger__menu__open");
  shadowBox.classList.remove("shadow__box");
});



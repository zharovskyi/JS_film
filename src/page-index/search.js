const head__search = document.querySelector(".head__search");
const openlightbox = document.querySelector(".lightbox");
const lightboxShadow = document.querySelector(".lightbox_shadow");
const closelightboxBtn = document.querySelector(".lightbox_iteam_btn_submit");
const burgerMenu = document.querySelector('.burger__menu');
const shadowBox = document.querySelector('.shadow__box');

head__search.addEventListener("click", open);
function open() {
  if (event.target === lightboxShadow) {
    return;
  };

  openlightbox.classList.add("lightbox_is_open");
  lightboxShadow.classList.add("lightbox_shadow_is_open");
  burgerMenu.classList.remove("burger__menu__open");
  shadowBox.classList.remove("shadow__box");

  window.addEventListener("keydown", closeKey);

};

function closeKey(event) {
  if (event.code !== "Escape" ) {
    return;
  };
  openlightbox.classList.remove("lightbox_is_open");
  lightboxShadow.classList.remove("lightbox_shadow_is_open");
};

lightboxShadow.addEventListener("click", close);
function close () {
  if (event.target !== event.currentTarget) {
    return;
  };
  openlightbox.classList.remove("lightbox_is_open");
  lightboxShadow.classList.remove("lightbox_shadow_is_open");
};

closelightboxBtn.addEventListener("click", closeBtn);
function closeBtn () {
  openlightbox.classList.remove("lightbox_is_open");
  lightboxShadow.classList.remove("lightbox_shadow_is_open");
};


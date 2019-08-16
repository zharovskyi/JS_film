
const head__search = document.querySelector(".head__search");
const openlightbox = document.querySelector(".lightbox");
const lightboxShadow = document.querySelector(".lightbox_shadow");
// const closelightboxShadow = document.querySelector(".lightbox_shadow");
const closelightboxBtn = document.querySelector(".lightbox_iteam_btn_submit");

head__search.addEventListener("click", open);
function open() {
  if (event.target === lightboxShadow) {
    return;
  };
  openlightbox.classList.add("lightbox_is_open");
  lightboxShadow.classList.add("lightbox_shadow_is_open");
  window.addEventListener("keydown", closeKey)
  console.log('lightboxShadow :', lightboxShadow);
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
  console.log('lightboxShadow :', lightboxShadow);
};

closelightboxBtn.addEventListener("click", closeBtn);
function closeBtn () {
  openlightbox.classList.remove("lightbox_is_open");
  lightboxShadow.classList.remove("lightbox_shadow_is_open");
};


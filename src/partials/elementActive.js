const activeMenu = document.querySelector('.nav__film');
let selectedA;

activeMenu.onclick = function(event) {
  let target = event.target;

  if (target.tagName !== 'A') return;

  underline(target);
};

function underline(a) {
  if (selectedA) {
    selectedA.classList.remove('nav__main_is_open');
  }
  selectedA = a;
  selectedA.classList.add('nav__main_is_open');
}

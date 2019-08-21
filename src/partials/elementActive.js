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

// Logo back to move

import '../page-index/api'

const backToMove = document.querySelector('.head__logo-img');
const a2 = document.querySelector('.nav__main');

backToMove.addEventListener("click", LogoBack);
function LogoBack() {
  // console.log('a2 :', a2);
  if (a2.dataset.type !== 'move') {
    a2.dataset.type === 'move';
    // console.log('a2.dataset.type :', a2.dataset.type);
  }
}





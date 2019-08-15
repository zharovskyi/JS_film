import '../scss/nav.scss';
import '../scss/main.scss';
import '../scss/header.scss';
import './page.scss';
import burgerMenu from './../partials/menu-burger';
import './api.js';
import './search.js';
// import apiSearchMovie from '../apiSearchMovie.js'
// import apiSearchImg from '../apiSearchMovie.js'
// import apiPopular from '../apiPopular.js'




class Foo {
  constructor () {
    this.value = 'foobar'
  }
  static instance () {
    return new Foo()
  }
  getValue () {
    return this.value
  }
}

console.log(Foo.instance().getValue())

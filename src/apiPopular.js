

const baseUrl = 'https://api.themoviedb.org/3/';

export default {
  key: '667e6c0579f71e858d539ca597385526',
  type: '',
  page: 1,
  language: 'en-US',
  query: 'fast',
  

  fetch() {

    const requestParam = `${this.type}/popular?api_key=${this.key}&language=${this.language}&page${this.page}`;

    return fetch(baseUrl + requestParam)
      .then(res => res.json())
      .then(parseRes => {
        // let idItem = [];
        // let localArr = [];
        // idItem = parseRes.results.map(el => el.id);
        // let local = JSON.parse(localStorage.getItem('movie'));
        // if(local === null || local === undefined){
        //   console.log('null','empty storage');
        // }else{
          
        //   console.log('local :', local);
        // }
        // console.log(local);
        // console.log(idItem);
        return parseRes.results;
      })
  },
}

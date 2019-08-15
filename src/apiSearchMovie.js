const baseUrl = 'https://api.themoviedb.org/3/search/';

export default {
  key: '667e6c0579f71e858d539ca597385526',
  type: 'movie',
  page: 1,
  adult: false,
  language: 'en-US',
  query: 'fast',

  fetch() {

    const requestParam = `${this.type}?api_key=${this.key}&language=${this.language}&query=${this.query}&page${this.page}&include_adult=${this.adult}`;

    return fetch(baseUrl + requestParam)
      .then(res => res.json())
      .then(parseRes => {
        console.log('movie:', parseRes.results);
        return parseRes.result;

      })
  },
}


  // get query() {
  //   return this.query;
  // },
  // set query(string) {
  //   this.query = string;
  // },




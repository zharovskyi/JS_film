const baseUrl = 'https://api.themoviedb.org/3/search/';

export default {
  key: 'https://api.themoviedb.org/3/search/',
  type: 'movie',
  page: 1,
  adult: false,
  language: 'en-US',
  query: '',

  fetch() {

    const requestParam = `${this.type}?api_key=${this.key}&language=${this.language}&query=${this.query}&page${this.page}&include_adult=${this.adult}`;

    return fetch(baseUrl + requestParam)
      .then(res => res.json())
      .then(parseRes => {
        console.log('movie:', parseRes.results);
        return parseRes.results;

      })
  },
}


  // get query() {
  //   return this.query;
  // },
  // set query(string) {
  //   this.query = string;
  // },




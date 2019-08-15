const baseUrl = 'https://api.themoviedb.org/3/';

export default {
  key: '667e6c0579f71e858d539ca597385526',
  type: 'movie',
  page: 1,
  language: 'en-US',
  query: 'fast',

  fetch() {

    const requestParam = `${this.type}/popular?api_key=${this.key}&language=${this.language}&page${this.page}`;

    return fetch(baseUrl + requestParam)
      .then(res => res.json())
      .then(parseRes => {
        return parseRes.results;
      })
  },
}

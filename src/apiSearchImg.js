const baseUrl = 'https://api.themoviedb.org/3/';

export default {
  key: '667e6c0579f71e858d539ca597385526',
  type: 'person',
  id: 66633,
  images: 'images',
  language: 'en-US',

  fetch() {

    const requestParam = `${this.type}/${this.id}?api_key=${this.key}&lanuage=${this.language}`;

    return fetch(baseUrl + requestParam)
      .then(res => res.json())
      .then(parseRes => {
        console.log('people :', parseRes);
        return parseRes;
      })
  },
}

//https://image.tmdb.org/t/p/w500/{{profile_path}}

//{{name}}

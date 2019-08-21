const api_key = "667e6c0579f71e858d539ca597385526";
const baseUrl = `https://api.themoviedb.org/3`;

export function getMovieTrailer(id) {
  const url = `${baseUrl}/movie/${id}/videos?api_key=${api_key}`;
  return fetch(url).then(res => res.json());
}

export function getMovieActors(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=credits`;
  return fetch(url).then(res => res.json());
}

export function getMovie(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}`;
  return fetch(url).then(res => res.json());
}

export function getMovieTitle(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=original_title`;
  return fetch(url).then(res => res.json());
}
export function getMovieContries(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=production_contries`;
  return fetch(url).then(res => res.json());
}

export function getMovieTagline(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=tagline`;
  return fetch(url).then(res => res.json());
}

export function getPopularMovies() {
  const url = `${baseUrl}/movie/popular?api_key=${api_key}&append_to_response=credits`;
  return fetch(url).then(res => res.json());
}

export function getMovieFrames(id) {
  const url = `${baseUrl}/movie/${id}/images?api_key=${api_key}`;
  return fetch(url).then(res => res.json());
}

export function getMovieReviews(id) {
  const url = `${baseUrl}/movie/${id}/reviews?api_key=${api_key}`;
  return fetch(url).then(res => res.json());
}
export function getGenres(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=genres`;
  return fetch(url).then(res => res.json());
}

export function getRuntime(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=runtime`;
  return fetch(url).then(res => res.json());
}

export function getOwerview(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=overview`;
  return fetch(url).then(res => res.json());
}

export function getPoster(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=poster_path`;
  return fetch(url).then(res => res.json());
}

export function getPosterLittle(id) {
  const url = `${baseUrl}/movie/${id}?api_key=${api_key}&append_to_response=backdrop_path`;
  return fetch(url).then(res => res.json());
}

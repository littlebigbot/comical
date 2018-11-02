import { API_ROOT } from '~/constants';
import { makeUrl } from '~/utility';
// import camelize from 'camelize';

export const api = (endpoint, config) => {
  const url = makeUrl(API_ROOT, endpoint);
  return fetch(url, config)
    .then((response) => {
      return response.json()
        .then((json) => {
          // return { camelize(json), response };
          return { json, response }
        });
    }).then(({ json, response }) => {
      if (response.ok) {
        return Promise.resolve(json)
      }
      return Promise.reject(json)
    })
}

export const apiGetComics = () => api('/comics/');
export const apiGetComic = slug => slug ? api(`/comics/${slug}`) : Promise.reject('slug is required');
export const apiGetComicNavigation = slug => slug ? api(`/comics/${slug}/navigation`) : Promise.reject('slug is required');

import { API_ROOT } from '~/constants';
import { makeUrl, serialize } from '~/utility';
import storage from 'store';
// import camelize from 'camelize';

export const api = (endpoint, config) => {
  const url = makeUrl(API_ROOT, endpoint);

  const jwt = storage.get('jwt');
  if(jwt) {
    if(config.headers) {
      config.headers.Authorization = `JWT ${jwt}`;
    } else {
      config.headers = {
        Authorization: `JWT ${jwt}`
      };
    }
  }

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

export const apiLogin = creds => {
  if(!creds) {
    return Promise.reject('need creds');
  }

  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  }

  return api('/auth/login', config);
}


export const apiSignUp = creds => {
  if(!creds) {
    return Promise.reject('need creds');
  }

  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  }

  return api('/auth/signUp', config);
}


export const apiCreateComic = fields => {
  if(!fields) {
    return Promise.reject('need fields');
  }

  var formData = new FormData();

  for(var name in fields) {
    formData.append(name, fields[name]);
  }

  const config = {
    method: 'POST',
    body: formData
  }

  return api('/comics/create', config);
}

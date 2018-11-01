import { TMDB_API_ROOT, TMDB_API_KEY, WIKIPEDIA_API_ROOT, OMDB_API_ROOT, OMDB_API_KEY } from '~/constants';
import { serialize, makeUrl } from '~/utility';
// import camelize from 'camelize';

export const api = (url, config) => {
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

function tmdbApi(endpoint, payload) {
  const url = makeUrl(TMDB_API_ROOT, endpoint);
  const query = {
    api_key: TMDB_API_KEY,
    language: 'en-US',
    ...payload
  };
  return api(url + serialize(query))
}

function wikipediaApi(payload) {
  return api(WIKIPEDIA_API_ROOT + serialize({
    origin: '*',
    format: 'json',
    ...payload
  }));
}

function omdbApi(payload) {
  return api(OMDB_API_ROOT + serialize({
    apikey: OMDB_API_KEY,
    r: 'json',
    ...payload
  }));
}

export const apiSearch = query => query ? tmdbApi('/search/multi', { query }) : Promise.reject('Nothing to search');
export const apiPerson = id => id ? tmdbApi(`/person/${id}`) : Promise.reject('id is required');
export const apiPersonCredits = id => id ? tmdbApi(`/person/${id}/credits`) : Promise.reject('id is required');

export const apiMedia = ( mediaType, id ) => {
  console.log('hihihi', mediaType, id)
  if(!id) {
    return Promise.reject('id is required')
  } else if(!mediaType) {
    return Promise.reject('mediaType is required')
  }
  return tmdbApi(`/${mediaType}/${id}`)
}


export const apiWikipediaPage = name => name ? wikipediaApi({ action: 'parse', page: name }) : Promise.reject('name is required');
export const apiRatings = name => name ? omdbApi({ t: name, plot: 'short' }) : Promise.reject('name is required');
// export const callSelectPerson = ({person}) => callApi(`/person/${person.id}`, {append_to_response: 'combined_credits'})
// export const callSearch = ({query}) => query ? callApi('/search/person', {query}) : Promise.reject('Nothing to search')
// export const callSelectPerson = ({person}) => callApi(`/person/${person.id}/combined_credits`)

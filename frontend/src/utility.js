import { reduce, isUndefined } from 'lodash';

export const serialize = (obj) => {
  return reduce(obj, (result, val, key) => {
    if(!isUndefined(val)) {
      return result.concat(`${result === '?' ? '' : '&'}${key}=${encodeURIComponent(val)}`);
    }
    return result;
  }, '?');
}

export const makeUrl = (apiRoot, endpoint) => {
  return endpoint.includes(apiRoot) ? endpoint : apiRoot + endpoint;
}

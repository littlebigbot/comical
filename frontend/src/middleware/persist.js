import storage from 'store';
import { has } from 'lodash';

const persist = store => next => action => {
  if(has(action, 'payload.response.token')) {
    storage.set('jwt', action.payload.response.token)
  }
  return next(action)
}

export default persist;

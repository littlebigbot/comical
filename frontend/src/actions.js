import { createActionAsync } from 'redux-act-async';
// import { createAction } from 'redux-act';
import { apiGetComics, apiGetComic, apiGetComicNavigation, apiLogin, apiSignUp } from './api';

export const getComics = createActionAsync('GET_COMICS', apiGetComics);
export const getComic = createActionAsync('GET_COMIC', apiGetComic);
export const getComicNavigation = createActionAsync('GET_COMIC_NAVIGATION', apiGetComicNavigation);

const loginActionOptions = {
  request: {
    payloadReducer: payload => {
      console.log('request.payloadReducer', payload)
      return payload
    }
  },
  ok: {
    payloadReducer: payload => {
      console.log('ok.payloadReducer', payload)
      return payload
    }
  },
  error: {
    payloadReducer: payload => {
      console.log('error.payloadReducer', payload)
      return payload
    }
  }
}

export const login = createActionAsync('LOGIN', apiLogin, loginActionOptions);

const signUpActionOptions = {
  request: {
    payloadReducer: payload => {
      console.log('request.payloadReducer', payload)
      return payload
    }
  },
  ok: {
    payloadReducer: payload => {
      console.log('ok.payloadReducer', payload)
      return payload
    }
  },
  error: {
    payloadReducer: payload => {
      console.log('error.payloadReducer', payload)
      return payload
    }
  }
}

export const signUp = createActionAsync('SIGN_UP', apiSignUp, signUpActionOptions);

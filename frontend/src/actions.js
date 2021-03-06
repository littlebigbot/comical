import { createActionAsync } from 'redux-act-async';
// import { createAction } from 'redux-act';
import { apiGetComics, apiGetComic, apiGetComicNavigation, apiLogin, apiSignUp, apiCreateComic, apiUpdateComic, apiDeleteComic } from './api';

export const getComics = createActionAsync('GET_COMICS', apiGetComics);
export const getComic = createActionAsync('GET_COMIC', apiGetComic);
export const getComicNavigation = createActionAsync('GET_COMIC_NAVIGATION', apiGetComicNavigation);

export const login = createActionAsync('LOGIN', apiLogin);
// export const signUp = createActionAsync('SIGN_UP', apiSignUp);
export const createComic = createActionAsync('CREATE_COMIC', apiCreateComic);
export const updateComic = createActionAsync('UPDATE_COMIC', apiUpdateComic);
export const deleteComic = createActionAsync('DELETE_COMIC', apiDeleteComic);

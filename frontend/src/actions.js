import { createActionAsync } from 'redux-act-async';
import { createAction } from 'redux-act';
import { apiGetComics, apiGetComic, apiGetComicNavigation } from './api';

export const getComics = createActionAsync('GET_COMICS', apiGetComics);
export const getComic = createActionAsync('GET_COMIC', apiGetComic);
export const getComicNavigation = createActionAsync('GET_COMIC_NAVIGATION', apiGetComicNavigation);

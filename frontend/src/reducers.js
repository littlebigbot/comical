import { createReducerAsync } from 'redux-act-async';
// import { createReducer } from 'redux-act';
import { getComics, getComic, getComicNavigation } from './actions';
import { combineReducers } from 'redux'

const comics = createReducerAsync(getComics);
const comic = createReducerAsync(getComic);
const navigation = createReducerAsync(getComicNavigation)

const rootReducer = combineReducers({
  // routing,
  comics,
  comic,
  navigation
})

export default rootReducer

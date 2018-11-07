import { createReducerAsync } from 'redux-act-async';
// import { createReducer } from 'redux-act';
import { getComics, getComic, getComicNavigation, login } from './actions';
import { combineReducers } from 'redux'

const comics = createReducerAsync(getComics);
const comic = createReducerAsync(getComic);
const navigation = createReducerAsync(getComicNavigation)
const authentication = createReducerAsync(login)

const rootReducer = combineReducers({
  authentication,
  comics,
  comic,
  navigation
})

export default rootReducer

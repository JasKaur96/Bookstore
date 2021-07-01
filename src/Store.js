import { createStore,applyMiddleware } from 'redux'
import BookDetailsReducers from './Reducer/BookDetailsReducer'
import logger from 'redux-logger';
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(BookDetailsReducers,applyMiddleware(logger))

export default store;
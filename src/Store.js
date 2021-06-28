import { createStore } from 'redux'
import BookDetailsReducers from './Reducer/BookDetailsReducer'

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(BookDetailsReducers)

export default store;
import {BOOK_SELECTED} from "../Constants/constantsBook";

const initialState = {
    bookDetails:[1]
}

const BookDetailsReducers = (state={bookDetails:[]}, action) => {
   switch(action.type){
       case BOOK_SELECTED :
           console.log("Action",action);
           return {
               ...state, bookDetails:action.value
           }

        default:
            return {state}
   }
}

export default BookDetailsReducers;

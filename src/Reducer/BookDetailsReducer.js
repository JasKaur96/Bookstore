import {BOOK_SELECTED,CART_COUNT} from "../Constants/constantsBook";

const initialState = {
    bookDetails:[1],
    cart_count:''
}

const BookDetailsReducers = (state=initialState, action) => {
   switch(action.type){
        case BOOK_SELECTED :
           console.log("Action",action);
           return {
               ...state, bookDetails:action.value
           }
        case CART_COUNT :
            console.log("CartCount action",action);
            return {
                ...state, cart_count:action.value
            }

        default:
            return {state}
   }
}

export default BookDetailsReducers;

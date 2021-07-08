import {BOOK_SELECTED,CART_COUNT,CART_OPEN} from "../../Constants/constantsBook";

const initialState = {
    bookDetails:[1],
    cart_count:'',
    open: false,
    searchedBook:[]
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
        case CART_OPEN :
            console.log("CartOpen action",action);
            return {
                ...state, open:action.value
            }
        // case SEARCHED_BOOK:
        //     console.log("Searched action",action);
        //     return {
        //         ...state, searchedBook:action.value
        //     }

        default:
            return {state}
   }
}

export default BookDetailsReducers;

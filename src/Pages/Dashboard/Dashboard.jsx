import React,{useState, Component} from 'react';
import DisplayBook from '../../Components/DisplayBook/DisplayBook'
import Header from '../../Components/Header/Header'
import BookDetails from '../../Components/BookDetails/BookDetails';
import { withRouter } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import Service from '../../Services/BookService';
import { connect } from 'react-redux';
import {BOOK_SELECTED, CART_COUNT, CART_OPEN, SEARCHED_BOOK} from '../../Constants/constantsBook';

const mapStateToProps = (state) => {
    console.log("state",state.state.bookDetails);
    return {
        selectedBook:state.state.bookDetails,
        cart_count:state.state.cart_count,
        open: state.state.open,
        SearchedData:state.state.searchedBook,
    }
}

const service = new Service();

class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state={ 
       selectedBook:"",
       details:false,
       open:false,
       cartbooks:"",
       searchView:"",
       showBooks:[],
       searchNote: [],
       search: "",
       SearchedData:[],
       searchBook:false,
       cart_count:0
    }
}
 
componentDidMount(){
  this.getCartbookLength();
}

onClickBook=(book)=>{
    // this.setState({selectedBook:value})
    // console.log(this.state.selectedBook,"selected book");
      this.setState({ selectedBook: book })
      console.log(book);
      this.props.dispatch({type:BOOK_SELECTED , value:book})
      this.props.history.push('/bookdetails')  
}

openCart = ()=>{
   this.setState({open: !this.state.open});
  console.log("dashboard",this.state.open);
  this.props.dispatch({type:CART_OPEN , value:this.state.open});
  this.props.history.push("/cart")
}

getBook = (books) =>{
  this.setState({showBooks: books});
  // this.props.dispatch({type:SEARCHED_BOOK , value:books});
   console.log("Get Books",books)
}

getCartbookLength=()=>{
  service.getCartItems().then((res) => {
    console.log(res);
    this.setState({cartbooks: res.data.result });
    this.props.dispatch({type:CART_COUNT,value:res.data.result.length})
  })
}

handleSearchBook = (value,status) => {
  this.setState({search: value});
  console.log("Dashboard seaarch method",value);  
  this.setState({searchBook: status})
  console.log("search status",status)
  this.filterSearchBook(value)
}

 
filterSearchBook = (value)=>{   
  var array = []
  this.state.showBooks.filter(data => data.bookName.toLowerCase().includes(value.toLowerCase()) || data.author.toLowerCase().includes(value.toLowerCase())).map((searchedData)=>{
      console.log("Filtered data : ", searchedData);
      array.push(searchedData);
      console.log("Array here", array)
      console.log("State here", this.state.SearchedData)
    })
   
    this.setState({SearchedData: array })
    console.log("Array outside ", array)
}

render() {
  return (
    <div>
        <Header value={true} header={true} openCart={this.openCart} handleSearchBook={this.handleSearchBook} searchBook={this.state.searchBook} cartbooks={this.state.cartbooks.length} /> 
        <DisplayBook header={true} searchBook={this.state.searchBook} getBook={this.getBook} searchedData={this.state.SearchedData} search={this.state.search} bookDetail={this.onClickBook} />
       
        {/* <Footer/> */}
    </div>
  )
  }
}

export default connect(mapStateToProps) (withRouter(Dashboard))
